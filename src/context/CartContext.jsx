import { createContext, useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "./AuthContext";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const storageKey = user ? `cartItems_${user.id}` : "guest_cartItems";

  const [cartItems, setCartItems] = useState([]);
  const [loadedFor, setLoadedFor] = useState(null);

  useEffect(() => {
    if (loading) return;

    const savedCart = JSON.parse(localStorage.getItem(storageKey) || "[]");

    if (user) {
      const guestCart = JSON.parse(
        localStorage.getItem("guest_cartItems") || "[]",
      );

      const mergedCart = [...savedCart];

      guestCart.forEach((guestItem) => {
        const existingProduct = mergedCart.find(
          (item) => item.id === guestItem.id,
        );

        if (existingProduct) {
          existingProduct.quantity += guestItem.quantity;
        } else {
          mergedCart.push(guestItem);
        }
      });

      localStorage.setItem(storageKey, JSON.stringify(mergedCart));
      localStorage.removeItem("guest_cartItems");

      setCartItems(mergedCart);
    } else {
      setCartItems(savedCart);
    }

    setLoadedFor(storageKey);
  }, [loading, storageKey, user]);

  useEffect(() => {
    if (loading || loadedFor !== storageKey) return;

    localStorage.setItem(storageKey, JSON.stringify(cartItems));
  }, [cartItems, loading, loadedFor, storageKey]);

  // Add to Cart
  const addToCart = (product, quantity = 1) => {
    toast.success(`${product.name} added to cart!`);

    setCartItems((prevItems) => {
      const existingProduct = prevItems.find((item) => item.id === product.id);

      if (existingProduct) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }

      return [...prevItems, { ...product, quantity }];
    });
  };

  // Update Cart Quantity
  const updateQuantity = (id, amount) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + amount) }
          : item,
      ),
    );
  };

  // Remove from cart
  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
