import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import QuantitySelector from "../components/QuantitySelector";
import { Link } from "react-router-dom";

import { ChevronRight, ShoppingCart, Trash, ArrowLeftIcon } from "lucide-react";
import OrderSummary from "../components/OrderSummary";

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart } = useContext(CartContext);

  return (
    <section className="max-w-7xl mx-auto px-5 md:px-8 pb-12 pt-8">
      <div className="flex gap-1 text-muted-grey text-sm items-center">
        <Link to="/" className="hover:text-charcoal">
          Home
        </Link>
        <ChevronRight className="w-4 h-4" />
        <p className="text-electric-blue">Cart</p>
      </div>
      <h1 className="text-xl md:text-2xl font-bold font-heading mb-8 ">
        Shopping Cart
      </h1>

      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center py-16 px-5 rounded-2xl">
          <div className="bg-white p-5 rounded-full mb-4">
            <ShoppingCart className="text-electric-blue w-10 h-10" />
          </div>

          <h2 className="text-xl font-bold text-charcoal mb-2">
            Your cart is empty!
          </h2>

          <p className="text-muted-grey text-sm mb-6">
            Looks like you haven't added anything to your cart yet.
          </p>

          <Link to="/shop" className="btn primary-btn">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:grid-cols-2">
          {/* DESKTOP CART */}
          <div className="overflow-x-auto hidden md:block lg:col-span-2 rounded-xl">
            <table className="w-full min-w-162.5 border border-border rounded-xl">
              <thead className="bg-soft-grey">
                <tr>
                  <th className="text-left text-sm font-semibold text-muted-grey px-5 py-4">
                    Product
                  </th>
                  <th className="text-left text-sm font-semibold text-muted-grey px-5 py-4">
                    Price
                  </th>
                  <th className="text-left text-sm font-semibold text-muted-grey px-5 py-4">
                    Quantity
                  </th>
                  <th className="text-left text-sm font-semibold text-muted-grey px-5 py-4">
                    Total
                  </th>
                  <th className="text-left text-sm font-semibold text-muted-grey px-5 py-4">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {cartItems.map((item) => (
                  <tr
                    key={item.id}
                    className="border-t border-border hover:bg-soft-grey/50 transition-colors"
                  >
                    <td className="px-5 py-5 text-sm text-charcoal">
                      <div className="flex items-center gap-4">
                        <img
                          src={item.imgUrl}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded-xl bg-soft-grey"
                        />
                        <div className="flex flex-col gap-2">
                          <h3 className="text-sm font-semibold line-clamp-2">
                            {item.name}
                          </h3>
                          <p>{item.category}</p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-5 text-sm text-charcoal">
                      &#8358;
                      {Number(item.price).toLocaleString("en-NG", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </td>
                    <td className="px-5 py-5">
                      <QuantitySelector
                        quantity={item.quantity}
                        onIncrease={() => updateQuantity(item.id, 1)}
                        onDecrease={() => updateQuantity(item.id, -1)}
                      />
                    </td>
                    <td className="px-5 py-5 text-sm text-charcoal">
                      &#8358;
                      {Number(item.price * item.quantity).toLocaleString(
                        "en-NG",
                        {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        },
                      )}
                    </td>
                    <td className="px-5 py-5">
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        aria-label={`Remove ${item.name} from cart`}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-colors"
                      >
                        <Trash size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <Link to="/shop" className="flex items-center text-electric-blue py-4 gap-1 text-sm font-semibold"> <ArrowLeftIcon size={16}/> Continue Shopping</Link>
          </div>

          {/* MOBILE CART */}
          <div className="md:hidden space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="border border-border rounded-xl p-4 bg-white"
              >
                {/* Product details */}
                <div className="flex gap-4">
                  <img
                    src={item.imgUrl}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg bg-soft-grey shrink-0 "
                  />

                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold line-clamp-2 text-charcoal ">
                      {item.name}
                    </h3>

                    <p className="text-sm text-muted-grey">{item.category}</p>

                    <p className="font-semibold mt-2">
                      &#8358;
                      {Number(item.price).toLocaleString("en-NG", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeFromCart(item.id)}
                    aria-label={`Remove ${item.name} from cart`}
                    className="text-red-500 self-start"
                  >
                    <Trash size={18} />
                  </button>
                </div>

                {/* Quantity and total */}
                <div className="flex justify-between items-center mt-5 pt-4 border-t border-border">
                  <QuantitySelector
                    quantity={item.quantity}
                    onIncrease={() => updateQuantity(item.id, 1)}
                    onDecrease={() => updateQuantity(item.id, -1)}
                  />

                  <p className="font-semibold text-charcoal">
                    &#8358;
                    {Number(item.price * item.quantity).toLocaleString(
                      "en-NG",
                      {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      },
                    )}
                  </p>
                </div>
              </div>
            ))}

             <Link to="/shop" className="flex items-center text-electric-blue py-1 gap-1 text-sm font-semibold"> <ArrowLeftIcon size={16}/> Continue Shopping</Link>
          </div>


            {/* Order Summary */}
          <OrderSummary payment="Proceed to Checkout" url="/checkout" />
        </div>
      )}
    </section>
  );
};

export default Cart;
