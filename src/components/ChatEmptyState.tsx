
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";

interface ChatEmptyStateProps {
  onNewChat?: () => void;
}

export function ChatEmptyState({ onNewChat }: ChatEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full p-4 bg-[#F0EEE9] dark:bg-gray-900">
      <div className="max-w-md text-center animate-fade-in">
        <div className="h-16 w-16 rounded-full bg-whatsapp/10 flex items-center justify-center mx-auto mb-6">
          <MessageSquare className="h-8 w-8 text-whatsapp" />
        </div>
        <h2 className="text-2xl font-semibold mb-2">Welcome to WhatsApp</h2>
        <p className="text-muted-foreground mb-6">
          Select a contact to start chatting or create a new conversation
        </p>
        <Button onClick={onNewChat} className="bg-whatsapp hover:bg-whatsapp-dark">
          New Chat
        </Button>
      </div>
    </div>
  );
}
