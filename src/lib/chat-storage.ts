export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: number;
}

export interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  userId: string;
  createdAt: number;
  updatedAt: number;
}

const CONVOS_KEY = "chatbot_conversations";

function getAll(): Conversation[] {
  return JSON.parse(localStorage.getItem(CONVOS_KEY) || "[]");
}

function saveAll(convos: Conversation[]) {
  localStorage.setItem(CONVOS_KEY, JSON.stringify(convos));
}

export function getUserConversations(userId: string): Conversation[] {
  return getAll().filter((c) => c.userId === userId).sort((a, b) => b.updatedAt - a.updatedAt);
}

export function getConversation(id: string): Conversation | undefined {
  return getAll().find((c) => c.id === id);
}

export function createConversation(userId: string): Conversation {
  const convo: Conversation = {
    id: crypto.randomUUID(),
    title: "New Chat",
    messages: [],
    userId,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
  saveAll([...getAll(), convo]);
  return convo;
}

export function addMessage(convoId: string, role: "user" | "assistant", content: string): Message {
  const all = getAll();
  const convo = all.find((c) => c.id === convoId);
  if (!convo) throw new Error("Conversation not found");
  const msg: Message = { id: crypto.randomUUID(), role, content, timestamp: Date.now() };
  convo.messages.push(msg);
  if (convo.messages.length === 1 && role === "user") {
    convo.title = content.slice(0, 40) + (content.length > 40 ? "..." : "");
  }
  convo.updatedAt = Date.now();
  saveAll(all);
  return msg;
}

export function deleteConversation(id: string) {
  saveAll(getAll().filter((c) => c.id !== id));
}
