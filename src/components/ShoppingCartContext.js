import React, { createContext, useContext, useEffect, useReducer } from "react";
import { useAuth } from "./contexts/AuthContext";
import {db} from "./firebase";
import { doc, getDoc, updateDoc, setDoc } from "firebase/firestore";

const ShoppingCartContext = createContext();

export const useShoppingCart = () => {
  return useContext(ShoppingCartContext);
};

const defaultState = {
  shoes: [],
  total: 0
};

const savedState = JSON.parse(localStorage.getItem("cart"));

//load state
const initializer = () => (savedState ? savedState : defaultState);

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
  const [state, dispatch] = useReducer(reducer, defaultState, initializer);
  const { currentUser } = useAuth();

  const uploadCartToFireBase = async () => {
    const docRef = doc(db, "cartShoes", currentUser.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      await updateDoc(docRef, {
        shoes: [...state.shoes],
        total: state.total
      });
    } else {
      const docRef = await setDoc(doc(db, "cartShoes", currentUser.uid), {
        id: "test",
        shoes: [...state.shoes],
        total: 0
      });
    }
  };

  //save state
  useEffect(
    () => {
      localStorage.setItem("cart", JSON.stringify(state));
      if (state.shoes.length > 0) {
        console.log(db);
        //uploadCartToFireBase();
      }
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
