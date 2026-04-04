import { Link } from "react-router-dom";
import { Product } from "@/data/products";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { addToCart, toggleWishlist, isInWishlist } from "@/lib/store";
import { useState } from "react";
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
  onCartUpdate?: () => void;
}

const ProductCard = ({ product, onCartUpdate }: ProductCardProps) => {
  const [wishlisted, setWishlisted] = useState(isInWishlist(product.id));

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    onCartUpdate?.();
    toast.success(`${product.name} added to cart`);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const added = toggleWishlist(product);
    setWishlisted(added);
    toast.success(added ? "Added to wishlist" : "Removed from wishlist");
  };

  return (
    <Link to={`/product/${product.slug}`} className="product-card group block">
      <div className="relative aspect-square overflow-hidden bg-secondary">
        <img src={product.image} alt={product.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
        {product.badge && (
          <span className={`absolute top-3 left-3 ${product.badge === "sale" ? "badge-sale" : "badge-new"}`}>
            {product.badge === "sale" ? "SALE" : "NEW"}
          </span>
        )}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={handleToggleWishlist} className="flex h-9 w-9 items-center justify-center rounded-full bg-card shadow-md hover:bg-secondary transition">
            <Heart className={`h-4 w-4 ${wishlisted ? "fill-destructive text-destructive" : "text-foreground"}`} />
          </button>
          <button onClick={handleAddToCart} className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md hover:opacity-90 transition">
            <ShoppingCart className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div className="p-4">
        <p className="text-xs text-muted-foreground mb-1">{product.brand}</p>
        <h3 className="font-semibold text-foreground text-sm leading-tight mb-2 line-clamp-2">{product.name}</h3>
        <div className="flex items-center gap-1 mb-2">
          <Star className="h-3.5 w-3.5 fill-star text-star" />
          <span className="text-xs font-medium text-foreground">{product.rating}</span>
          <span className="text-xs text-muted-foreground">({product.reviewCount})</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-bold text-foreground">${product.price}</span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">${product.originalPrice}</span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
