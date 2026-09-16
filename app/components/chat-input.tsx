import { cn } from "@/lib/utils";
import { ArrowUp } from "lucide-react";

export default function ChatInput({
  input,
  setInput,
  sendMessage,
  isLoading,
  error,
}: {
  input: string;
  setInput: (v: string) => void;
  sendMessage: () => void;
  isLoading: boolean;
  error: string | null;
}) {
  return (
    <>
      {error && <p className="text-sm text-red-500 px-2">{error}</p>}
      <div
        className={cn(
          "flex items-center gap-2 w-full shadow-input-shadow bg-chat-input-bg rounded-full p-2",
        )}
      >
        <textarea
          className="resize-none w-full h-min pl-4 focus:outline-none"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              sendMessage();
            }
          }}
          placeholder="Ask Yarik a question"
          rows={1}
          disabled={isLoading}
        />
        <button
          onClick={sendMessage}
          disabled={isLoading || !input.trim()}
          className="bg-submit-button-bg p-2 rounded-full cursor-pointer"
        >
          <ArrowUp className="text-white" />
        </button>
      </div>
    </>
  );
}
