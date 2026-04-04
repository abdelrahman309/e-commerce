import { Conversation } from "@/lib/chat-storage";
import { User } from "@/lib/auth";
import { Plus, MessageSquare, Trash2, LogOut, Bot } from "lucide-react";

interface ChatSidebarProps {
  conversations: Conversation[];
  activeId: string | null;
  user: User;
  onSelect: (id: string) => void;
  onNew: () => void;
  onDelete: (id: string) => void;
  onLogout: () => void;
}

const ChatSidebar = ({ conversations, activeId, user, onSelect, onNew, onDelete, onLogout }: ChatSidebarProps) => {
  return (
    <div className="flex h-full w-64 flex-col bg-card border-r border-border">
      <div className="flex items-center gap-2 p-4 border-b border-border">
        <Bot className="h-6 w-6 text-primary" />
        <span className="font-bold gradient-text text-lg">NexusAI</span>
      </div>

      <button
        onClick={onNew}
        className="mx-3 mt-3 flex items-center gap-2 rounded-xl border border-border px-4 py-2.5 text-sm font-medium text-foreground transition-all hover:bg-secondary"
      >
        <Plus className="h-4 w-4" /> New Chat
      </button>

      <div className="mt-3 flex-1 overflow-y-auto px-3 space-y-1">
        {conversations.map((c) => (
          <div
            key={c.id}
            onClick={() => onSelect(c.id)}
            className={`group flex cursor-pointer items-center gap-2 rounded-xl px-3 py-2.5 text-sm transition-all ${
              activeId === c.id ? "bg-secondary text-foreground" : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
            }`}
          >
            <MessageSquare className="h-4 w-4 shrink-0" />
            <span className="flex-1 truncate">{c.title}</span>
            <button
              onClick={(e) => { e.stopPropagation(); onDelete(c.id); }}
              className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}
      </div>

      <div className="border-t border-border p-3">
        <div className="flex items-center justify-between rounded-xl px-3 py-2">
          <div className="flex items-center gap-2 min-w-0">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary text-xs font-bold">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <span className="truncate text-sm text-foreground">{user.name}</span>
          </div>
          <button onClick={onLogout} className="text-muted-foreground hover:text-foreground transition-colors">
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatSidebar;
