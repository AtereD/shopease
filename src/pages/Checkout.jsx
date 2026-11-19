import { useState, useContext, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import OrderSummary from "../components/OrderSummary";
import { states } from "../data/states";
import { calculateOrderTotals } from "../lib/orderUtils";

const Checkout = () => {
  const { cartItems, setCartItems } = useContext(CartContext);
   const [paymentMethod, setPaymentMethod] = useState("card");
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    code: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
  e.preventDefault();

  const { subtotal, shipping, total } = calculateOrderTotals(cartItems);

  const orderDetails = {
    orderCode,
    customer: formData,
    items: cartItems,
    paymentMethod,
    subtotal,
    shipping,
    total,
  };

  console.log("Order details:", orderDetails);

  navigate("/order-confirmation", {
    state: { order: orderDetails },
  });

  // setCartItems([]);
};

  const orderCode = `SE-${Date.now().toString().slice(-8)}`;

  useEffect(() => {
    if (cartItems.length === 0) {
      navigate("/cart", { replace: true });
    }
  }, [cartItems.length, navigate]);

  return (
    <section className="max-w-7xl mx-auto px-5 md:px-8 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm mb-6">
        <Link to="/" className="text-muted-grey">
          Home
        </Link>
        <ChevronRight size={16} />
        <Link to="/cart" className="text-muted-grey">
          Cart
        </Link>
        <ChevronRight size={16} />
        <span className="text-electric-blue">Checkout</span>
      </div>

      <h1 className="text-2xl md:text-3xl font-bold font-heading mb-8">
        Checkout
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Checkout Form */}
        <form
          id="checkout-form"
          className="lg:col-span-2 space-y-8"
          onSubmit={handleSubmit}
        >
          <div className="border border-border rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-4">Customer Information</h2>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-2">
                <label htmlFor="fullName" className="text-sm font-medium">
                  Full Name
                </label>
                <input
                  id="fullName"
                  type="text"
                  required
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="w-full border border-border rounded-lg px-4  outline-none focus:border-electric-blue"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                  className="w-full border border-border rounded-lg px-4  outline-none focus:border-electric-blue"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="phone" className="text-sm font-medium">
                  Phone Number
                </label>
                <input
                  id="phone"
                  type="tel"
                  required
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  className="w-full border border-border rounded-lg px-4  outline-none focus:border-electric-blue"
                />
              </div>
            </div>
          </div>

          <div className="border border-border rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-4">Delivery Details</h2>
            <div className="flex flex-col gap-4 ">
              <div className="flex sm:flex-row flex-col gap-3 sm:justify-between">
                <div className="flex flex-col gap-2 flex-1 min-w-0">
                  <label htmlFor="address" className="text-sm font-medium">
                    House Address
                  </label>
                  <input
                    id="address"
                    type="text"
                    required
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter your address"
                    className="w-full border border-border rounded-lg px-4  outline-none focus:border-electric-blue"
                  />
                </div>
                <div className="flex flex-col gap-2 flex-1 min-w-0">
                  <label htmlFor="city" className="text-sm font-medium">
                    City
                  </label>
                  <input
                    id="city"
                    type="text"
                    required
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Enter your city"
                    className="w-full border border-border rounded-lg px-4  outline-none focus:border-electric-blue"
                  />
                </div>
              </div>
              <div className="flex sm:flex-row flex-col gap-3 sm:justify-between">
                <div className="flex flex-col gap-2 flex-1 min-w-0">
                  <label htmlFor="state" className="text-sm font-medium">
                    State
                  </label>

                  <select
                    id="state"
                    required
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className="w-full border border-border rounded-lg px-4  outline-none focus:border-electric-blue text-muted-grey py-2.25"
                  >
                    <option value="" disabled>
                      Select your state
                    </option>
                    {states.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-2 flex-1 min-w-0">
                  <label htmlFor="code" className="text-sm font-medium">
                    Postal Code
                  </label>
                  <input
                    id="code"
                    type="text"
                    name="code"
                    value={formData.code}
                    onChange={handleChange}
                    placeholder="Enter your postal code"
                    className="w-full border border-border rounded-lg px-4  outline-none focus:border-electric-blue"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="border border-border rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-4">Payment Method</h2>

            <div className="flex flex-col gap-4">
              <label
                className={`flex items-center gap-3 border rounded-lg p-3 cursor-pointer transition-colors ${
                  paymentMethod === "card"
                    ? "border-electric-blue bg-blue-50"
                    : "border-border"
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  checked={paymentMethod === "card"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <span>Card Payment</span>
              </label>

              <label
                className={`flex items-center gap-3 border rounded-lg p-3 cursor-pointer transition-colors ${
                  paymentMethod === "transfer"
                    ? "border-electric-blue bg-blue-50"
                    : "border-border"
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="transfer"
                  checked={paymentMethod === "transfer"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <span>Bank Transfer</span>
              </label>
            </div>
          </div>
        </form>

        {/* Order Summary */}
        <div>
          <OrderSummary payment="Make Payment" isCheckout={true} />
        </div>
      </div>
    </section>
  );
};

export default Checkout;
