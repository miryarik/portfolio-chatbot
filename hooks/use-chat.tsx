"use client";

import { Message, RateLimitError, StreamFailedError } from "@/lib/types";
import { sampleChat } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([...sampleChat]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function streamReply(payload: {
    message?: string;
    conversationId: string | null;
    regenerate?: boolean;
  }) {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.status === 429) throw new RateLimitError();
    if (!res.ok || !res.body) throw new StreamFailedError();

    const newConversationId = res.headers.get("X-Conversation-Id");
    if (newConversationId) setConversationId(newConversationId);

    const reader = res.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const chunk = decoder.decode(value, { stream: true });

      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: "assistant",
          content: updated[updated.length - 1].content + chunk,
        };
        return updated;
      });
    }
  }

  async function sendMessage() {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    setError(null);
    setInput("");
    setMessages((prev) => [
      ...prev,
      { role: "user", content: trimmed },
      { role: "assistant", content: "" },
    ]);
    setIsLoading(true);

    try {
      await streamReply({ message: trimmed, conversationId });
    } catch (err: unknown) {
      if (err instanceof RateLimitError) {
        setError("You've hit the message limit for now - try again in a bit.");
        setMessages((prev) => prev.slice(0, -1));
      } else {
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            role: "assistant",
            content: "",
            failed: true,
          };
          return updated;
        });
      }
    } finally {
      setIsLoading(false);
    }
  }

  async function regenerate() {
    if (isLoading) return;
    setIsLoading(true);
    setError(null);
    setMessages((prev) => {
      const updated = [...prev];
      updated[updated.length - 1] = { role: "assistant", content: "" };
      return updated;
    });

    try {
      await streamReply({ conversationId, regenerate: true });
    } catch {
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: "assistant",
          content: "",
          failed: true,
        };
        return updated;
      });
    } finally {
      setIsLoading(false);
    }
  }

  return {
    messages,
    input,
    setInput,
    isLoading,
    error,
    messagesEndRef,
    sendMessage,
    regenerate,
  };
}
