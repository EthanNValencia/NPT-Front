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
    <div className="flex rounded-lg">
      <div className="border-2 pr-2 pl-1 shadow-xl rounded-lg">
        <label className="text-xl pr-4">Begin Time:</label>
        <select
          className="h-10 w-10 text-xl text-center"
          value={selectedBeginHour}
          onChange={(e) => selectBeginHour(e.target.value)}
        >
          {beginHours.map((hour) => (
            <option key={hour} className="" value={hour}>
              {hour}
            </option>
          ))}
        </select>
        <select
          className="h-10 w-10 text-xl text-center"
          value={selectedBeginMinute}
          onChange={(e) => selectBeginMinute(e.target.value)}
        >
          {mins.map((min) => (
            <option key={min} className="" value={min}>
              {min}
            </option>
          ))}
        </select>
        <label className="text-xl">{beginMeredian}</label>
        <label className="text-xl p-4">End Time:</label>
        <select
          className="h-10 w-10 text-xl text-center"
          value={selectedEndHour}
          onChange={(e) => disabled(e.target.value)}
          disabled
        >
          {endHours.map((hour) => (
            <option key={hour} className="" value={hour}>
              {hour}
            </option>
          ))}
        </select>
        <select
          className="h-10 w-10 text-xl text-center select-none"
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
        <label className="text-xl">{endMeredian}</label>
      </div>
    </div>
  );
}

export default TimePicker;
