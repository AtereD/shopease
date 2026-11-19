import { useContext } from "react";
import { Link } from "react-router-dom";
import { Lock } from "lucide-react";
import { CartContext } from "../context/CartContext";
import { calculateOrderTotals } from "../lib/orderUtils";

const OrderSummary = ({ payment, url, isCheckout = false }) => {
  const { cartItems } = useContext(CartContext);
  const { subtotal, shipping, total } = calculateOrderTotals(cartItems);
const amountToFreeShipping = 100000 - subtotal;

  return (
    <div className="border border-border rounded-xl px-5 py-5 h-fit bg-white">
      <h2 className="font-bold text-charcoal text-lg">Order Summary</h2>
      <div className="flex flex-col gap-3 border-b border-border py-4">
        <div className="flex justify-between items-center">
          <h4 className="font-medium">Subtotal</h4>
          <p className="font-semibold">
            &#8358;
            {Number(subtotal).toLocaleString("en-NG", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
        </div>
        <div className="flex justify-between items-center">
          <h4 className="font-medium">Shipping</h4>
          <p className="text-electric-blue font-semibold">
            {shipping === 0
              ? "Free"
              : `₦${shipping.toLocaleString("en-NG", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}`}
          </p>
        </div>
        {subtotal < 100000 && (
          <p className="text-xs text-muted-grey">
            Spend ₦{amountToFreeShipping.toLocaleString("en-NG")} more to get
            free shipping!
          </p>
        )}
      </div>
      <div className="flex flex-col border-b border-border py-4 gap-6">
        <div className="flex justify-between items-center">
          <h4 className="font-semibold">Total</h4>
          <p className="text-electric-blue font-semibold text-lg">
            &#8358;
            {Number(total).toLocaleString("en-NG", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
        </div>
        {isCheckout ? (
          <button
            type="submit"
            form="checkout-form"
            className="btn primary-btn flex gap-2 items-center"
          >
            <Lock size={14} />
            {payment}
          </button>
        ) : (
          <Link to={url} className="btn primary-btn flex gap-2 items-center">
            <Lock size={14} />
            {payment}
          </Link>
        )}
      </div>
      <p className="text-sm text-muted-grey mt-4 flex gap-2 text-center items-center justify-center ">
        <Lock size={14} className="text-center" />
        Secure checkout. Your information is protected.
      </p>
    </div>
  );
};

export default OrderSummary;
