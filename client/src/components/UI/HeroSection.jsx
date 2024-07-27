import React from "react";
import Overlay from "./Overlay";
import Container from "./Container";

const HeroSection = ({ children, pt, pb, BgImg, OverlayColor, alignItem }) => {
  return (
    <section
      className={`${BgImg} bg-cover bg-center bg-no-repeat relative ${pt} ${pb}`}
    >
      <Overlay bgColor={OverlayColor} />
      <Container
        className={`relative text-white mx-auto flex flex-col ${alignItem} justify-center`}
      >
        {children}
      </Container>
    </section>
  );
};

export default HeroSection;
