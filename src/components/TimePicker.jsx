import React, { useState } from "react";

function TimePicker(props) {
  
  const beginHour = 7; // This should be generated from the employee profile.
  const endHour = 17; // This should be generated from the employee profile.
  const selectedTherapist = props.selectedTherapist;
  const times = generateAvailableTimes(props.selectedDateSchedule);
  
  function disabled(e) {
    return;
  }

  function generateAvailableTimes(selectedDateSchedule) {
    var array = [];
    // First it builds the time array. 
    for(var i = beginHour; i < endHour; i++) {
      var obj;
      if(i === 12) {
        obj = { beginHour: i, endHour: i+1, mins: [{min:0, disabled:false},{min:15, disabled:false},{min:30, disabled:false},{min:45, disabled:false}], meredian: ["AM", "PM"], disabled: false };
      } else if (i > 12) {
         obj = { beginHour: i, endHour: i+1, mins: [{min:0, disabled:false},{min:15, disabled:false},{min:30, disabled:false},{min:45, disabled:false}], meredian: ["PM", "PM"], disabled: false };
      } else {
         obj = { beginHour: i, endHour: i+1, mins: [{min:0, disabled:false},{min:15, disabled:false},{min:30, disabled:false},{min:45, disabled:false}], meredian: ["AM", "AM"], disabled: false };
      }
      array.push(obj);
    }
    // Second it removes the matched elements. 
    if(selectedDateSchedule) {
      for(var i = 0; i < selectedDateSchedule.length; i++) {
        const beginHour =  new Date(selectedDateSchedule[i].beginTime).getHours();
        const beginMinute =  new Date(selectedDateSchedule[i].beginTime).getMinutes();
        const endHour = new Date(selectedDateSchedule[i].endTime).getHours(); 
        const endMinute = new Date(selectedDateSchedule[i].endTime).getMinutes();
        modifySchedule(array, beginHour, beginMinute, endHour, endMinute); 
      }
    }
    return array;
  }

  function correctNextTimeMins(endMinute, minArray) {
    for(var i = 0; i < minArray.length; i++) {
      if(minArray[i].min < endMinute) {
        minArray[i].disabled = true;
      }
    }
    return minArray;
  }

  function correctPreviousTimeMins(beginMinute, minArray) {
    for(var i = 0; i < minArray.length; i++) {
      if(minArray[i].min > beginMinute) {
        minArray[i].disabled = true;
      }
    }
    return minArray;
  }

  function modifySchedule(array, beginHour, beginMinute, endHour, endMinute) {
    for(var i = 0; i < array.length; i++) {
      if(array[i].beginHour == beginHour) {
        if(1+i < array.length && beginMinute !== 0) {
          array[1+i].mins = correctNextTimeMins(endMinute, array[1+i].mins); // This is getting hit? 
        } 
        if(i-1 > 0 && endMinute !== 0) {
          array[i-1].mins = correctPreviousTimeMins(beginMinute, array[i-1].mins);
        }
        array[i].disabled = true;
        return array;
      }
    }
  }

  const [selectedTime, setSelectedTime] = useState(() => {if(times.length > 0) {
    return times[0];
  } else {
    return {};
  }});

  const [selectedMinute, setSelectedMinute] = useState(() => {if(times.length > 0) {
    return times[0].mins[0];
  } else {
    return {};
  }});

  function onChangeBeginHour(e) {
    const timeFilter = times.filter(time => time.beginHour == e);
    const time = timeFilter[0];
    const minuteFilter = time.mins.filter(min => min.disabled == false);
    const minute = minuteFilter[0];
    setSelectedMinute(minute);
    setSelectedTime(time);
  }

  function onChangeBeginMinute(e) {
    setSelectedMinute(e);
  }

  function onChangeEndHour(e) {
    console.log(e);
  }

  function onChangeEndMinute(e) {
    console.log(e);
  }

  function checkMinuteForZero(min) {
    if(min == 0) {
      return "00";
    } 
    return min;
  }

  function newTimePicker() {
    return (
      <div className="flex rounded-lg text-xs">
        <div className="border-2 pr-2 pl-2 shadow-xl rounded-lg">
          <label className="">Begin Time:</label>
          <select
            className="h-10 w-10 text-center"
            value={selectedTime.beginHour}
            onChange={(e) => onChangeBeginHour(e.target.value)}
            disabled={props.disabled}
          >
            {times.map((time) => (
              <option key={time.beginHour} className="" value={time.beginHour} disabled={time.disabled}>
                {time.beginHour}
              </option>
            ))}
          </select>
          <select
            className="h-10 w-10 text-center"
            value={selectedMinute}
            onChange={(e) => onChangeBeginMinute(e.target.value)}
            disabled={props.disabled}
          >
            {selectedTime.mins.map((min) => (
              <option key={min.min} className="" value={min.min} disabled={min.disabled}>
                {checkMinuteForZero(min.min)}
              </option>
            ))}
          </select>
          <label className="pr-4">{selectedTime.meredian[0]}</label>

          <label className="">End Time:</label>
          <select
            className="h-10 w-10 text-center"
            value={selectedTime.endHour}
            onChange={(e) => disabled(e.target.value)}
            disabled={true}
          >
            {times.map((time) => (
              <option key={time.endHour} className="" value={time.endHour}>
                {time.endHour}
              </option>
            ))}
          </select>
          <select
            className="h-10 w-10 text-center select-none"
            value={selectedMinute}
            onChange={(e) => disabled(e.target.value)}
            disabled={true}
          >
            {selectedTime.mins.map((min) => (
              <option key={min.min} className="" value={min.min} disabled={min.disabled}>
              {checkMinuteForZero(min.min)}
            </option>
            ))}
          </select>
          <label className="">{selectedTime.meredian[1]}</label>
        </div>
      </div>
    );
  }

  return (
    <>
    {/* oldTimePicker() */}
    {newTimePicker()}
    </>
  );
}

export default TimePicker;


/*
  const [selectedBeginHour, setSelectBeginHour] = useState(7);
  const [selectedBeginMinute, setSelectBeginMinute] = useState("00");
  const [beginMeredian, setBeginMeredian] = useState("AM");
  const [selectedEndHour, setSelectEndHour] = useState(8);
  const [selectedEndMinute, setSelectEndMinute] = useState("00");
  const [endMeredian, setEndMeredian] = useState("AM");

const beginHours = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];
  const endHours = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
  // const mins = [0, 15, 30, 45];


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


function oldTimePicker() {
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
          <label className="pr-4">{beginMeredian}</label>
  
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



*/