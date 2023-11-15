import React from "react";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function NssButtonChevron(props) {
  const { onClick, label, disabled, selected } = props;

  const pickDivColor = () => {
    if (disabled) {
      return "bg-nss-10 text-nss-20";
    }
    if (selected && selected != undefined) {
      return "text-nss-10 bg-nss-305 hover:bg-nss-300 hover:text-white";
    }
    if (!disabled) {
      return "text-nss-20 bg-nss-300 hover:bg-nss-305 hover:text-nss-10";
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
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
              <FontAwesomeIcon icon={faChevronDown} />
            </div>
          ) : (
            <div>
              <FontAwesomeIcon icon={faChevronUp} />
            </div>
          )
        ) : (
          <></>
        )}
      </button>
    </div>
  );
}

export default NssButtonChevron;
