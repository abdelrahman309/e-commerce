import { useSearchParams } from "react-router-dom";
import { products, categories, searchProducts, getProductsByCategory, Product } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { useState, useMemo } from "react";
import { SlidersHorizontal, X } from "lucide-react";

interface ProductsPageProps {
  onCartUpdate: () => void;
}

type SortOption = "default" | "price-asc" | "price-desc" | "rating" | "name";

const ProductsPage = ({ onCartUpdate }: ProductsPageProps) => {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get("category") || "";
  const searchParam = searchParams.get("search") || "";

  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [sortBy, setSortBy] = useState<SortOption>("default");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 3000]);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let list: Product[] = products;
    if (searchParam) list = searchProducts(searchParam);
    if (selectedCategory) list = list.filter(p => p.category === selectedCategory);
    list = list.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    switch (sortBy) {
      case "price-asc": return [...list].sort((a, b) => a.price - b.price);
      case "price-desc": return [...list].sort((a, b) => b.price - a.price);
      case "rating": return [...list].sort((a, b) => b.rating - a.rating);
      case "name": return [...list].sort((a, b) => a.name.localeCompare(b.name));
      default: return list;
    }
  }, [selectedCategory, sortBy, priceRange, searchParam]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">
          {searchParam ? `Results for "${searchParam}"` : selectedCategory ? categories.find(c => c.id === selectedCategory)?.name || "Products" : "All Products"}
        </h1>
        <p className="text-muted-foreground mt-1">{filtered.length} products found</p>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <button onClick={() => setShowFilters(!showFilters)} className="btn-outline flex items-center gap-2 text-sm py-2 px-4">
          <SlidersHorizontal className="h-4 w-4" /> Filters
        </button>

        {/* Category pills */}
        <button onClick={() => setSelectedCategory("")} className={`rounded-full px-4 py-2 text-sm font-medium transition ${!selectedCategory ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"}`}>
          All
        </button>
        {categories.map(c => (
          <button key={c.id} onClick={() => setSelectedCategory(c.id)} className={`rounded-full px-4 py-2 text-sm font-medium transition ${selectedCategory === c.id ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"}`}>
            {c.icon} {c.name}
          </button>
        ))}

        <select
          value={sortBy}
          onChange={e => setSortBy(e.target.value as SortOption)}
          className="ml-auto rounded-xl border border-border bg-card px-4 py-2 text-sm text-foreground outline-none"
        >
          <option value="default">Sort by: Default</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating">Top Rated</option>
          <option value="name">Name A-Z</option>
        </select>
      </div>

      {/* Filters panel */}
      {showFilters && (
        <div className="mb-6 rounded-2xl border border-border bg-card p-6 animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground">Filters</h3>
            <button onClick={() => setShowFilters(false)}><X className="h-4 w-4 text-muted-foreground" /></button>
          </div>
          <div>
            <label className="text-sm text-muted-foreground block mb-2">Price Range: ${priceRange[0]} — ${priceRange[1]}</label>
            <input
              type="range" min={0} max={3000} step={50} value={priceRange[1]}
              onChange={e => setPriceRange([priceRange[0], Number(e.target.value)])}
              className="w-full max-w-xs accent-primary"
            />
          </div>
        </div>
      )}

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-lg text-muted-foreground">No products found</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {filtered.map(p => (
            <ProductCard key={p.id} product={p} onCartUpdate={onCartUpdate} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
