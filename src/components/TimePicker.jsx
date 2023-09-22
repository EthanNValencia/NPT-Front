import React, { useState } from "react";

function TimePicker(props) {
  const [selectedBeginHour, setSelectBeginHour] = useState(7);
  const [selectedBeginMinute, setSelectBeginMinute] = useState("00");
  const [beginMeredian, setBeginMeredian] = useState("AM");
  const [selectedEndHour, setSelectEndHour] = useState(8);
  const [selectedEndMinute, setSelectEndMinute] = useState("00");
  const [endMeredian, setEndMeredian] = useState("AM");
  const beginHours = [7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5];
  const endHours = [8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6];
  const mins = ["00", 15, 30, 45];
  // const meredian = ["AM", "PM"];

  function disabled(e) {
    return;
  }

  function selectBeginHour(hour) {
    setSelectBeginHour(hour);
    for (let i = 0; i < beginHours.length; i++) {
      if (beginHours[i] == hour) {
        setSelectEndHour(endHours[i]);
        if (hour >= 7 && hour <= 11) {
          setBeginMeredian("AM");
          setEndMeredian("AM");
        } else if (hour == 12) {
          setBeginMeredian("AM");
          setEndMeredian("PM");
        } else {
          setBeginMeredian("PM");
          setEndMeredian("PM");
        }

        return;
      }
    }
  }

  function selectBeginMinute(min) {
    setSelectBeginMinute(min);
    setSelectEndMinute(min);
  }

  return (
    <div className="flex rounded-lg text-xs">
      <div className="border-2 pr-2 pl-2 shadow-xl rounded-lg">
        <label className="">Begin Time:</label>
        <select
          className="h-10 w-10 text-center"
          value={selectedBeginHour}
          onChange={(e) => selectBeginHour(e.target.value)}
          disabled={props.disabled}
        >
          {beginHours.map((hour) => (
            <option key={hour} className="" value={hour}>
              {hour}
            </option>
          ))}
        </select>
        <select
          className="h-10 w-10 text-center"
          value={selectedBeginMinute}
          onChange={(e) => selectBeginMinute(e.target.value)}
          disabled={props.disabled}
        >
          {mins.map((min) => (
            <option key={min} className="" value={min}>
              {min}
            </option>
          ))}
        </select>
        <label className="pr-5">{beginMeredian}</label>
        <label className="">End Time:</label>
        <select
          className="h-10 w-10 text-center"
          value={selectedEndHour}
          onChange={(e) => disabled(e.target.value)}
          disabled={true}
        >
          {endHours.map((hour) => (
            <option key={hour} className="" value={hour}>
              {hour}
            </option>
          ))}
        </select>
        <select
          className="h-10 w-10 text-center select-none"
          value={selectedEndMinute}
          onChange={(e) => disabled(e.target.value)}
          disabled
        >
          {mins.map((min) => (
            <option key={min} className="" value={min}>
              {min}
            </option>
          ))}
        </select>
        <label className="">{endMeredian}</label>
      </div>
    </div>
  );
}

export default TimePicker;
