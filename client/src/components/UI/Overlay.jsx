import React from "react";

const Overlay = ({bgColor}) => {
  return <div className={`absolute ${bgColor} inset-0 z-0`} />;
};

export default Overlay;
