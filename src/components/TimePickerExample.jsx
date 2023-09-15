import React, { useEffect, useState } from "react";
import { Timepicker, Input, initTE } from "tw-elements";

function DatePickerExample() {
  // initTE({ Datepicker, Input });
  const [message, setMessage] = useState("");

  useEffect(() => {
    initTE({ Timepicker, Input });
  }, []);

  const handleTimepickerChange = (e) => {
    console.log(e);
    console.log(e.target.value);
  };

  return (
    <div>
      <div
        className="relative"
        data-te-timepicker-init
        data-te-input-wrapper-init
      >
        <input
          type="text"
          className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
          id="form1"
          placeholder="Select a time"
          onChange={(event) => handleTimepickerChange(event)}
        />
        <label className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary">
          Select a time
        </label>
      </div>
    </div>
  );
}

export default DatePickerExample;

/*

Object { _reactName: "onClick", _targetInst: null, type: "click", nativeEvent: click, target: input#message.peer.block.min-h-[auto].w-full.rounded.border-0.bg-transparent.px-3.py-[0.32rem].leading-[1.6].outline-none.transition-all.duration-200.ease-linear.focus:placeholder:opacity-100.peer-focus:text-primary.data-[te-input-state-active]:placeholder:opacity-100.motion-reduce:transition-none.dark:text-neutral-200.dark:placeholder:text-neutral-200.dark:peer-focus:text-primary.[&:not([data-te-input-placeholder-active])]:placeholder:opacity-0, currentTarget: input#message.peer.block.min-h-[auto].w-full.rounded.border-0.bg-transparent.px-3.py-[0.32rem].leading-[1.6].outline-none.transition-all.duration-200.ease-linear.focus:placeholder:opacity-100.peer-focus:text-primary.data-[te-input-state-active]:placeholder:opacity-100.motion-reduce:transition-none.dark:text-neutral-200.dark:placeholder:text-neutral-200.dark:peer-focus:text-primary.[&:not([data-te-input-placeholder-active])]:placeholder:opacity-0, eventPhase: 3, bubbles: true, cancelable: true, timeStamp: 12854, … }
DatePickerExample.jsx:13:12



*/
