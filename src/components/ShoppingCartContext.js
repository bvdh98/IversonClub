import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState
} from "react";
import { useAuth } from "./contexts/AuthContext";
import { db } from "./firebase";
import { doc, getDoc, updateDoc, setDoc } from "firebase/firestore";

const ShoppingCartContext = createContext();

export const useShoppingCart = () => {
  return useContext(ShoppingCartContext);
};

const defaultState = {
  shoes: [],
  total: 0
};

const getShoesWithNoDuplicates = (shoes, addedShoe) => {
  let duplicates = 0;
  shoes.map(shoe => {
    if (shoe.id === addedShoe.id) {
      duplicates++;
      shoe.duplicates++;
    }
  });
  if (duplicates > 0) {
    return shoes;
  } else {
    return [...shoes, addedShoe];
  }
};

const getTotal = shoes => {
  let total = 0;
  shoes.map(shoe => {
    if (shoe.duplicates > 0) {
      //shoe duplicates + 1 = total amount of that shoe type ie: 1 shoe and 1 duplicate = 2 total shoes
      total += shoe.retailPrice * (shoe.duplicates + 1);
    } else {
      total += shoe.retailPrice;
    }
  });
  return total;
};

const reducer = (state, action) => {
  if (action.type === "add Shoe") {
    const newShoes = getShoesWithNoDuplicates(
      state.shoes,
      action.payload.shoes[0]
    );
    const newTotal = getTotal(newShoes);
    uploadCartToFireBase(newShoes, newTotal, action.payload.userId);
    return {
      ...state,
      shoes: newShoes,
      total: newTotal
    };
  }
  if (action.type === "loaded cart") {
    const newShoes = [...state.shoes, ...action.payload.shoes];
    const newTotal = state.total + action.payload.total;
    return {
      ...state,
      shoes: newShoes,
      total: newTotal
    };
  }

  if(action.type === "empty cart"){
    uploadCartToFireBase([],0,action.payload.userId)
    return defaultState;
  }
};

const uploadCartToFireBase = async (newShoes, newTotal, userId) => {
  const docRef = doc(db, "cartShoes", userId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    await updateDoc(docRef, {
      shoes: newShoes,
      total: newTotal
    });
  } else {
    await setDoc(doc(db, "cartShoes", userId), {
      shoes: newShoes,
      total: newTotal
    });
  }
};

export const ShoppingCartProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const [state, dispatch] = useReducer(reducer, defaultState);
  useEffect(() => {
    (async () => {
      const docRef = doc(db, "cartShoes", currentUser.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        dispatch({
          type: "loaded cart",
          payload: {
            shoes: docSnap.data().shoes,
            total: docSnap.data().total,
            userId: currentUser.uid
          }
        });
      }
    })();
  }, []);
  const value = { state, dispatch };
  return (
    <ShoppingCartContext.Provider value={value}>
      {children}
    </ShoppingCartContext.Provider>
  );
};
