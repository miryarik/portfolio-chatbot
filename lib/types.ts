export class RateLimitError extends Error {
  constructor(message = "Rate limited") {
    super(message);
    this.name = "RateLimitError";
  }
}

export class StreamFailedError extends Error {
  constructor(message = "Stream failed") {
    super(message);
    this.name = "StreamFailedError";
  }
}

export type Message = {
  role: "user" | "assistant";
  content: string;
  failed?: boolean;
};
