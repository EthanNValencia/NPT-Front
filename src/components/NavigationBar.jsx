import React from "react";
import { NavLink } from "react-router-dom";

function NavigationBar() {
  return (
    <header>
      <nav className="text-xs font-bold text-center grid grid-flow-row md:grid-cols-6 sm:grid-cols-3">
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
    </header>
  );
}

export default NavigationBar;
