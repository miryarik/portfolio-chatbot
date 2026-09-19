import { prisma } from "@/lib/prisma";
import { ratelimit } from "@/lib/ratelimiter";
import { retrieveContext } from "@/lib/retrieval";
import { SYSTEM_PROMPT } from "@/lib/systemPrompt";
import { GenerateContentResponse, GoogleGenAI } from "@google/genai";
import { createHash } from "crypto";
import { NextRequest, NextResponse } from "next/server";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(req: NextRequest) {
  const forwardedFor = req.headers.get("x-forwarded-for");
  const ip =
    (forwardedFor ? forwardedFor.split(",")[0].trim() : null) ||
    req.headers.get("x-real-ip") ||
    "127.0.0.1";

  const { message, conversationId, regenerate } = await req.json();

  if (!regenerate) {
    const { success } = await ratelimit.limit(ip);
    if (!success) return NextResponse.json("Rate Limited", { status: 429 });
  }

  if ((!message || typeof message !== "string") && !conversationId) {
    return new Response(JSON.stringify({ error: "Missing message" }), {
      status: 400,
    });
  }

  const visitorHash = createHash("sha256").update(ip).digest("hex");

  const conversation = conversationId
    ? await prisma.conversation.findUnique({ where: { id: conversationId } })
    : await prisma.conversation.create({ data: { visitorHash } });

  if (!conversation) {
    return NextResponse.json(
      { error: "Invalid Conversation" },
      {
        status: 400,
      },
    );
  }

  if (message) {
    await prisma.message.create({
      data: { conversationId: conversation.id, role: "user", content: message },
    });
  }

  const priorMessages = await prisma.message.findMany({
    where: { conversationId: conversation.id },
    orderBy: { createdAt: "asc" },
  });

  const lastUserMessage =
    [...priorMessages].reverse().find((m) => m.role === "user")?.content ?? "";
  const context = await retrieveContext(lastUserMessage);
  const systemPrompt = SYSTEM_PROMPT.replace("{{context}}", context);

  const contents = priorMessages.map((m) => ({
    role: m.role === "user" ? "user" : "model",
    parts: [{ text: m.content }],
  }));

  const encoder = new TextEncoder();
  let fullResponse = "";

  const stream = new ReadableStream({
    async start(controller) {
      try {
        const geminiStream = await startGeminiStream(contents, systemPrompt);

        for await (const chunk of geminiStream) {
          const text = chunk.text ?? "";
          fullResponse += text;
          controller.enqueue(encoder.encode(text));
        }

        await prisma.message.create({
          data: {
            conversationId: conversation.id,
            role: "assistant",
            content: fullResponse,
          },
        });
        controller.close();
      } catch (err) {
        console.error("Gemini stream error:", err);
        controller.error(err);
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "X-Conversation-Id": conversation.id,
    },
  });
}

async function startGeminiStream(
  contents: {
    role: string;
    parts: { text: string }[];
  }[],
  systemPrompt: string,
  retries = 2,
): Promise<AsyncGenerator<GenerateContentResponse>> {
  try {
    return await ai.models.generateContentStream({
      model: "gemini-3.6-flash",
      contents,
      config: { systemInstruction: systemPrompt },
    });
  } catch (err: unknown) {
    let statusCode = Number((err as { status: unknown }).status);

    if (
      !statusCode &&
      typeof err === "object" &&
      err !== null &&
      "message" in err
    ) {
      try {
        const parsed = JSON.parse((err as { message: string }).message);
        statusCode = parsed?.error?.code;
      } catch {
        // ignore parse failure
      }
    }

    if (statusCode === 503 && retries > 0) {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      return startGeminiStream(contents, systemPrompt, retries - 1);
    }

    throw err;
  }
}
