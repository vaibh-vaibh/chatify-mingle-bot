
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Contact {
  id: string;
  name: string;
  avatar?: string;
  lastMessage?: string;
  timestamp?: Date;
  unreadCount?: number;
  isOnline?: boolean;
  isAi?: boolean;
}

interface ContactListProps {
  contacts: Contact[];
  selectedContactId?: string;
  onSelectContact: (contact: Contact) => void;
}

export function ContactList({ contacts, selectedContactId, onSelectContact }: ContactListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredContacts = searchQuery
    ? contacts.filter(contact => 
        contact.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : contacts;
  
  return (
    <div className="flex flex-col h-full border-r">
      <div className="p-3 bg-background/95 backdrop-blur-sm">
        <div className="flex items-center">
          <h1 className="text-xl font-semibold flex-1">Chats</h1>
          <Button variant="ghost" size="icon">
            <Plus className="h-5 w-5" />
          </Button>
        </div>
        <div className="relative mt-2">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search or start new chat"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 bg-secondary/50"
          />
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto bg-background/80">
        {filteredContacts.length === 0 ? (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            No contacts found
          </div>
        ) : (
          <div className="divide-y">
            {filteredContacts.map((contact) => (
              <div
                key={contact.id}
                className={cn(
                  "flex items-center gap-3 p-3 cursor-pointer hover:bg-muted/50 transition-colors",
                  selectedContactId === contact.id && "bg-muted"
                )}
                onClick={() => onSelectContact(contact)}
              >
                <div className="relative">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={contact.avatar} alt={contact.name} />
                    <AvatarFallback className={cn(
                      "text-white",
                      contact.isAi ? "bg-purple-600" : "bg-whatsapp"
                    )}>
                      {contact.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  {contact.isOnline && (
                    <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background"></span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-medium truncate">
                      {contact.isAi && "🤖 "}
                      {contact.name}
                    </h3>
                    {contact.timestamp && (
                      <span className="text-xs text-muted-foreground">
                        {new Intl.DateTimeFormat("en", {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        }).format(contact.timestamp)}
                      </span>
                    )}
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <p className="text-sm text-muted-foreground truncate max-w-[180px]">
                      {contact.lastMessage || "Tap to start chatting"}
                    </p>
                    {contact.unreadCount ? (
                      <span className="bg-whatsapp text-white text-xs rounded-full h-5 min-w-5 flex items-center justify-center px-1">
                        {contact.unreadCount}
                      </span>
                    ) : null}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
