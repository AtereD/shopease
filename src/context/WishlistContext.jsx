import { createContext, useState, useEffect } from "react";

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishListItems, setWishListItems] = useState(() => {
    const savedWishList = localStorage.getItem("wishListItems");

    return savedWishList ? JSON.parse(savedWishList) : [];
  });

  // Save wishlist to localStorage
  useEffect(() => {
    localStorage.setItem("wishListItems", JSON.stringify(wishListItems));
  }, [wishListItems]);

  // Add or remove products from wishlist
  const toggleWishlist = (product) => {
    setWishListItems((prevItems) => {
      const existingProduct = prevItems.find(
        (item) => item.id === product.id
      );

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