import { CartItem } from "@/data/products";
import { removeFromCart, updateCartQty, getCartTotal } from "@/lib/store";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

interface CartDrawerProps {
  open: boolean;
  items: CartItem[];
  onClose: () => void;
  onUpdate: () => void;
}

const CartDrawer = ({ open, items, onClose, onUpdate }: CartDrawerProps) => {
  if (!open) return null;

  const total = getCartTotal();

  const handleQty = (id: string, qty: number) => {
    updateCartQty(id, qty);
    onUpdate();
  };

  const handleRemove = (id: string) => {
    removeFromCart(id);
    onUpdate();
  };

  return (
    <>
      <div className="fixed inset-0 bg-foreground/30 z-50" onClick={onClose} />
      <div className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-card z-50 shadow-2xl flex flex-col animate-slide-in-right">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="font-bold text-lg text-foreground flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" /> Cart ({items.length})
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-secondary rounded-lg transition">
            <X className="h-5 w-5 text-foreground" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <ShoppingBag className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground text-sm">Your cart is empty</p>
            </div>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {items.map(item => (
                <div key={item.product.id} className="flex gap-3 animate-fade-in">
                  <img src={item.product.image} alt={item.product.name} className="h-20 w-20 rounded-xl object-cover bg-secondary shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-foreground truncate">{item.product.name}</h4>
                    <p className="text-xs text-muted-foreground">{item.product.brand}</p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2 rounded-lg border border-border">
                        <button onClick={() => handleQty(item.product.id, item.quantity - 1)} className="p-1.5 hover:bg-secondary transition rounded-l-lg">
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                        <button onClick={() => handleQty(item.product.id, item.quantity + 1)} className="p-1.5 hover:bg-secondary transition rounded-r-lg">
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <span className="font-semibold text-sm text-foreground">${(item.product.price * item.quantity).toFixed(2)}</span>
                    </div>
                  </div>
                  <button onClick={() => handleRemove(item.product.id)} className="p-1 text-muted-foreground hover:text-destructive transition self-start">
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
            <div className="border-t border-border p-4 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-semibold text-foreground">${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span className="font-medium text-foreground">{total > 50 ? "Free" : "$9.99"}</span>
              </div>
              <div className="flex justify-between font-bold text-foreground">
                <span>Total</span>
                <span>${(total > 50 ? total : total + 9.99).toFixed(2)}</span>
              </div>
              <Link to="/checkout" onClick={onClose} className="btn-primary block text-center w-full">
                Checkout
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
