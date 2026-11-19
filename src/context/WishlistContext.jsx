import { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  const storageKey = user ? `wishListItems_${user.id}` : "guest_wishListItems";

  const [wishListItems, setWishListItems] = useState([]);
  const [loadedFor, setLoadedFor] = useState(null);

  // Load wishlist for the current user or guest
  // Load and merge wishlist for the current user or guest
  useEffect(() => {
    if (loading) return;

    const savedWishList = JSON.parse(localStorage.getItem(storageKey) || "[]");

    if (user) {
      const guestWishList = JSON.parse(
        localStorage.getItem("guest_wishListItems") || "[]",
      );

      const mergedWishList = [...savedWishList];

      guestWishList.forEach((guestItem) => {
        const alreadyExists = mergedWishList.some(
          (item) => item.id === guestItem.id,
        );

        if (!alreadyExists) {
          mergedWishList.push(guestItem);
        }
      });

      localStorage.setItem(storageKey, JSON.stringify(mergedWishList));
      localStorage.removeItem("guest_wishListItems");

      setWishListItems(mergedWishList);
    } else {
      setWishListItems(savedWishList);
    }

    setLoadedFor(storageKey);
  }, [loading, storageKey, user]);

  // Save wishlist to localStorage
  useEffect(() => {
    if (loading || loadedFor !== storageKey) return;

    localStorage.setItem(storageKey, JSON.stringify(wishListItems));
  }, [wishListItems, loading, loadedFor, storageKey]);

  // Add or remove products from wishlist
  const toggleWishlist = (product) => {
    setWishListItems((prevItems) => {
      const existingProduct = prevItems.find((item) => item.id === product.id);

      if (existingProduct) {
        return prevItems.filter((item) => item.id !== product.id);
      }

      return [...prevItems, { ...product }];
    });
  };

  return (
    <WishlistContext.Provider value={{ wishListItems, toggleWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export default WishlistProvider;
