import React from "react";
import heroImage from "../img/heroImage.jpeg";

const Banner = () => {
  return (
    <div className="row">
      <div id="image_container" className="col-sm-12">
        <img src={heroImage} alt="banner image of allen iverson" />
      </div>
      <div className="col-sm-12">
        <div id="header_container"className="card">
          <h1>Iverson Club</h1>
        </div>
      </div>
    </div>
  );
};

export default Banner;
