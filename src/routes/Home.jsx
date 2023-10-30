import React from "react";
import bannerImage from "../assets/Because-Pain-is-NOT-Normal.png";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  function getStarted() {
    navigate("/request-name");
  }

  function contactUs() {
    navigate("/contact");
  }

  return (
    <div>
      <div className="overflow-hidden mx-auto relative flex items-center max-w-7xl">
        <img src={bannerImage} alt="Image did not load." className="" />
        <div className="absolute right-12 top-12">
          <button
            onClick={getStarted}
            type="button"
            className="animate-bounce inline-flex items-center px-8 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-npt_colors-350 hover:bg-npt_colors-10 hover:text-black first-line:transition ease-in-out duration-150 cursor-pointer"
            disabled=""
          >
            Get Started
          </button>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="p-4">
          <h1 className="text-4xl text-center">
            Is Pain stopping you from Living YOUR Life?
          </h1>
        </div>

        <div className="flex justify-center items-center p-4 font-semibold">
          <ul className="list-disc grid grid-flow-row grid-cols-2 gap-2">
            <li>Do you want to avoid having joint replacement surgery?</li>
            <li>
              Has your Doctor told you there is nothing you can do for your pain
              or arthritis?
            </li>
            <li>Have you tried physical therapy before and it didn’t work?</li>
            <li>Does your pain keep you from losing weight?</li>
            <li>
              Do you keep missing out on adventurers with the kids and
              grandkids?
            </li>
            <li>Do you believe the lie that pain is normal with age?</li>
            <li>
              Do you want to avoid expensive tests like MRIs and CAT scans?
            </li>
            <li>Has vertigo stopped you from going to work?</li>
            <li>Can I go to therapy even if I haven’t had an “injury?”</li>
            <li>Is your fear of a leaky bladder stopping you?</li>
          </ul>
        </div>

        <div className="mx-auto max-w-4xl text-xl">
          <p className="font-semibold">
            Your body is your
            <b className="font-extrabold"> most valuable possession </b>
            and
            <b className="font-extrabold"> your greatest asset</b>. Yet, we
            often spend more of our budget on our cars, homes and “stuff.”
            Spending money on health care is an
            <b className="font-extrabold"> investment</b>, not an expense. Don’t
            put off to tomorrow what you can do today.
          </p>
        </div>

        <div className="text-4xl text-center p-4">
          <h1>Are you ready to ask for help?</h1>
        </div>

        <div className="flex gap-20 justify-center items-center">
          <button
            onClick={getStarted}
            type="button"
            className="inline-flex items-center px-8 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-npt_colors-350 hover:bg-npt_colors-10 hover:text-black first-line:transition ease-in-out duration-150 cursor-pointer"
            disabled=""
          >
            Get Started
          </button>
          <button
            onClick={contactUs}
            type="button"
            className="inline-flex items-center px-8 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-npt_colors-350 hover:bg-npt_colors-10 hover:text-black first-line:transition ease-in-out duration-150 cursor-pointer"
            disabled=""
          >
            Contact Us
          </button>
        </div>
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
