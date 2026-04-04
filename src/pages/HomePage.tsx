import { Link } from "react-router-dom";
import { categories, getFeaturedProducts, products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { ArrowRight, Truck, Shield, RotateCcw, Headphones } from "lucide-react";

interface HomePageProps {
  onCartUpdate: () => void;
}

const HomePage = ({ onCartUpdate }: HomePageProps) => {
  const featured = getFeaturedProducts();
  const trending = products.slice(0, 8);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-secondary">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-2xl animate-fade-in">
            <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary mb-4">
              New Season 2024
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold text-foreground leading-tight mb-4">
              Next-Gen Tech<br />
              <span className="text-primary">Starts Here.</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-lg">
              Discover the latest smartphones, laptops, and gadgets from top brands. Premium quality, unbeatable prices.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/products" className="btn-primary inline-flex items-center gap-2">
                Shop Now <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/products?category=smartphones" className="btn-outline">
                Browse Phones
              </Link>
            </div>
          </div>
        </div>
        {/* Decorative gradient */}
        <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -right-10 bottom-0 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="section-heading mb-8">Shop by Category</h2>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
          {categories.map(cat => (
            <Link
              key={cat.id}
              to={`/products?category=${cat.id}`}
              className="flex flex-col items-center gap-2 rounded-2xl bg-secondary p-4 md:p-6 hover:bg-secondary/80 transition-all hover:-translate-y-0.5 group"
            >
              <span className="text-2xl md:text-3xl">{cat.icon}</span>
              <span className="text-xs md:text-sm font-medium text-foreground text-center">{cat.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="section-heading">Featured Deals</h2>
          <Link to="/products" className="text-sm font-medium text-primary hover:underline flex items-center gap-1">
            View All <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {featured.map(p => (
            <ProductCard key={p.id} product={p} onCartUpdate={onCartUpdate} />
          ))}
        </div>
      </section>

      {/* Banner */}
      <section className="container mx-auto px-4 py-8">
        <div className="rounded-3xl p-8 md:p-12 text-center" style={{ background: "var(--hero-gradient)" }}>
          <h2 className="text-2xl md:text-4xl font-bold text-primary-foreground mb-3">Student Discount: 15% Off</h2>
          <p className="text-primary-foreground/80 mb-6 max-w-md mx-auto">Verify your student status and get 15% off on all laptops and tablets.</p>
          <Link to="/products?category=laptops" className="inline-block rounded-xl bg-primary-foreground text-primary px-6 py-3 font-semibold hover:opacity-90 transition">
            Shop Laptops
          </Link>
        </div>
      </section>

      {/* Trending */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="section-heading mb-8">Trending Now</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {trending.map(p => (
            <ProductCard key={p.id} product={p} onCartUpdate={onCartUpdate} />
          ))}
        </div>
      </section>

      {/* Trust badges */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Truck, label: "Free Shipping", desc: "On orders over $50" },
            { icon: Shield, label: "Secure Payment", desc: "256-bit SSL encryption" },
            { icon: RotateCcw, label: "Easy Returns", desc: "30-day return policy" },
            { icon: Headphones, label: "24/7 Support", desc: "Dedicated help center" },
          ].map(b => (
            <div key={b.label} className="flex flex-col items-center text-center gap-2 rounded-2xl border border-border p-6">
              <b.icon className="h-6 w-6 text-primary" />
              <h4 className="font-semibold text-sm text-foreground">{b.label}</h4>
              <p className="text-xs text-muted-foreground">{b.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
