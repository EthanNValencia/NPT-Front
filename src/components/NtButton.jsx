import React, { useContext, useState } from "react";
import { UserContext } from "../contexts/context";

function NtButton(props) {
  function onClick() {
    console.log(
      "Button was clicked! (Check the Button class to remove this before production)"
    );
    props.onClick();
  }

  function renderButton() {
    if (props.loading) {
      return <ActiveButton />;
    } else {
      return <InactiveButton label={props.label} />;
    }
  }
  return <div onClick={onClick}>{renderButton()}</div>;
}

function ActiveButton() {
  return (
    <div className="flex">
      <button
        type="button"
        className="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-npt_colors-300 hover:bg-npt_colors-10 hover:text-black transition ease-in-out duration-150 cursor-not-allowed"
        disabled=""
      >
        <svg
          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        Processing...
      </button>
    </div>
  );
}

function InactiveButton(props) {
  return (
    <div className="flex">
      <button
        type="button"
        className="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-npt_colors-300 hover:bg-npt_colors-10 hover:text-black transition ease-in-out duration-150 cursor-pointer"
        disabled=""
      >
        {props.label}
      </button>
    </div>
  );
}

export default NtButton;
