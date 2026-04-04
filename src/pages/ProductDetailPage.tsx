import { useParams, Link } from "react-router-dom";
import { getProductBySlug, products } from "@/data/products";
import { addToCart, toggleWishlist, isInWishlist } from "@/lib/store";
import { Heart, ShoppingCart, Star, ChevronRight, Minus, Plus, Check } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import ProductCard from "@/components/ProductCard";

interface ProductDetailPageProps {
  onCartUpdate: () => void;
}

const ProductDetailPage = ({ onCartUpdate }: ProductDetailPageProps) => {
  const { slug } = useParams();
  const product = getProductBySlug(slug || "");
  const [qty, setQty] = useState(1);
  const [wishlisted, setWishlisted] = useState(product ? isInWishlist(product.id) : false);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-foreground mb-4">Product Not Found</h1>
        <Link to="/products" className="btn-primary">Browse Products</Link>
      </div>
    );
  }

  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, qty);
    onCartUpdate();
    toast.success(`${product.name} added to cart`);
  };

  const handleWishlist = () => {
    const added = toggleWishlist(product);
    setWishlisted(added);
    toast.success(added ? "Added to wishlist" : "Removed from wishlist");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
        <Link to="/" className="hover:text-foreground transition">Home</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <Link to="/products" className="hover:text-foreground transition">Products</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <Link to={`/products?category=${product.category}`} className="hover:text-foreground transition capitalize">{product.category}</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-foreground truncate max-w-[150px]">{product.name}</span>
      </nav>

      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        {/* Image */}
        <div className="rounded-3xl overflow-hidden bg-secondary aspect-square">
          <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
        </div>

        {/* Info */}
        <div className="animate-fade-in">
          {product.badge && (
            <span className={`inline-block mb-3 ${product.badge === "sale" ? "badge-sale" : "badge-new"}`}>
              {product.badge === "sale" ? "SALE" : "NEW"}
            </span>
          )}
          <p className="text-sm text-muted-foreground mb-1">{product.brand}</p>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-3">{product.name}</h1>

          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`h-4 w-4 ${i < Math.floor(product.rating) ? "fill-star text-star" : "text-border"}`} />
              ))}
            </div>
            <span className="text-sm font-medium text-foreground">{product.rating}</span>
            <span className="text-sm text-muted-foreground">({product.reviewCount} reviews)</span>
          </div>

          <div className="flex items-baseline gap-3 mb-6">
            <span className="text-3xl font-bold text-foreground">${product.price}</span>
            {product.originalPrice && (
              <>
                <span className="text-xl text-muted-foreground line-through">${product.originalPrice}</span>
                <span className="text-sm font-semibold text-destructive">
                  -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                </span>
              </>
            )}
          </div>

          <p className="text-muted-foreground mb-6 leading-relaxed">{product.description}</p>

          {/* Colors */}
          {product.colors && (
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-foreground mb-2">Color</h4>
              <div className="flex flex-wrap gap-2">
                {product.colors.map(c => (
                  <span key={c} className="rounded-full border border-border px-3 py-1.5 text-xs font-medium text-foreground hover:border-primary cursor-pointer transition">{c}</span>
                ))}
              </div>
            </div>
          )}

          {/* Quantity & Add to cart */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center rounded-xl border border-border">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="p-3 hover:bg-secondary transition rounded-l-xl">
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-12 text-center font-medium">{qty}</span>
              <button onClick={() => setQty(qty + 1)} className="p-3 hover:bg-secondary transition rounded-r-xl">
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <button onClick={handleAddToCart} className="btn-primary flex-1 flex items-center justify-center gap-2">
              <ShoppingCart className="h-4 w-4" /> Add to Cart
            </button>
            <button onClick={handleWishlist} className={`p-3 rounded-xl border transition ${wishlisted ? "border-destructive bg-destructive/5" : "border-border hover:bg-secondary"}`}>
              <Heart className={`h-5 w-5 ${wishlisted ? "fill-destructive text-destructive" : "text-foreground"}`} />
            </button>
          </div>

          {/* Features */}
          <div className="space-y-2 mb-6">
            {product.features.map(f => (
              <div key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                <Check className="h-4 w-4 text-primary shrink-0" />
                {f}
              </div>
            ))}
          </div>

          {/* Specs */}
          {product.specs && (
            <div className="rounded-2xl border border-border overflow-hidden">
              <h4 className="px-4 py-3 font-semibold text-sm text-foreground bg-secondary">Specifications</h4>
              {Object.entries(product.specs).map(([k, v]) => (
                <div key={k} className="flex justify-between px-4 py-2.5 text-sm border-t border-border">
                  <span className="text-muted-foreground">{k}</span>
                  <span className="font-medium text-foreground">{v}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="section-heading mb-8">Related Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {related.map(p => (
              <ProductCard key={p.id} product={p} onCartUpdate={onCartUpdate} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetailPage;
