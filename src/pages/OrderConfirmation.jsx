import { CircleCheck } from "lucide-react";
import { Link, useLocation, Navigate } from "react-router-dom";

const OrderConfirmation = () => {
    const location = useLocation();
const orderCode = location.state?.orderCode;

if (!orderCode) {
  return <Navigate to="/cart" replace />;
}
  return (
    <section className="max-w-7xl mx-auto px-5 md:px-8 py-20 h-screen">
      <div className="max-w-lg mx-auto border border-border rounded-2xl p-8 text-center flex flex-col items-center gap-4">
        <CircleCheck
          size={56}
          className="text-electric-blue"
          strokeWidth={1.5}
        />
        <h1 className="font-bold text-xl md:text-2xl">Order Placed Successfully!</h1>
        <p className="text-sm text-muted-grey">Thank you for making an order.</p>
        <p className="text-muted-grey text-sm">Order No: #{orderCode}</p>
        <Link to="/shop" className="btn primary-btn">
          Continue Shopping
        </Link>
      </div>
    </section>
  );
};

export default OrderConfirmation;
