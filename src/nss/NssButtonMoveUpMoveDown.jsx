import React from "react";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function NssButtonMoveUpMoveDown(props) {
  const { onMoveUp, onMoveDown, disabled } = props;

  return (
    <div className="flex flex-col items-center justify-center">
      <button
        type="button"
        className={`text-nss-20 bg-nss-300 hover:bg-nss-305 hover:text-nss-10 inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-t-xl transition ease-in-out duration-500 cursor-pointer`}
        onClick={onMoveUp}
        disabled={disabled}
      >
        <div>
          <FontAwesomeIcon icon={faChevronUp} />
        </div>
      </button>
      <button
        type="button"
        className={`text-nss-20 bg-nss-300 hover:bg-nss-305 hover:text-nss-10 inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-b-xl transition ease-in-out duration-500 cursor-pointer`}
        onClick={onMoveDown}
        disabled={disabled}
      >
        <div>
          <FontAwesomeIcon icon={faChevronDown} />
        </div>
      </button>
    </div>
  );
}

export default NssButtonMoveUpMoveDown;
