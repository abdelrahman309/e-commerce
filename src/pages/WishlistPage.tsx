import { getWishlist, toggleWishlist } from "@/lib/store";
import { Product } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { Heart } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

interface WishlistPageProps {
  onCartUpdate: () => void;
}

const WishlistPage = ({ onCartUpdate }: WishlistPageProps) => {
  const [items, setItems] = useState<Product[]>(getWishlist());

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-foreground mb-2">Your Wishlist is Empty</h1>
        <p className="text-muted-foreground mb-6">Save products you love for later</p>
        <Link to="/products" className="btn-primary">Browse Products</Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-foreground mb-2">Wishlist</h1>
      <p className="text-muted-foreground mb-8">{items.length} saved items</p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {items.map(p => (
          <ProductCard key={p.id} product={p} onCartUpdate={onCartUpdate} />
        ))}
      </div>
    </div>
  );
};

export default WishlistPage;
