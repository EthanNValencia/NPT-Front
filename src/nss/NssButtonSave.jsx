import React from "react";
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function NssButtonSave(props) {
  const { onClick, label, disabled, selected, animateBounce } = props;

  const ifAnimateIsTrue = () => {
    if (animateBounce) {
      return "animate-bounce";
    }
  };

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
        className={`${pickDivColor()} inline-flex items-center px-4 py-1 font-semibold leading-6 text-xs shadow rounded transition ease-in-out duration-500 cursor-pointer`}
        onClick={onClick}
        disabled={disabled}
      >
        <div className="inline-flex items-center gap-2">
          {label}
          <FontAwesomeIcon icon={faFloppyDisk} />
        </div>
      </button>
    </div>
  );
}

export default NssButtonSave;

/*

{animateBounce ? (
<span class="relative flex h-3 w-3">
    <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
    <span class="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
</span>
) : (
<></>
)}

*/
