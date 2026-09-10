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
          "flex items-center gap-2 w-full bg-neutral-900 border border-neutral-800 shadow-neutral-200 rounded-full p-2",
        )}
      >
        <textarea
          className="resize-none w-full  h-min pl-4 focus:outline-none"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              sendMessage();
            }
          }}
          placeholder="Ask me a question"
          rows={1}
          disabled={isLoading}
        />
        <button
          onClick={sendMessage}
          disabled={isLoading || !input.trim()}
          className="bg-blue-600 p-2 rounded-full cursor-pointer hover:bg-blue-500"
        >
          <ArrowUp />
        </button>
      </div>
    </>
  );
}
