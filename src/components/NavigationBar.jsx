import React, { useState } from "react";
import { NavLink } from "react-router-dom";

function NavigationBar() {
  const [selected, setSelected] = useState(false);

  const onClick = () => {
    setSelected(!selected);
    console.log(selected);
  };

  return (
    <header>
      <nav className="bg-npt_colors-325 text-xs font-bold text-center grid grid-flow-row grid-cols-7 mt-2 rounded-lg">
        <NavLink className="hover:text-npt_colors-300" to="/">
          Home
        </NavLink>
        <NavLink className="hover:text-npt_colors-300" to="/about">
          About Us
        </NavLink>
        <NavLink className="hover:text-npt_colors-300" to="/faqs">
          FAQ
        </NavLink>
        <NavLink className="hover:text-npt_colors-300" to="/services">
          Services
        </NavLink>
        <NavLink className="hover:text-npt_colors-300" to="/contact">
          Contact Us
        </NavLink>
        <NavLink
          className="hover:text-npt_colors-300 focus:text-npt_colors-300"
          to="/reviews"
        >
          Reviews
        </NavLink>
        <NavLink className="hover:text-npt_colors-300" to="/dev">
          Dev
        </NavLink>
      </nav>
    </header>
  );
}

export default NavigationBar;

/*
<button className="relative grid grid-flow-row grid-cols-1 gap-1 w-16 border-white rounded-lg hover:border-npt_colors-300 cursor-pointer border-2 active:border-npt_colors-300 focus:outline-none focus:ring focus:outline-0" value={selected} onClick={onClick}>
        <div className="border-y-2 rounded-lg border-inherit mx-1 mt-1"></div>
        <div className="border-y-2 rounded-lg border-inherit mx-1"></div>
        <div className="border-y-2 rounded-lg border-inherit mx-1"></div>
        <div className="border-y-2 rounded-lg border-inherit mx-1 mb-1"></div>
      </button>
      {selected ? 
      (<div>
      <nav className="absolute bg-npt_colors-30 text-xs font-bold text-center grid grid-flow-row grid-cols-1 bg-opacity-95 w-56 right-0 mt-2 rounded-lg">
        <NavLink className="hover:text-npt_colors-300" to="/">
          Home
        </NavLink>
        <NavLink className="hover:text-npt_colors-300" to="/about">
          About Us
        </NavLink>
        <NavLink className="hover:text-npt_colors-300" to="/faqs">
          Frequently Asked Questions
        </NavLink>
        <NavLink className="hover:text-npt_colors-300" to="/contact">
          Contact Us
        </NavLink>
        <NavLink
          className="hover:text-npt_colors-300 focus:text-npt_colors-300"
          to="/reviews"
        >
          Reviews
        </NavLink>
        <NavLink className="hover:text-npt_colors-300" to="/dev">
          Dev
        </NavLink>
      </nav>
      </div>) :
      (<></>)}
*/
