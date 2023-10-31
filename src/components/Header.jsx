import React from "react";
import NavigationBar from "./NavigationBar";

function Header() {
  return (
    <div className="p-4 rounded-t-lg flex justify-between justify-items-center items-center bg-npt_colors-325 text-white w-full">
      <div className="flex-nowrap pr-10">
        <div className="">
          <h1 className="xl:text-xl lg:text-md md:text-xs sm:text-sm font-bold">
            Nephew Physical Therapy
          </h1>
          <h2 className="xl:text-xl lg:text-sm md:text-xs sm:text-xs font-extralight">
            Because Pain is [NOT] Normal
          </h2>
        </div>
      </div>
      <div className="flex-shrink">
        <NavigationBar />
      </div>
    </div>
  );
}

export default Header;
