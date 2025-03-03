
import { Contact } from "@/components/ContactList";
import { MessageProps } from "@/components/ChatMessage";

// AI responses for simulating AI conversation
const aiResponses = [
  "I'm here to help! What can I assist you with today?",
  "That's an interesting question. Let me help you with that.",
  "I understand what you're asking. Here's what I can tell you...",
  "I'm processing your request. Give me a moment...",
  "Thanks for your message! I'm generating a response for you.",
  "I appreciate your patience. Let me work on that for you.",
  "I'm designed to assist with a wide range of questions and tasks.",
  "Is there anything else you'd like to know about this topic?",
  "I'm constantly learning and improving to provide better assistance.",
  "Feel free to ask me anything, and I'll do my best to help!"
];

// Generate a random ID
export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 10);
};

// Simulate sending a message with AI response
export const sendMessageWithAiResponse = (
  message: string,
  contactId: string,
  onAiTypingStart: () => void,
  onAiResponse: (message: MessageProps) => void
): MessageProps => {
  // Create the outgoing message
  const outgoingMessage: MessageProps = {
    id: generateId(),
    content: message,
    timestamp: new Date(),
    isOutgoing: true,
    status: "sending",
  };

  // Simulate message being sent
  setTimeout(() => {
    outgoingMessage.status = "delivered";
    // Simulate the contact reading the message
    setTimeout(() => {
      outgoingMessage.status = "read";
    }, 2000);
  }, 1000);

  // If this is the AI contact, generate a response
  if (contactId === "ai-assistant") {
    // Start the AI typing indicator
    setTimeout(() => {
      onAiTypingStart();
      
      // Generate a random response after a delay
      setTimeout(() => {
        const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];
        
        const aiMessage: MessageProps = {
          id: generateId(),
          content: randomResponse,
          timestamp: new Date(),
          isOutgoing: false,
          isAi: true,
        };
        
        onAiResponse(aiMessage);
      }, 2000 + Math.random() * 2000); // Random delay between 2-4 seconds
    }, 1000);
  }

  return outgoingMessage;
};

// Initial sample contacts
export const getInitialContacts = (): Contact[] => [
  {
    id: "ai-assistant",
    name: "AI Assistant",
    lastMessage: "How can I help you today?",
    timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
    isOnline: true,
    isAi: true,
  },
  {
    id: "alice",
    name: "Alice Smith",
    lastMessage: "See you tomorrow!",
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    unreadCount: 2,
    isOnline: true,
  },
  {
    id: "bob",
    name: "Bob Johnson",
    lastMessage: "Thanks for the update.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
  },
  {
    id: "carol",
    name: "Carol Williams",
    lastMessage: "Can we schedule a call?",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
    isOnline: true,
  },
  {
    id: "dave",
    name: "Dave Brown",
    lastMessage: "I've shared the document with you.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
  },
  {
    id: "eve",
    name: "Eve Davis",
    lastMessage: "Looking forward to the weekend!",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
  },
  {
    id: "frank",
    name: "Frank Miller",
    lastMessage: "Did you see the news?",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 72), // 3 days ago
  },
  {
    id: "grace",
    name: "Grace Taylor",
    lastMessage: "Happy birthday!",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 96), // 4 days ago
  },
];

// Get initial messages for a conversation
export const getInitialMessages = (contactId: string): MessageProps[] => {
  if (contactId === "ai-assistant") {
    return [
      {
        id: generateId(),
        content: "Hello! I'm your AI assistant. How can I help you today?",
        timestamp: new Date(Date.now() - 1000 * 60 * 30),
        isOutgoing: false,
        isAi: true,
      },
    ];
  }
  
  return [];
};
