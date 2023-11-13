import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faMinus } from "@fortawesome/free-solid-svg-icons";
import React from "react";

function NssButton(props) {
  const { onClick, label, disabled, selected } = props;

  const pickDivColor = () => {
    if (disabled) {
      return "bg-nss-10 text-nss-20";
    }
    if (!selected && selected != undefined) {
      return "text-nss-10 bg-nss-305 hover:bg-nss-300 hover:text-white";
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
      {selected != undefined ? (
        selected ? (
          <div>
            <FontAwesomeIcon icon={faCheck} />
          </div>
        ) : (
          <div>
            <FontAwesomeIcon icon={faMinus} />
          </div>
        )
      ) : (
        <></>
      )}
    </button>
  );
}

export default NssButton;
