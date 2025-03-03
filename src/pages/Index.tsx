
import { useState, useEffect } from "react";
import { ChatHeader } from "@/components/ChatHeader";
import { ChatBody } from "@/components/ChatBody";
import { ChatInput } from "@/components/ChatInput";
import { ContactList, Contact } from "@/components/ContactList";
import { ChatEmptyState } from "@/components/ChatEmptyState";
import { ContactInfo } from "@/components/ContactInfo";
import { MessageProps } from "@/components/ChatMessage";
import { useIsMobile } from "@/hooks/use-mobile";
import { getInitialContacts, getInitialMessages, sendMessageWithAiResponse } from "@/lib/message-service";

const Index = () => {
  const [contacts, setContacts] = useState<Contact[]>(getInitialContacts());
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [messages, setMessages] = useState<MessageProps[]>([]);
  const [isAiTyping, setIsAiTyping] = useState(false);
  const [showContactInfo, setShowContactInfo] = useState(false);
  const isMobile = useIsMobile();

  // Update the messages when a contact is selected
  useEffect(() => {
    if (selectedContact) {
      setMessages(getInitialMessages(selectedContact.id));
      setShowContactInfo(false);
    }
  }, [selectedContact]);

  // Handle sending a message
  const handleSendMessage = (content: string) => {
    if (!selectedContact) return;

    const newMessage = sendMessageWithAiResponse(
      content,
      selectedContact.id,
      () => setIsAiTyping(true),
      (aiResponse) => {
        setMessages((prev) => [...prev, aiResponse]);
        setIsAiTyping(false);
        
        // Update the last message for this contact
        setContacts((prevContacts) =>
          prevContacts.map((contact) =>
            contact.id === selectedContact.id
              ? { ...contact, lastMessage: aiResponse.content, timestamp: aiResponse.timestamp }
              : contact
          )
        );
      }
    );

    // Add the outgoing message to the chat
    setMessages((prev) => [...prev, newMessage]);
    
    // Update the last message for this contact
    setContacts((prevContacts) =>
      prevContacts.map((contact) =>
        contact.id === selectedContact.id
          ? { ...contact, lastMessage: content, timestamp: new Date(), unreadCount: 0 }
          : contact
      )
    );
  };

  // Handle contact selection
  const handleSelectContact = (contact: Contact) => {
    // Clear unread message count
    setContacts((prevContacts) =>
      prevContacts.map((c) =>
        c.id === contact.id ? { ...c, unreadCount: 0 } : c
      )
    );
    
    setSelectedContact(contact);
  };

  // Toggle info panel
  const handleToggleInfo = () => {
    setShowContactInfo(prev => !prev);
  };

  // Handle back button on mobile
  const handleBackClick = () => {
    setSelectedContact(null);
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-gray-100 dark:bg-gray-950">
      {/* Contact list - hide on mobile when a chat is selected */}
      {(!isMobile || !selectedContact) && (
        <div className="w-full sm:w-80 md:w-96 h-full">
          <ContactList
            contacts={contacts}
            selectedContactId={selectedContact?.id}
            onSelectContact={handleSelectContact}
          />
        </div>
      )}
      
      {/* Chat area */}
      {(!isMobile || selectedContact) && (
        <div className="flex-1 flex flex-col h-full relative">
          {selectedContact ? (
            <>
              <ChatHeader
                name={selectedContact.name}
                isOnline={selectedContact.isOnline}
                onBackClick={handleBackClick}
                onInfoClick={handleToggleInfo}
              />
              <ChatBody messages={messages} isTyping={isAiTyping} />
              <ChatInput onSendMessage={handleSendMessage} disabled={isAiTyping} />
            </>
          ) : (
            <ChatEmptyState onNewChat={() => {
              // Select the AI assistant by default
              const aiAssistant = contacts.find(c => c.id === "ai-assistant");
              if (aiAssistant) handleSelectContact(aiAssistant);
            }} />
          )}
        </div>
      )}
      
      {/* Contact info sidebar - only show when contact is selected and info panel is open */}
      {selectedContact && showContactInfo && (
        <div className={isMobile ? "fixed inset-0 z-50" : "w-80 md:w-96 h-full"}>
          <ContactInfo contact={selectedContact} onClose={handleToggleInfo} />
        </div>
      )}
    </div>
  );
};

export default Index;
