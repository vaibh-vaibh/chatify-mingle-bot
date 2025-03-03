
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Contact } from "./ContactList";
import { Bell, Block, Delete, Phone, StarIcon, Trash, Video, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

interface ContactInfoProps {
  contact: Contact;
  onClose: () => void;
}

export function ContactInfo({ contact, onClose }: ContactInfoProps) {
  const isMobile = useIsMobile();
  
  return (
    <div className={cn(
      "flex flex-col h-full bg-background border-l animate-fade-in",
      isMobile ? "animate-slide-in-right" : ""
    )}>
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-lg font-semibold">Contact Info</h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-5 w-5" />
        </Button>
      </div>
      
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        {/* Contact header */}
        <div className="flex flex-col items-center py-8 bg-muted/30">
          <Avatar className="h-28 w-28 mb-4">
            <AvatarImage src={contact.avatar} alt={contact.name} />
            <AvatarFallback className={cn(
              "text-3xl text-white",
              contact.isAi ? "bg-purple-600" : "bg-whatsapp"
            )}>
              {contact.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <h1 className="text-xl font-semibold mb-1">
            {contact.isAi && "🤖 "}
            {contact.name}
          </h1>
          <p className="text-sm text-muted-foreground">
            {contact.isOnline ? "online" : "last seen recently"}
          </p>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-3 gap-2 p-6 border-b">
          <div className="flex flex-col items-center">
            <Button variant="ghost" size="icon" className="h-12 w-12 rounded-full text-whatsapp mb-1">
              <Phone className="h-6 w-6" />
            </Button>
            <span className="text-xs">Call</span>
          </div>
          <div className="flex flex-col items-center">
            <Button variant="ghost" size="icon" className="h-12 w-12 rounded-full text-whatsapp mb-1">
              <Video className="h-6 w-6" />
            </Button>
            <span className="text-xs">Video</span>
          </div>
          <div className="flex flex-col items-center">
            <Button variant="ghost" size="icon" className="h-12 w-12 rounded-full text-whatsapp mb-1">
              <StarIcon className="h-6 w-6" />
            </Button>
            <span className="text-xs">Favorite</span>
          </div>
        </div>

        {/* Info sections */}
        <div className="p-4 border-b">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Info</h3>
          <p className="text-sm">
            {contact.isAi 
              ? "AI Assistant - I'm here to help you with any questions or tasks."
              : "Hey there! I'm using WhatsApp."}
          </p>
        </div>

        {/* Media section */}
        <div className="p-4 border-b">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Media, links and docs</h3>
          <div className="flex justify-center items-center h-20 bg-muted/30 rounded-md">
            <span className="text-sm text-muted-foreground">No media shared</span>
          </div>
        </div>

        {/* Options */}
        <div className="p-4 space-y-4">
          <Button variant="ghost" className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/10">
            <Block className="h-5 w-5 mr-3" />
            Block contact
          </Button>
          <Button variant="ghost" className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/10">
            <Trash className="h-5 w-5 mr-3" />
            Delete chat
          </Button>
        </div>
      </div>
    </div>
  );
}
