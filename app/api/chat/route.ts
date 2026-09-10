import { prisma } from "@/lib/prisma";
import { retrieveContext } from "@/lib/retrieval";
import { SYSTEM_PROMPT } from "@/lib/systemPrompt";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(req: Request) {
  const { message, conversationId } = await req.json();
  if (!message || typeof message != "string") {
    return new Response(JSON.stringify({ error: "Missing message" }), {
      status: 400,
    });
  }

  const context = await retrieveContext(message);
  const systemPrompt = SYSTEM_PROMPT.replace("{{context}}", context);

  const conversation = conversationId
    ? await prisma.conversation.findUnique({ where: { id: conversationId } })
    : await prisma.conversation.create({ data: { visitorHash: "temp-hash" } });

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
