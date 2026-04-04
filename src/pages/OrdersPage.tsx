import { getOrders } from "@/lib/store";
import { Package, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const OrdersPage = () => {
  const orders = getOrders();

  if (orders.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-foreground mb-2">No Orders Yet</h1>
        <p className="text-muted-foreground mb-6">Your order history will appear here</p>
        <Link to="/products" className="btn-primary">Start Shopping</Link>
      </div>
    );
  }

  const statusColors: Record<string, string> = {
    processing: "bg-primary/10 text-primary",
    shipped: "bg-star/10 text-star",
    delivered: "bg-[hsl(var(--badge-new))]/10 text-[hsl(var(--badge-new))]",
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-foreground mb-8">My Orders</h1>
      <div className="space-y-4">
        {orders.map(order => (
          <div key={order.id} className="rounded-2xl border border-border bg-card p-6 animate-fade-in">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
              <div>
                <h3 className="font-semibold text-foreground">{order.id}</h3>
                <p className="text-sm text-muted-foreground">{new Date(order.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${statusColors[order.status] || ""}`}>
                  {order.status}
                </span>
                <span className="font-bold text-foreground">${order.total.toFixed(2)}</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {order.items.map(item => (
                <img key={item.product.id} src={item.product.image} alt={item.product.name} className="h-14 w-14 rounded-xl object-cover bg-secondary" />
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-3">{order.address}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersPage;
