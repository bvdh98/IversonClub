import React, { createContext, useContext, useState, useEffect } from "react";

const ShoppingCartContext = createContext();

export const useShoppingCart = () => {return useContext(ShoppingCartContext)};

export const ShoppingCartProvider = ({children}) => {
  const [cart, setCart] = useState([]);
  const value = { cart, setCart };
  return(
      <ShoppingCartContext.Provider value={value}>
          {children}
      </ShoppingCartContext.Provider>
  )
};
