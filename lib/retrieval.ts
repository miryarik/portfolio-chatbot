import { embedText } from "./embeddings";
import { prisma } from "./prisma";

export async function retrieveContext(userMessage: string): Promise<string> {
  const queryEmbedding = await embedText(userMessage);
  const vectorLiteral = `[${queryEmbedding.join(",")}]`;

  const results = await prisma.$queryRaw<{ text: string }[]>`
  SELECT text
  FROM "ContentChunk"
  ORDER BY embedding <=> ${vectorLiteral}::vector
  LIMIT 5
  `;

  return results.map((r) => r.text).join("\n\n---\n\n");
}
