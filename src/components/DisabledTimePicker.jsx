import React, { useState, useEffect } from "react";

function TimePicker() {
  const beginHour = 7; 
  const beginMinute = "00";
  const endHour = 7;
  const endMinute = 30;

  function disabled(e) {
    return;
  }
    return (
      <div className="flex rounded-lg text-xs">
        <div className="border-2 pr-2 pl-2 shadow-xl rounded-lg">
          <label className="">Begin Time:</label>
          <select
            className="h-10 w-10 text-center"
            value={beginHour}
            onChange={(e) => disabled(e.target.value)}
            disabled
          >
            <option>
                {beginHour}
              </option>
          </select>
          <select
            className="h-10 w-10 text-center"
            value={beginMinute}
            onChange={(e) => disabled(e.target.value)}
            disabled
          >
            <option>
                {beginMinute}
              </option>
          </select>

          <label className="pr-6">{"AM"}</label>
          <label className="">End Time:</label>
          <select
            className="h-10 w-10 text-center"
            value={endHour}
            onChange={(e) => disabled(e.target.value)}
            disabled
          >
             <option>
                {endHour}
              </option>
          </select>
          <select
            className="h-10 w-10 text-center select-none"
            value={endMinute}
            onChange={(e) => disabled(e.target.value)}
            disabled
          >
           <option>
              {endMinute}
            </option>
          </select>
          <label className="">{"AM"}</label>
        </div>
      </div>
    );
}

export default TimePicker;
