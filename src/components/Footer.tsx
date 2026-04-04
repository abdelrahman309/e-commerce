import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="border-t border-border bg-secondary/50 mt-16">
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary">
              <span className="text-primary-foreground font-bold text-xs">T</span>
            </div>
            <span className="font-bold text-foreground">TechNova</span>
          </div>
          <p className="text-sm text-muted-foreground">Premium tech at your fingertips. Your trusted electronics destination.</p>
        </div>
        <div>
          <h4 className="font-semibold text-foreground mb-3 text-sm">Shop</h4>
          <div className="space-y-2">
            <Link to="/products?category=smartphones" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Smartphones</Link>
            <Link to="/products?category=laptops" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Laptops</Link>
            <Link to="/products?category=headphones" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Headphones</Link>
            <Link to="/products?category=watches" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Watches</Link>
          </div>
        </div>
        <div>
          <h4 className="font-semibold text-foreground mb-3 text-sm">Account</h4>
          <div className="space-y-2">
            <Link to="/auth" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Sign In</Link>
            <Link to="/wishlist" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Wishlist</Link>
            <Link to="/orders" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Orders</Link>
            <Link to="/cart" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Cart</Link>
          </div>
        </div>
        <div>
          <h4 className="font-semibold text-foreground mb-3 text-sm">Support</h4>
          <div className="space-y-2">
            <span className="block text-sm text-muted-foreground">abdelrahman.steit@outlook.com</span>
            <span className="block text-sm text-muted-foreground">+201064651697</span>
            <span className="block text-sm text-muted-foreground">Free shipping </span>
            <span className="block text-sm text-muted-foreground">30-day returns</span>
          </div>
        </div>
      </div>
      <div className="mt-8 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-2">
        <p className="text-xs text-muted-foreground">© 2024 TechNova. All rights reserved.</p>
        <p className="text-xs text-muted-foreground">Built with React + TypeScript + Tailwind</p>
      </div>
    </div>
  </footer>
);

export default Footer;
