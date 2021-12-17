import React, { useState, useEffect } from "react";
import Banner from "./Banner";
import Shoe from "./Shoe";
import useFetch from './useFetch';


const ShoeList = () => {
  const endPoint = "https://v1-sneakers.p.rapidapi.com";
  const key = "6a0397c1d5msh54f19efef6df16fp1e2f1ejsn0f6c84915369";
  const limit = "100";
  const name = "iverson";
  const url = `${endPoint}/v1/sneakers?limit=${limit}&name=${name}`;

  const { data, isPending, error } = useFetch(url,key);
  console.log(data);

  return (
    <>
      <Banner/>
      <div id="shoe_list" className="row">
        {isPending && <div>Loading...</div>}
        {data && <Shoe shoeData={data}/>}
        {error &&
          <div>
            {error}
          </div>}
      </div>
    </>
  );
};

export default ShoeList;
