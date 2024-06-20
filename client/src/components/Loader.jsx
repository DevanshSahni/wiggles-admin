import React from "react";
import Lottie from "lottie-react";
import loader from "../assets/animation/loader.json";

const Loader = () => {
  return (
    <div className="loaderContainer">
      <Lottie id="loader" animationData={loader} loop={true} />
    </div>
  );
};

export default Loader;
