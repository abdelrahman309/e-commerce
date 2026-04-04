import { CartItem, Order, Product } from "@/data/products";

// ---- Auth ----
export interface User { id: string; email: string; name: string; }
const USERS_KEY = "techstore_users";
const SESSION_KEY = "techstore_session";

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
export function logout() { localStorage.removeItem(SESSION_KEY); }
export function getSession(): User | null {
  const s = localStorage.getItem(SESSION_KEY);
  return s ? JSON.parse(s) : null;
}

// ---- Cart ----
const CART_KEY = "techstore_cart";
export function getCart(): CartItem[] {
  return JSON.parse(localStorage.getItem(CART_KEY) || "[]");
}
export function addToCart(product: Product, qty = 1) {
  const cart = getCart();
  const existing = cart.find(i => i.product.id === product.id);
  if (existing) existing.quantity += qty;
  else cart.push({ product, quantity: qty });
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}
export function updateCartQty(productId: string, qty: number) {
  let cart = getCart();
  if (qty <= 0) cart = cart.filter(i => i.product.id !== productId);
  else cart = cart.map(i => i.product.id === productId ? { ...i, quantity: qty } : i);
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}
export function removeFromCart(productId: string) {
  localStorage.setItem(CART_KEY, JSON.stringify(getCart().filter(i => i.product.id !== productId)));
}
export function clearCart() { localStorage.removeItem(CART_KEY); }
export function getCartTotal(): number {
  return getCart().reduce((sum, i) => sum + i.product.price * i.quantity, 0);
}
export function getCartCount(): number {
  return getCart().reduce((sum, i) => sum + i.quantity, 0);
}

// ---- Wishlist ----
const WISH_KEY = "techstore_wishlist";
export function getWishlist(): Product[] {
  return JSON.parse(localStorage.getItem(WISH_KEY) || "[]");
}
export function toggleWishlist(product: Product): boolean {
  const list = getWishlist();
  const exists = list.find(p => p.id === product.id);
  if (exists) {
    localStorage.setItem(WISH_KEY, JSON.stringify(list.filter(p => p.id !== product.id)));
    return false;
  }
  list.push(product);
  localStorage.setItem(WISH_KEY, JSON.stringify(list));
  return true;
}
export function isInWishlist(productId: string): boolean {
  return getWishlist().some(p => p.id === productId);
}

// ---- Orders ----
const ORDERS_KEY = "techstore_orders";
export function getOrders(): Order[] {
  return JSON.parse(localStorage.getItem(ORDERS_KEY) || "[]");
}
export function placeOrder(items: CartItem[], total: number, address: string): Order {
  const orders = getOrders();
  const order: Order = {
    id: `ORD-${Date.now().toString(36).toUpperCase()}`,
    items, total, address, date: Date.now(),
    status: "processing",
  };
  orders.unshift(order);
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  clearCart();
  return order;
}
