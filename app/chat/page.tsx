"use client";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import ChatInput from "../components/chat-input";
import ChatMessage from "../components/chat-message";
import QuantumLoader from "../components/quantum-spinner";
import { useChat } from "@/hooks/use-chat";

export default function ChatPage() {
  const {
    messages,
    input,
    setInput,
    isLoading,
    error,
    messagesEndRef,
    sendMessage,
    regenerate,
  } = useChat();

  const isInitialState = messages.length === 0;

  return (
    <main className="mx-auto max-w-180 w-full h-screen p-4 flex flex-col items-center">
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
            <p className="text-2xl sm:text-3xl font-semibold sans text-foreground">
              Hey! I am Yarik&apos;s Chatbot!
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
            className="flex-1 flex flex-col w-full min-h-0 overflow-y-auto scrollbar-none pr-2 my-4"
          >
            <div className="mt-auto flex flex-col">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={cn("flex my-4", {
                    "justify-end": msg.role === "user",
                    "justify-start": msg.role === "assistant",
                    hidden: msg.content.length === 0 && !isLoading,
                  })}
                >
                  {msg.failed ? (
                    <div className="flex flex-col items-start gap-2">
                      <p className="text-sm text-red-500">
                        That response got interrupted. Want to try again?
                      </p>
                      <button
                        onClick={regenerate}
                        className="rounded-xl border px-3 py-1 text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
                      >
                        Regenerate response
                      </button>
                    </div>
                  ) : (
                    <div
                      className={cn(
                        "max-w-[80%] rounded-3xl text-md sm:text-lg px-4 py-2 whitespace-pre-wrap",
                        {
                          "bg-chat-bubble-blue rounded-br-sm":
                            msg.role === "user",
                          "text-background max-w-full": msg.role !== "user",
                        },
                      )}
                    >
                      {msg.content ? (
                        <ChatMessage content={msg.content} />
                      ) : (
                        isLoading &&
                        i === messages.length - 1 && (
                          <QuantumLoader size={25} className="bg-background" />
                        )
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
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
