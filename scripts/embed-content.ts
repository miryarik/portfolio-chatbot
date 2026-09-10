import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../app/generated/prisma/client";
import fs from "node:fs";
import path from "node:path";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function chunkFile(filename: string, text: string): string[] {
  const hasSubHeaders = text.includes("\n## ");
  if (filename == "likes-and-interests.md") {
    return [text.trim()];
  }

  if (filename == "outside-engineering.md") return [text.trim()];

  if (hasSubHeaders) {
    const parts = text
      .split(/\n(?=##)/)
      .map((p) => p.trim())
      .filter((p) => p.length > 20 && !/^#\s/.test(p));

    return parts;
  }

  return text
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter((p) => p.length > 40);
}

async function embedText(text: string): Promise<number[]> {
  const res = await fetch("https://api.voyageai.com/v1/embeddings", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.VOYAGE_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ input: [text], model: "voyage-3" }),
  });
  const data = await res.json();
  if (!res.ok) {
    console.error(
      `Voyage API error (status ${res.status}):`,
      JSON.stringify(data),
    );
    throw new Error(`Voyage embedding request failed: ${res.status}`);
  }
  return data.data[0].embedding;
}

async function main() {
  const CONTENT_DIR = path.join(import.meta.dirname, "../content");
  const files = fs.readdirSync(CONTENT_DIR);
  let isFirst = true;

  for (const filename of files) {
    const text = fs.readFileSync(path.join(CONTENT_DIR, filename), "utf-8");
    const chunks = chunkFile(filename, text);
    console.log(`${filename}: ${chunks.length} chunks`);
    // console.log(chunks);

    for (const chunk of chunks) {
      if (!isFirst) await sleep(21000);
      isFirst = false;
      const embedding = await embedText(chunk);
      const vectorLiteral = `[${embedding.join(",")}]`;
      await prisma.$executeRaw`
        INSERT INTO "ContentChunk" (id, "sourceLabel", text, embedding, "createdAt")
        VALUES (${crypto.randomUUID()}, ${filename}, ${chunk}, ${vectorLiteral}::vector, now())
      `;

      console.log(`  embedded + inserted chunk (${chunk.slice(0, 40)}...)`);
    }
  }
}

main()
  .then(() => console.log("Done"))
  .finally(() => prisma.$disconnect());
