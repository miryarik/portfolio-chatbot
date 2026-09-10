"use client";
import { cn, sampleChat } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import ChatInput from "./components/chat-input";

type Message = { role: "user" | "assistant"; content: string };

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const isInitialState = messages.length === 0;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function sendMessage() {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    setError(null);
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: trimmed }]);
    setMessages((prev) => [...prev, { role: "assistant", content: "" }]);
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed, conversationId }),
      });

      if (res.status === 429) {
        setError("You've hit the message limit for now — try again in a bit.");
        setMessages((prev) => prev.slice(0, -1));
        setIsLoading(false);
        return;
      }

      if (!res.ok || !res.body) {
        throw new Error("Request failed");
      }

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
    } catch (err) {
      console.error(err);
      setError("Something went wrong — please try again.");
      setMessages((prev) => prev.slice(0, -1));
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="mx-auto min-w-100 max-w-200 w-full h-screen p-4 flex flex-col items-center">
      <AnimatePresence mode="wait">
        {isInitialState ? (
          <motion.div
            key="welcome"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="flex-1 flex flex-col items-center justify-center w-full gap-6"
          >
            <p className="text-3xl font-semibold text-white">
              Hey! I am Yarik&apos;s portfolio!
            </p>

            <motion.div
              layoutId="chat-input"
              className="w-full flex flex-col gap-2"
            >
              <ChatInput
                input={input}
                setInput={setInput}
                sendMessage={sendMessage}
                isLoading={isLoading}
                error={error}
              />
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="chat-list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex-1 w-full min-h-0 overflow-y-auto scrollbar-none pr-2 my-4"
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                className={cn("flex my-4", {
                  "justify-end": msg.role === "user",
                  "justify-start": msg.role === "assistant",
                })}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2 whitespace-pre-wrap ${
                    msg.role === "user"
                      ? "bg-blue-900 text-white"
                      : "text-white"
                  }`}
                >
                  {msg.content ||
                    (isLoading && i === messages.length - 1 ? "..." : "")}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </motion.div>
        )}
      </AnimatePresence>

      {!isInitialState && (
        <motion.div
          layoutId="chat-input"
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="w-full flex flex-col gap-2 mt-auto"
        >
          <ChatInput
            input={input}
            setInput={setInput}
            sendMessage={sendMessage}
            isLoading={isLoading}
            error={error}
          />
        </motion.div>
      )}
    </main>
  );
}
