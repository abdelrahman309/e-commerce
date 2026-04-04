import { useState, useEffect, useCallback } from "react";
import { getSession, logout, User } from "@/lib/auth";
import { getUserConversations, createConversation, addMessage, deleteConversation, Conversation, Message } from "@/lib/chat-storage";
import { getAIResponse } from "@/lib/ai-responses";
import AuthPage from "@/components/AuthPage";
import ChatSidebar from "@/components/ChatSidebar";
import ChatArea from "@/components/ChatArea";

const Index = () => {
  const [user, setUser] = useState<User | null>(getSession());
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConvoId, setActiveConvoId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const refreshConversations = useCallback(() => {
    if (!user) return;
    const convos = getUserConversations(user.id);
    setConversations(convos);
    return convos;
  }, [user]);

  useEffect(() => {
    refreshConversations();
  }, [refreshConversations]);

  useEffect(() => {
    if (activeConvoId) {
      const convo = conversations.find((c) => c.id === activeConvoId);
      setMessages(convo?.messages || []);
    } else {
      setMessages([]);
    }
  }, [activeConvoId, conversations]);

  if (!user) return <AuthPage onAuth={(u) => setUser(u)} />;

  const handleNewChat = () => {
    const convo = createConversation(user.id);
    refreshConversations();
    setActiveConvoId(convo.id);
  };

  const handleSelectConvo = (id: string) => setActiveConvoId(id);

  const handleDeleteConvo = (id: string) => {
    deleteConversation(id);
    if (activeConvoId === id) setActiveConvoId(null);
    refreshConversations();
  };

  const handleLogout = () => {
    logout();
    setUser(null);
    setActiveConvoId(null);
  };

  const handleSend = async (content: string) => {
    let convoId = activeConvoId;
    if (!convoId) {
      const convo = createConversation(user.id);
      convoId = convo.id;
      setActiveConvoId(convoId);
    }
    addMessage(convoId, "user", content);
    refreshConversations();
    setIsLoading(true);
    try {
      const reply = await getAIResponse(content);
      addMessage(convoId, "assistant", reply);
    } finally {
      setIsLoading(false);
      refreshConversations();
    }
  };

  return (
    <div className="flex h-screen bg-background">
      <ChatSidebar
        conversations={conversations}
        activeId={activeConvoId}
        user={user}
        onSelect={handleSelectConvo}
        onNew={handleNewChat}
        onDelete={handleDeleteConvo}
        onLogout={handleLogout}
      />
      <div className="flex flex-1 flex-col">
        <ChatArea messages={messages} isLoading={isLoading} onSend={handleSend} />
      </div>
    </div>
  );
};

export default Index;
