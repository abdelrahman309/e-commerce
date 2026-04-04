import { useState } from "react";
import { getCart, getCartTotal, placeOrder } from "@/lib/store";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { CreditCard, MapPin, User } from "lucide-react";

interface CheckoutPageProps {
  onCartUpdate: () => void;
}

const CheckoutPage = ({ onCartUpdate }: CheckoutPageProps) => {
  const items = getCart();
  const subtotal = getCartTotal();
  const shipping = subtotal > 50 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: "", email: "", address: "", city: "", zip: "", card: "" });
  const [processing, setProcessing] = useState(false);

  if (items.length === 0) {
    navigate("/products");
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    setTimeout(() => {
      placeOrder(items, total, `${form.address}, ${form.city} ${form.zip}`);
      onCartUpdate();
      toast.success("Order placed successfully!");
      navigate("/orders");
    }, 1500);
  };

  const inputClass = "w-full rounded-xl border border-border bg-secondary px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/50 transition";

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-foreground mb-8">Checkout</h1>
      <div className="grid md:grid-cols-3 gap-8">
        <form onSubmit={handleSubmit} className="md:col-span-2 space-y-6">
          {/* Contact */}
          <div className="rounded-2xl border border-border bg-card p-6">
            <h3 className="font-semibold text-foreground flex items-center gap-2 mb-4">
              <User className="h-4 w-4 text-primary" /> Contact Information
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <input placeholder="Full name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className={inputClass} required />
              <input type="email" placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className={inputClass} required />
            </div>
          </div>

          {/* Shipping */}
          <div className="rounded-2xl border border-border bg-card p-6">
            <h3 className="font-semibold text-foreground flex items-center gap-2 mb-4">
              <MapPin className="h-4 w-4 text-primary" /> Shipping Address
            </h3>
            <div className="space-y-4">
              <input placeholder="Street address" value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} className={inputClass} required />
              <div className="grid sm:grid-cols-2 gap-4">
                <input placeholder="City" value={form.city} onChange={e => setForm({ ...form, city: e.target.value })} className={inputClass} required />
                <input placeholder="ZIP code" value={form.zip} onChange={e => setForm({ ...form, zip: e.target.value })} className={inputClass} required />
              </div>
            </div>
          </div>

          {/* Payment */}
          <div className="rounded-2xl border border-border bg-card p-6">
            <h3 className="font-semibold text-foreground flex items-center gap-2 mb-4">
              <CreditCard className="h-4 w-4 text-primary" /> Payment
            </h3>
            <input placeholder="Card number (demo)" value={form.card} onChange={e => setForm({ ...form, card: e.target.value })} className={inputClass} required />
            <p className="text-xs text-muted-foreground mt-2">This is a demo — no real payment is processed.</p>
          </div>

          <button type="submit" disabled={processing} className="btn-primary w-full disabled:opacity-50">
            {processing ? "Processing..." : `Place Order — $${total.toFixed(2)}`}
          </button>
        </form>

        {/* Summary */}
        <div className="rounded-2xl border border-border bg-card p-6 h-fit sticky top-24">
          <h3 className="font-semibold text-foreground mb-4">Order Summary</h3>
          <div className="space-y-3 mb-4">
            {items.map(item => (
              <div key={item.product.id} className="flex items-center gap-3">
                <img src={item.product.image} alt={item.product.name} className="h-12 w-12 rounded-lg object-cover bg-secondary" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{item.product.name}</p>
                  <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                </div>
                <span className="text-sm font-medium text-foreground">${(item.product.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-border pt-3 space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span className="text-foreground">${subtotal.toFixed(2)}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span className="text-foreground">{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Tax</span><span className="text-foreground">${tax.toFixed(2)}</span></div>
            <div className="flex justify-between font-bold text-foreground pt-2 border-t border-border"><span>Total</span><span>${total.toFixed(2)}</span></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
