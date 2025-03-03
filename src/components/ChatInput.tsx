
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mic, Paperclip, Send, Smile } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

export function ChatInput({ onSendMessage, disabled = false }: ChatInputProps) {
  const [message, setMessage] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  
  const handleSend = () => {
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  useEffect(() => {
    // Focus the input when the component mounts
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div className={cn(
      "flex items-center gap-2 p-3 bg-background/95 backdrop-blur-sm border-t",
      disabled && "opacity-60 pointer-events-none"
    )}>
      <Button variant="ghost" size="icon">
        <Smile className="h-5 w-5" />
      </Button>
      <Button variant="ghost" size="icon">
        <Paperclip className="h-5 w-5" />
      </Button>
      <div className="flex-1 relative">
        <Input
          ref={inputRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message"
          className="pr-10 py-6 bg-secondary/50"
        />
        {message.length > 0 && (
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute right-1 top-1/2 -translate-y-1/2 text-whatsapp" 
            onClick={handleSend}
          >
            <Send className="h-5 w-5" />
          </Button>
        )}
      </div>
      {message.length === 0 && (
        <Button variant="ghost" size="icon" className="text-whatsapp">
          <Mic className="h-5 w-5" />
        </Button>
      )}
    </div>
  );
}
