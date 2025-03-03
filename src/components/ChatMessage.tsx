
import { cn } from "@/lib/utils";
import { Check, CheckCheck } from "lucide-react";
import { useState, useEffect } from "react";

export type MessageStatus = "sending" | "sent" | "delivered" | "read";

export interface MessageProps {
  id: string;
  content: string;
  timestamp: Date;
  isOutgoing: boolean;
  status?: MessageStatus;
  isAi?: boolean;
}

export function ChatMessage({ content, timestamp, isOutgoing, status = "sent", isAi = false }: MessageProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Small delay for staggered animation effect
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  // Format time as HH:MM
  const time = new Intl.DateTimeFormat("en", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(timestamp);

  return (
    <div className={cn(
      "flex w-full mb-2 transition-opacity duration-300",
      isOutgoing ? "justify-end" : "justify-start",
      isVisible ? "opacity-100" : "opacity-0"
    )}>
      <div className={isOutgoing ? "message-bubble-outgoing" : "message-bubble-incoming"}>
        {isAi && !isOutgoing && (
          <div className="text-xs font-medium text-whatsapp mb-1">AI Assistant</div>
        )}
        <p className="text-sm">{content}</p>
        <div className="flex items-center justify-end text-gray-500 mt-1">
          <span className="text-[10px]">{time}</span>
          {isOutgoing && (
            <span className="ml-1">
              {status === "sending" && (
                <div className="w-3 h-3 rounded-full border-2 border-gray-300 border-t-transparent animate-spin" />
              )}
              {status === "sent" && <Check className="h-3 w-3" />}
              {status === "delivered" && <CheckCheck className="h-3 w-3" />}
              {status === "read" && <CheckCheck className="h-3 w-3 text-blue-500" />}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
