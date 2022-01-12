import React, { useState, useEffect } from "react";
import Banner from "./Banner";
import MainNavbar from "./MainNavBar";
import { Container } from "react-bootstrap";
import "./DataHydrator.css"
import useGetData from "./useGetData";
import ShoeList from "./ShoeList";


const DataHydrator = () => {
  const {data, error, isPending} = useGetData();
  return (
    <>
    <MainNavbar/>
      <Container fluid>
      <Banner/>
      <div id="data_hydrator" className="row">
        {isPending && <div>Loading...</div>}
        {data && <ShoeList shoeData={data}/>}
        {error &&
          <div>
            <p>Could not fetch shoe data</p>
          </div>}
      </div>
    </Container>
    </>
  );
};

export default DataHydrator;
