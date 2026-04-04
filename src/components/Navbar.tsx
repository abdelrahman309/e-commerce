import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, Heart, User, Search, Menu, X, Package } from "lucide-react";
import { getCartCount } from "@/lib/store";
import { getSession, logout, User as UserType } from "@/lib/store";

interface NavbarProps {
  cartCount: number;
  user: UserType | null;
  onCartClick: () => void;
}

const Navbar = ({ cartCount, user, onCartClick }: NavbarProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setSearchOpen(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
    window.location.reload();
  };

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/products", label: "Products" },
    { to: "/products?category=smartphones", label: "Phones" },
    { to: "/products?category=laptops", label: "Laptops" },
  ];

  return (
    <header className="glass-nav sticky top-0 z-50">
      <div className="container mx-auto flex h-16 items-center justify-between gap-4 px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <span className="text-primary-foreground font-bold text-sm">T</span>
          </div>
          <span className="font-bold text-lg text-nav-foreground hidden sm:block">TechNova</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map(l => (
            <Link key={l.to} to={l.to} className="text-sm text-nav-foreground/70 hover:text-nav-foreground transition-colors font-medium">
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Search bar (desktop) */}
        <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-xs">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-nav-foreground/40" />
            <input
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full rounded-full bg-nav-foreground/10 pl-10 pr-4 py-2 text-sm text-nav-foreground placeholder:text-nav-foreground/40 outline-none focus:ring-2 focus:ring-primary/50 transition"
            />
          </div>
        </form>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button onClick={() => setSearchOpen(!searchOpen)} className="md:hidden p-2 text-nav-foreground/70 hover:text-nav-foreground">
            <Search className="h-5 w-5" />
          </button>

          {user && (
            <Link to="/wishlist" className="p-2 text-nav-foreground/70 hover:text-nav-foreground transition-colors">
              <Heart className="h-5 w-5" />
            </Link>
          )}

          <button onClick={onCartClick} className="relative p-2 text-nav-foreground/70 hover:text-nav-foreground transition-colors">
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                {cartCount}
              </span>
            )}
          </button>

          {user ? (
            <div className="hidden sm:flex items-center gap-2">
              <Link to="/orders" className="p-2 text-nav-foreground/70 hover:text-nav-foreground transition-colors">
                <Package className="h-5 w-5" />
              </Link>
              <button onClick={handleLogout} className="flex items-center gap-1.5 rounded-full bg-nav-foreground/10 px-3 py-1.5 text-xs font-medium text-nav-foreground hover:bg-nav-foreground/20 transition">
                <span className="max-w-[80px] truncate">{user.name}</span>
              </button>
            </div>
          ) : (
            <Link to="/auth" className="hidden sm:flex items-center gap-1.5 rounded-full bg-primary px-4 py-1.5 text-xs font-semibold text-primary-foreground hover:opacity-90 transition">
              <User className="h-3.5 w-3.5" />
              Sign In
            </Link>
          )}

          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 text-nav-foreground/70 hover:text-nav-foreground">
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile search */}
      {searchOpen && (
        <div className="md:hidden border-t border-nav-foreground/10 px-4 py-3 animate-fade-in">
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-nav-foreground/40" />
            <input
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              autoFocus
              className="w-full rounded-full bg-nav-foreground/10 pl-10 pr-4 py-2.5 text-sm text-nav-foreground placeholder:text-nav-foreground/40 outline-none focus:ring-2 focus:ring-primary/50"
            />
          </form>
        </div>
      )}

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-nav-foreground/10 px-4 py-4 space-y-1 animate-fade-in">
          {navLinks.map(l => (
            <Link key={l.to} to={l.to} onClick={() => setMobileOpen(false)} className="block rounded-lg px-4 py-2.5 text-sm font-medium text-nav-foreground/70 hover:bg-nav-foreground/10 hover:text-nav-foreground transition">
              {l.label}
            </Link>
          ))}
          {user ? (
            <>
              <Link to="/wishlist" onClick={() => setMobileOpen(false)} className="block rounded-lg px-4 py-2.5 text-sm font-medium text-nav-foreground/70 hover:bg-nav-foreground/10 hover:text-nav-foreground">Wishlist</Link>
              <Link to="/orders" onClick={() => setMobileOpen(false)} className="block rounded-lg px-4 py-2.5 text-sm font-medium text-nav-foreground/70 hover:bg-nav-foreground/10 hover:text-nav-foreground">Orders</Link>
              <button onClick={() => { handleLogout(); setMobileOpen(false); }} className="w-full text-left rounded-lg px-4 py-2.5 text-sm font-medium text-destructive hover:bg-nav-foreground/10">Log out</button>
            </>
          ) : (
            <Link to="/auth" onClick={() => setMobileOpen(false)} className="block rounded-lg px-4 py-2.5 text-sm font-semibold text-primary">Sign In</Link>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
