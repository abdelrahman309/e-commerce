export interface User {
  id: string;
  email: string;
  name: string;
}

const USERS_KEY = "chatbot_users";
const SESSION_KEY = "chatbot_session";

function getUsers(): Record<string, { password: string; name: string }> {
  return JSON.parse(localStorage.getItem(USERS_KEY) || "{}");
}

export function signup(email: string, password: string, name: string): User {
  const users = getUsers();
  if (users[email]) throw new Error("Email already registered");
  users[email] = { password, name };
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  const user = { id: email, email, name };
  localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  return user;
}

export function login(email: string, password: string): User {
  const users = getUsers();
  const u = users[email];
  if (!u || u.password !== password) throw new Error("Invalid email or password");
  const user = { id: email, email, name: u.name };
  localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  return user;
}

export function logout() {
  localStorage.removeItem(SESSION_KEY);
}

export function getSession(): User | null {
  const s = localStorage.getItem(SESSION_KEY);
  return s ? JSON.parse(s) : null;
}
