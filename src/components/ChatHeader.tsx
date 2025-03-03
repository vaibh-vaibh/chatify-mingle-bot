
import { Button } from "@/components/ui/button";
import { ArrowLeft, MoreVertical, Phone, Search, Video } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useIsMobile } from "@/hooks/use-mobile";

interface ChatHeaderProps {
  name: string;
  avatar?: string;
  isOnline?: boolean;
  onBackClick?: () => void;
  onInfoClick?: () => void;
}

export function ChatHeader({ name, avatar, isOnline = false, onBackClick, onInfoClick }: ChatHeaderProps) {
  const isMobile = useIsMobile();
  
  return (
    <div className="flex items-center justify-between p-3 border-b bg-background/95 backdrop-blur-sm">
      <div className="flex items-center gap-3">
        {isMobile && (
          <Button variant="ghost" size="icon" onClick={onBackClick} className="mr-1">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        )}
        <Avatar className="h-10 w-10 cursor-pointer transition-transform hover:scale-105" onClick={onInfoClick}>
          <AvatarImage src={avatar} alt={name} />
          <AvatarFallback className="bg-whatsapp text-white">
            {name.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div>
          <h2 className="font-medium text-sm truncate max-w-[120px] sm:max-w-[200px]">{name}</h2>
          {isOnline ? (
            <p className="text-xs text-emerald-600">online</p>
          ) : (
            <p className="text-xs text-muted-foreground">last seen recently</p>
          )}
        </div>
      </div>
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="icon" className="text-whatsapp">
          <Video className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className="text-whatsapp">
          <Phone className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <Search className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" onClick={onInfoClick}>
          <MoreVertical className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
