import { useState, useRef, useEffect } from "react";
import { Message } from "@/lib/chat-storage";
import { Send, Bot, User } from "lucide-react";

interface ChatAreaProps {
  messages: Message[];
  isLoading: boolean;
  onSend: (message: string) => void;
}

const TypingIndicator = () => (
  <div className="flex items-start gap-3 animate-fade-in">
    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/20">
      <Bot className="h-4 w-4 text-primary" />
    </div>
    <div className="rounded-2xl rounded-tl-sm bg-chat-ai px-4 py-3">
      <div className="flex gap-1.5">
        <span className="typing-dot h-2 w-2 rounded-full bg-primary/60" />
        <span className="typing-dot h-2 w-2 rounded-full bg-primary/60" />
        <span className="typing-dot h-2 w-2 rounded-full bg-primary/60" />
      </div>
    </div>
  </div>
);

const ChatArea = ({ messages, isLoading, onSend }: ChatAreaProps) => {
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    onSend(input.trim());
    setInput("");
  };

  if (messages.length === 0 && !isLoading) {
    return (
      <div className="flex flex-1 flex-col">
        <div className="flex flex-1 items-center justify-center">
          <div className="text-center animate-slide-up">
            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-3xl bg-primary/10 glow">
              <Bot className="h-10 w-10 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">How can I help you?</h2>
            <p className="text-muted-foreground text-sm max-w-md">Start a conversation and I'll do my best to assist you with anything you need.</p>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="border-t border-border p-4">
          <div className="mx-auto flex max-w-3xl items-center gap-2 rounded-2xl bg-secondary px-4 py-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none py-2"
            />
            <button type="submit" disabled={!input.trim()} className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-all hover:bg-primary/90 disabled:opacity-30">
              <Send className="h-4 w-4" />
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex-1 overflow-y-auto p-4">
        <div className="mx-auto max-w-3xl space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex items-start gap-3 animate-fade-in ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
              <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${msg.role === "user" ? "bg-primary/20" : "bg-primary/20"}`}>
                {msg.role === "user" ? <User className="h-4 w-4 text-primary" /> : <Bot className="h-4 w-4 text-primary" />}
              </div>
              <div className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                msg.role === "user" ? "rounded-tr-sm bg-primary text-primary-foreground" : "rounded-tl-sm bg-chat-ai text-foreground"
              }`}>
                {msg.content}
              </div>
            </div>
          ))}
          {isLoading && <TypingIndicator />}
          <div ref={bottomRef} />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="border-t border-border p-4">
        <div className="mx-auto flex max-w-3xl items-center gap-2 rounded-2xl bg-secondary px-4 py-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none py-2"
          />
          <button type="submit" disabled={!input.trim() || isLoading} className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-all hover:bg-primary/90 disabled:opacity-30">
            <Send className="h-4 w-4" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatArea;
