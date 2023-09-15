import React from "react";
import Npt from "./Npt";
import NavigationBar from "./NavigationBar";

function Header() {
  return (
    <div className="p-4 rounded-t-lg flex justify-between justify-items-center items-center bg-npt_colors-325 text-white">
      <div className="flex-nowrap pr-10">
        <Npt />
      </div>
      <div className="flex-shrink">
        <NavigationBar />
      </div>
    </div>
  );
}

export default Header;
