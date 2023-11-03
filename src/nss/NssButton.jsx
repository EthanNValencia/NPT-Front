import React from "react";

function NssButton(props) {
  const { onClick, label, disabled } = props;

  const pickDivColor = () => {
    if (disabled) {
      return "bg-nss-10 text-nss-20";
    }
    if (!disabled) {
      return "text-nss-20 bg-nss-300 hover:bg-nss-305 hover:text-nss-10";
    }
  };

  return (
    <button
      type="button"
      className={`${pickDivColor()} inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded transition ease-in-out duration-500 cursor-pointer`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
}

export default NssButton;
