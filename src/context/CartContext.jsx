import { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  
    const {cartItems, setCartItems} = useState([])

  return (
    <CartContext.Provider value={{}}>
      {children}
    </CartContext.Provider>
  );
};
