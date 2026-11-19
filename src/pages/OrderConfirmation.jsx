import { CircleCheck } from "lucide-react";
import { Link, useLocation, Navigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { CartContext } from "../context/CartContext";

const OrderConfirmation = () => {
  const { setCartItems } = useContext(CartContext);

useEffect(() => {
  setCartItems([]);
}, [setCartItems]);
  const location = useLocation();
  const order = location.state?.order;

  if (!order) {
    return <Navigate to="/" replace />;
  }
  return (
    <section className="max-w-7xl mx-auto px-5 md:px-8 py-20 min-h-screen">
      <div className="max-w-2xl mx-auto border border-border rounded-2xl p-8 text-center flex flex-col items-center gap-4">
        <CircleCheck
          size={56}
          className="text-electric-blue"
          strokeWidth={1.5}
        />
        <h1 className="font-bold text-xl md:text-2xl">
          Order Placed Successfully!
        </h1>
        <p className="text-sm text-muted-grey">
          Thank you for making an order.
        </p>
        <p className="text-muted-grey text-sm">Order No: #{order.orderCode}</p>

        {/* delivery info */}
        <div className="w-full border-t border-border pt-6 mt-4 text-left">
          <h2 className="font-semibold mb-3">Delivery Information</h2>

          <p className="text-sm text-muted-grey">{order.customer.fullName}</p>
          <p className="text-sm text-muted-grey">{order.customer.email}</p>
          <p className="text-sm text-muted-grey">{order.customer.phone}</p>
          <p className="text-sm text-muted-grey">
            {order.customer.address}, {order.customer.city},{" "}
            {order.customer.state}
          </p>
        </div>

        {/* order items */}
        <div className="w-full border-t border-border pt-6 mt-4 text-left">
  <h2 className="font-semibold mb-4">Order Items</h2>

  <div className="flex flex-col gap-4">
    {order.items.map((item) => (
      <div key={item.id} className="flex items-center gap-4">
        <img
          src={item.imgUrl}
          alt={item.name}
          className="w-16 h-16 object-cover rounded-lg"
        />

        <div className="flex-1">
          <p className="font-medium text-sm">{item.name}</p>
          <p className="text-xs text-muted-grey">
            Quantity: {item.quantity}
          </p>
        </div>

        <p className="font-semibold text-sm">
          ₦{(item.price * item.quantity).toLocaleString("en-NG")}
        </p>
      </div>
    ))}
  </div>
</div>

{/* payment summary */}
<div className="w-full border-t border-border pt-6 mt-4 text-left">
  <h2 className="font-semibold mb-4">Payment Summary</h2>

  <div className="flex flex-col gap-3 text-sm">
    <div className="flex justify-between">
      <span className="text-muted-grey">Subtotal</span>
      <span>₦{order.subtotal.toLocaleString("en-NG")}</span>
    </div>

    <div className="flex justify-between">
      <span className="text-muted-grey">Shipping</span>
      <span>
        {order.shipping === 0
          ? "Free"
          : `₦${order.shipping.toLocaleString("en-NG")}`}
      </span>
    </div>

    <div className="flex justify-between border-t border-border pt-3 font-bold">
      <span>Total</span>
      <span className="text-electric-blue">
        ₦{order.total.toLocaleString("en-NG")}
      </span>
    </div>

    <div className="flex justify-between">
      <span className="text-muted-grey">Payment Method</span>
      <span className="capitalize">{order.paymentMethod}</span>
    </div>
  </div>
</div>
        <Link to="/shop" className="btn primary-btn">
          Continue Shopping
        </Link>
      </div>
    </section>
  );
};

export default OrderConfirmation;
