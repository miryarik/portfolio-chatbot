import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function ChatMessage({ content }: { content: string }) {
  return (
    <div className="text-foreground leading-relaxed space-y-2">
      {content.length === 0 ? null : (
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
      )}
    </div>
  );
}
