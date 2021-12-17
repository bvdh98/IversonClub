import React, { useState, useEffect } from "react";

const useFetch = (url,key) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(true);
  useEffect(() => {
    fetch(`${url}`, {
      mode: "cors",
      method: "GET",
      headers: {
        "x-rapidapi-host": "v1-sneakers.p.rapidapi.com",
        "x-rapidapi-key": `${key}`
      }
    })
      .then(res => {
        if (!res.ok) {
          throw Error("could not fetch the data");
        }
        return res.json();
      })
      .then(data => {
        setData(data);
        setIsPending(false);
        setError(null);
      })
      .catch(error => {
        setError(error.message);
        setData(null);
        setIsPending(false);
      });
  }, [url,key]);
  return { data, error, isPending };
};

export default useFetch;