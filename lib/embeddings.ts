import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function embedText(text: string): Promise<number[]> {
  const res = await ai.models.embedContent({
    model: "gemini-embedding-001",
    contents: { parts: [{ text }] },
    config: { outputDimensionality: 768 },
  });

  const values = res.embeddings?.[0]?.values;

  if (!values) {
    console.error(`Gemini API error: Could not fetch embeddings.`);
    throw new Error(`Gemini API error: Could not fetch embeddings.`);
  }

  return values;
}
