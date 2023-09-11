import React from "react";
import bannerImage from "../assets/Because-Pain-is-NOT-Normal.png";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  function onClick() {
    navigate("/request-name");
  }

  return (
    <div className="overflow-hidden mx-auto relative flex items-center">
      <img src={bannerImage} alt="Image did not load." />
      <div className="absolute right-12 top-12">
        <button
          onClick={onClick}
          type="button"
          className="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-indigo-500 hover:bg-indigo-400 transition ease-in-out duration-150 cursor-pointer"
          disabled=""
        >
          Begin
        </button>
      </div>
    </div>
  );
}

export default Home;

/*
<div className="absolute lg:top-32 lg:right-44 md:top-16 md:right-44 sm:top-10 sm:right-44">
        <NtButton />
      </div>

*/
