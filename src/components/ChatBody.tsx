
import { useEffect, useRef } from "react";
import { ChatMessage, MessageProps } from "./ChatMessage";

interface ChatBodyProps {
  messages: MessageProps[];
  isTyping?: boolean;
}

export function ChatBody({ messages, isTyping = false }: ChatBodyProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  return (
    <div className="flex-1 overflow-y-auto p-4 scrollbar-hide bg-[#E4DDD6] dark:bg-gray-900">
      <div className="flex flex-col space-y-2 pb-4">
        {messages.map((message) => (
          <ChatMessage key={message.id} {...message} />
        ))}
        
        {isTyping && (
          <div className="flex items-center space-x-2 mt-2">
            <div className="message-bubble-incoming">
              <div className="flex space-x-1">
                <div className="w-2 h-2 rounded-full bg-gray-500 animate-pulse"></div>
                <div className="w-2 h-2 rounded-full bg-gray-500 animate-pulse" style={{ animationDelay: "0.2s" }}></div>
                <div className="w-2 h-2 rounded-full bg-gray-500 animate-pulse" style={{ animationDelay: "0.4s" }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}
