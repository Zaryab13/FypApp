import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { Navlinks } from "../lib/data";
import Container from "./UI/Container";
const Header = () => {

  return (
    <header className="sticky top-0 z-10 bg-primary">
      <Container className="h-20 flex items-center justify-between">
        <Link
          to="/"
          className="w-20 px-4 py-1 flex items-center gap-4"
        >
          <img src={logo} alt="" />
          <span className="font-medium text-neutral-100 text-lg">
            NeuroLink
          </span>
        </Link>
        <div className=" flex items-center gap-4">
          {Navlinks.map((item, index) => (
            <Link
              to={item.to}
              key={index}
              className={` font-medium ${
                index === 2
                  ? "bg-tertiary hover:bg-transparent border-2 border-transparent hover:border-Accent text-slate-800 hover:text-slate-100 px-[14px] rounded-md py-[5px] transition-all"
                  : "text-neutral-100 hover:text-neutral-200"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </Container>
    </header>
  );
};

export default Header;
