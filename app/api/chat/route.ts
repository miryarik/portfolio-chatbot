import { prisma } from "@/lib/prisma";
import { ratelimit } from "@/lib/ratelimiter";
import { retrieveContext } from "@/lib/retrieval";
import { SYSTEM_PROMPT } from "@/lib/systemPrompt";
import { GoogleGenAI } from "@google/genai";
import { createHash } from "crypto";
import { NextRequest, NextResponse } from "next/server";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(req: NextRequest) {
  const forwardedFor = req.headers.get("x-forwarded-for");
  const ip =
    (forwardedFor ? forwardedFor.split(",")[0].trim() : null) ||
    req.headers.get("x-real-ip") ||
    "127.0.0.1";

  const { success, pending, limit, reset, remaining } =
    await ratelimit.limit(ip);

  if (!success) return NextResponse.json("Rate Limited", { status: 429 });

  const { message, conversationId } = await req.json();
  if (!message || typeof message != "string") {
    return new Response(JSON.stringify({ error: "Missing message" }), {
      status: 400,
    });
  }

  const context = await retrieveContext(message);
  const systemPrompt = SYSTEM_PROMPT.replace("{{context}}", context);
  const visitorHash = createHash("sha256").update(ip).digest("hex");

  const conversation = conversationId
    ? await prisma.conversation.findUnique({ where: { id: conversationId } })
    : await prisma.conversation.create({ data: { visitorHash } });

  if (!conversation) {
    return new Response(JSON.stringify({ error: "Invalid Conversation" }), {
      status: 400,
    });
  }

  await prisma.message.create({
    data: { conversationId: conversation.id, role: "user", content: message },
  });

  const encoder = new TextEncoder();
  let fullResponse = "";

  const stream = new ReadableStream({
    async start(controller) {
      try {
        const geminiStream = await ai.models.generateContentStream({
          model: "gemini-3.6-flash",
          contents: message,
          config: { systemInstruction: systemPrompt },
        });

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
