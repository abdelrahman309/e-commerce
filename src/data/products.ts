export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  category: string;
  brand: string;
  rating: number;
  reviewCount: number;
  description: string;
  features: string[];
  inStock: boolean;
  badge?: "sale" | "new";
  colors?: string[];
  specs?: Record<string, string>;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  date: number;
  status: "processing" | "shipped" | "delivered";
  address: string;
}

export const categories = [
  { id: "smartphones", name: "Smartphones", icon: "📱", count: 6 },
  { id: "laptops", name: "Laptops", icon: "💻", count: 5 },
  { id: "headphones", name: "Headphones", icon: "🎧", count: 4 },
  { id: "watches", name: "Smartwatches", icon: "⌚", count: 4 },
  { id: "tablets", name: "Tablets", icon: "📟", count: 3 },
  { id: "accessories", name: "Accessories", icon: "🔌", count: 4 },
];

export const products: Product[] = [
  {
    id: "1", name: "iPhone 15 Pro Max", slug: "iphone-15-pro-max",
    price: 1199, originalPrice: 1299, image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&h=600&fit=crop",
    images: ["https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&h=800&fit=crop"],
    category: "smartphones", brand: "Apple", rating: 4.8, reviewCount: 2340,
    description: "The most powerful iPhone ever with A17 Pro chip, titanium design, and an advanced camera system.",
    features: ["A17 Pro chip", "48MP camera system", "Titanium design", "Action button", "USB-C"],
    inStock: true, badge: "sale", colors: ["Natural Titanium", "Blue Titanium", "White Titanium", "Black Titanium"],
    specs: { "Display": "6.7\" Super Retina XDR", "Chip": "A17 Pro", "Battery": "Up to 29h video", "Storage": "256GB - 1TB" }
  },
  {
    id: "2", name: "Samsung Galaxy S24 Ultra", slug: "samsung-galaxy-s24-ultra",
    price: 1299, image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=600&h=600&fit=crop",
    images: ["https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800&h=800&fit=crop"],
    category: "smartphones", brand: "Samsung", rating: 4.7, reviewCount: 1890,
    description: "Galaxy AI-powered smartphone with built-in S Pen and titanium frame.",
    features: ["Galaxy AI", "S Pen built-in", "200MP camera", "Titanium frame", "Snapdragon 8 Gen 3"],
    inStock: true, badge: "new", colors: ["Titanium Gray", "Titanium Black", "Titanium Violet"],
    specs: { "Display": "6.8\" QHD+ AMOLED", "Chip": "Snapdragon 8 Gen 3", "Battery": "5000mAh", "Storage": "256GB - 1TB" }
  },
  {
    id: "3", name: "MacBook Pro 16\" M3 Max", slug: "macbook-pro-16-m3-max",
    price: 2499, originalPrice: 2699, image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&h=600&fit=crop",
    images: ["https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&h=800&fit=crop"],
    category: "laptops", brand: "Apple", rating: 4.9, reviewCount: 1560,
    description: "The most powerful MacBook Pro ever with M3 Max chip and stunning Liquid Retina XDR display.",
    features: ["M3 Max chip", "36GB unified memory", "Liquid Retina XDR", "Up to 22h battery", "MagSafe charging"],
    inStock: true, badge: "sale", colors: ["Space Black", "Silver"],
    specs: { "Display": "16.2\" Liquid Retina XDR", "Chip": "M3 Max", "Memory": "36GB", "Storage": "1TB SSD" }
  },
  {
    id: "4", name: "Sony WH-1000XM5", slug: "sony-wh-1000xm5",
    price: 348, originalPrice: 399, image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=600&h=600&fit=crop",
    images: ["https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=800&h=800&fit=crop"],
    category: "headphones", brand: "Sony", rating: 4.7, reviewCount: 3200,
    description: "Industry-leading noise canceling headphones with exceptional sound quality.",
    features: ["Auto NC Optimizer", "30h battery life", "Multipoint connection", "Speak-to-Chat", "LDAC codec"],
    inStock: true, badge: "sale",
    specs: { "Driver": "30mm", "ANC": "Dual processor", "Battery": "30 hours", "Weight": "250g" }
  },
  {
    id: "5", name: "Apple Watch Ultra 2", slug: "apple-watch-ultra-2",
    price: 799, image: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=600&h=600&fit=crop",
    images: ["https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=800&h=800&fit=crop"],
    category: "watches", brand: "Apple", rating: 4.8, reviewCount: 980,
    description: "The most rugged and capable Apple Watch with precision GPS and up to 36h battery life.",
    features: ["S9 SiP", "Precision dual-frequency GPS", "36h battery", "100m water resistant", "Action button"],
    inStock: true, badge: "new",
    specs: { "Case": "49mm titanium", "Display": "Always-On Retina", "Battery": "36 hours", "Water": "100m" }
  },
  {
    id: "6", name: "iPad Pro 12.9\" M2", slug: "ipad-pro-12-m2",
    price: 1099, image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&h=600&fit=crop",
    images: ["https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&h=800&fit=crop"],
    category: "tablets", brand: "Apple", rating: 4.8, reviewCount: 1340,
    description: "Supercharged by M2, with an immersive 12.9-inch Liquid Retina XDR display.",
    features: ["M2 chip", "Liquid Retina XDR", "Apple Pencil hover", "Thunderbolt", "Face ID"],
    inStock: true,
    specs: { "Display": "12.9\" Liquid Retina XDR", "Chip": "M2", "Storage": "128GB - 2TB", "Camera": "12MP Wide + 10MP Ultra Wide" }
  },
  {
    id: "7", name: "AirPods Pro 2nd Gen", slug: "airpods-pro-2",
    price: 249, image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=600&h=600&fit=crop",
    images: ["https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=800&h=800&fit=crop"],
    category: "headphones", brand: "Apple", rating: 4.7, reviewCount: 4500,
    description: "Rebuilt from the sound up with Apple's H2 chip for smarter noise cancellation.",
    features: ["H2 chip", "Adaptive Transparency", "Personalized Spatial Audio", "USB-C MagSafe case", "6h listening"],
    inStock: true, badge: "new",
    specs: { "Chip": "H2", "ANC": "2x more active", "Battery": "6h (30h with case)", "Water": "IPX4" }
  },
  {
    id: "8", name: "Dell XPS 15", slug: "dell-xps-15",
    price: 1799, image: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600&h=600&fit=crop",
    images: ["https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800&h=800&fit=crop"],
    category: "laptops", brand: "Dell", rating: 4.5, reviewCount: 890,
    description: "Premium ultrabook with stunning InfinityEdge display and powerful Intel processors.",
    features: ["13th Gen Intel i7", "OLED 3.5K display", "32GB RAM", "InfinityEdge design", "Thunderbolt 4"],
    inStock: true,
    specs: { "Display": "15.6\" OLED 3.5K", "CPU": "Intel i7-13700H", "RAM": "32GB", "Storage": "1TB SSD" }
  },
  {
    id: "9", name: "Google Pixel Watch 2", slug: "google-pixel-watch-2",
    price: 349, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop",
    images: ["https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=800&fit=crop"],
    category: "watches", brand: "Google", rating: 4.4, reviewCount: 650,
    description: "The helpful smartwatch with the best of Fitbit and Google, redesigned inside and out.",
    features: ["Fitbit integration", "Safety features", "Google AI", "Heart rate monitoring", "Wear OS"],
    inStock: true,
    specs: { "Display": "AMOLED", "Chip": "Snapdragon W5", "Battery": "24 hours", "Water": "5ATM" }
  },
  {
    id: "10", name: "MagSafe Charger Bundle", slug: "magsafe-charger-bundle",
    price: 89, originalPrice: 129, image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=600&h=600&fit=crop",
    images: ["https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800&h=800&fit=crop"],
    category: "accessories", brand: "Apple", rating: 4.5, reviewCount: 2100,
    description: "Premium MagSafe charging bundle including charger, stand, and cable.",
    features: ["15W wireless charging", "Perfect alignment", "Compatible with MagSafe cases", "LED indicator"],
    inStock: true, badge: "sale",
    specs: { "Power": "15W", "Compatibility": "iPhone 12+", "Cable": "1m USB-C", "Weight": "56g" }
  },
  {
    id: "11", name: "Pixel 8 Pro", slug: "pixel-8-pro",
    price: 999, image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&h=600&fit=crop",
    images: ["https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&h=800&fit=crop"],
    category: "smartphones", brand: "Google", rating: 4.6, reviewCount: 1450,
    description: "The best of Google AI in a premium smartphone with pro-level camera.",
    features: ["Tensor G3", "Pro camera system", "7 years of updates", "AI features", "Temperature sensor"],
    inStock: true,
    specs: { "Display": "6.7\" LTPO OLED", "Chip": "Tensor G3", "Battery": "5050mAh", "Storage": "128GB - 1TB" }
  },
  {
    id: "12", name: "USB-C Hub Pro", slug: "usb-c-hub-pro",
    price: 79, image: "https://images.unsplash.com/photo-1625842268584-8f3296236761?w=600&h=600&fit=crop",
    images: ["https://images.unsplash.com/photo-1625842268584-8f3296236761?w=800&h=800&fit=crop"],
    category: "accessories", brand: "Anker", rating: 4.6, reviewCount: 3400,
    description: "10-in-1 USB-C hub with HDMI 4K, Ethernet, SD card reader, and more.",
    features: ["HDMI 4K@60Hz", "Gigabit Ethernet", "100W PD charging", "SD/microSD", "3x USB-A 3.0"],
    inStock: true,
    specs: { "Ports": "10-in-1", "HDMI": "4K@60Hz", "PD": "100W passthrough", "Data": "USB 3.0 5Gbps" }
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter(p => p.category === category);
}

export function getFeaturedProducts(): Product[] {
  return products.filter(p => p.badge).slice(0, 4);
}

export function searchProducts(query: string): Product[] {
  const q = query.toLowerCase();
  return products.filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.brand.toLowerCase().includes(q) ||
    p.category.toLowerCase().includes(q) ||
    p.description.toLowerCase().includes(q)
  );
}
