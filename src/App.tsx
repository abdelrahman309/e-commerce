import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useState, useCallback } from "react";
import { getSession, getCart, getCartCount, User } from "@/lib/store";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import HomePage from "@/pages/HomePage";
import ProductsPage from "@/pages/ProductsPage";
import ProductDetailPage from "@/pages/ProductDetailPage";
import AuthPage from "@/pages/AuthPage";
import WishlistPage from "@/pages/WishlistPage";
import CheckoutPage from "@/pages/CheckoutPage";
import OrdersPage from "@/pages/OrdersPage";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const AppContent = () => {
  const [user, setUser] = useState<User | null>(getSession());
  const [cartCount, setCartCount] = useState(getCartCount());
  const [cartOpen, setCartOpen] = useState(false);

  const refreshCart = useCallback(() => {
    setCartCount(getCartCount());
  }, []);

  const handleAuth = (u: User) => {
    setUser(u);
  };

  return (
    <>
      <Navbar cartCount={cartCount} user={user} onCartClick={() => setCartOpen(true)} />
      <main className="min-h-[70vh]">
        <Routes>
          <Route path="/" element={<HomePage onCartUpdate={refreshCart} />} />
          <Route path="/products" element={<ProductsPage onCartUpdate={refreshCart} />} />
          <Route path="/product/:slug" element={<ProductDetailPage onCartUpdate={refreshCart} />} />
          <Route path="/auth" element={<AuthPage onAuth={handleAuth} />} />
          <Route path="/wishlist" element={<WishlistPage onCartUpdate={refreshCart} />} />
          <Route path="/checkout" element={<CheckoutPage onCartUpdate={refreshCart} />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <CartDrawer open={cartOpen} items={getCart()} onClose={() => setCartOpen(false)} onUpdate={refreshCart} />
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
