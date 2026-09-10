export async function embedText(text: string): Promise<number[]> {
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
