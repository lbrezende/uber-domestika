import { cn } from "@/lib/utils";

export interface Message {
  content: string;
  createdAt: string;
  isOwn: boolean;
}

interface MessageBubbleProps {
  message: Message;
}

function formatTime(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const { content, createdAt, isOwn } = message;

  return (
    <div
      className={cn("flex w-full", isOwn ? "justify-end" : "justify-start")}
    >
      <div
        className={cn(
          "max-w-[75%] rounded-2xl px-4 py-2.5",
          isOwn
            ? "bg-violet-600 text-white rounded-br-md"
            : "bg-gray-100 text-foreground rounded-bl-md"
        )}
      >
        <p className="text-sm leading-relaxed whitespace-pre-wrap">{content}</p>
        <p
          className={cn(
            "text-[11px] mt-1",
            isOwn ? "text-white/70" : "text-muted-foreground"
          )}
        >
          {formatTime(createdAt)}
        </p>
      </div>
    </div>
  );
}
