import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useReducer
} from "react";

const ShoppingCartContext = createContext();

export const useShoppingCart = () => {
  return useContext(ShoppingCartContext);
};

const defaultState = {
  shoes: [],
  total: 0
};

const reducer = (state, action) => {
  if (action.type === "add Shoe") {
    const newShoes = [...state.shoes, action.payload.shoe];
    const newTotal = state.total + action.payload.total;
    return {
      ...state,
      shoes: newShoes,
      total: newTotal
    };
  }
};

export const ShoppingCartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, defaultState);
  //save cart data to local storage
  useEffect(
    () => {
      localStorage.setItem("cart", JSON.stringify(state));
    },
    [state]
  );
  const value = { state, dispatch };
  return (
    <ShoppingCartContext.Provider value={value}>
      {children}
    </ShoppingCartContext.Provider>
  );
};
