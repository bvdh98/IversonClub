import { useState, useEffect } from "react";
import { db } from "./firebase";
import { getDocs, collection } from "firebase/firestore";

const useGetData = () => {
  const shoeCollection = "shoes";
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    (async () => {
      let temp = [];
      const querySnapshot = await getDocs(collection(db, shoeCollection));
      querySnapshot.forEach(doc => {
        temp = [...temp, doc.data()];
      });
      if (temp.length > 0) {
        setData(temp);
        setError(false);
        setIsPending(false);
      } else {
        setError(true);
        setIsPending(false);
      }
    })();
  }, []);
  return { data, error, isPending };
};

export default useGetData;
