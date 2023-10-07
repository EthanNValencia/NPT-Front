import React, { useState, useEffect } from "react";

function TimePicker(props) {
  let beginHour; // This should be generated from the employee profile.
  let endHour; // This should be generated from the employee profile.
  const selectedDate = props.selectedDate;
  const selectedEmployee = props.selectedEmployee;
  setBeginAndEndHours(selectedDate);
  const selectedDateSchedule = setSchedule(selectedDate);
  const times = generateAvailableTimes(selectedDateSchedule);
  // const [selectedMinute, setSelectedMinute] = useState({});
  let timeIndex = init(times);
  let minuteIndex = 0;
  const [selectedTime, setSelectedTime] = useState(times[timeIndex]);
  // const [selectedMinutes, setSelectedMinutes] = useState(() => initSelectedMinutes(times));
  const [selectedMinute, setSelectedMinute] = useState(() => initSelectedMinute(times));
  // initIndexOfTime(times);
  
  useEffect(() => {
    timeIndex = init(times);
    setSelectedTime(times[timeIndex]);
    console.log("HERE>>> " + selectedEmployee);
    console.log("selectedTime: " + JSON.stringify(selectedTime));
    console.log("indexOfTime: " + timeIndex);
    console.log("Times: " + JSON.stringify(times))
    console.log("SelectedDate " + JSON.stringify(selectedDate));
  }, [props.selectedEmployee, props.selectedDate]);

  function init(times) {
    if(times.length > 0) {
      for(let i = 0; i < times.length; i++) {
        if(times[i].disabled == false) {
          return i;
        }
      }}
      return 0;
  }

/*
  function initSelectedMinutes(times) {
    return selectedTime.mins;
  }
*/
  function initSelectedMinute(times) {
    for(var i = 0; i < selectedTime.mins.length; i++) {
      if(selectedTime.mins[i].disabled == false) {
        return selectedTime.mins[i];
      }
    }
  }
  function setBeginAndEndHours(date) {
    if(date == undefined) {
      beginHour = 7;
      endHour = 8;
      return;
    }
    const options = { weekday: 'short' };
    const dayName = date.toLocaleDateString('en-US', options);
    selectedEmployee.schedule.forEach(element => {
      if(element.day == dayName) {
        beginHour = parseInt(element.beginTime.split(":")[0]);
        endHour = parseInt(element.endTime.split(":")[0]);
        return;
      }
    });
    if(!beginHour && !endHour) {
      beginHour = 7;
      endHour = 17;
      return;
    }
  }

  function setSchedule(date) {
    if(date == undefined) {
      return [];
    }
    const key = formatDate(date);
    if(selectedEmployee.appointments) {
      // setSelectedDateSchedule(props.selectedEmployee.appointments[key]);
      return selectedEmployee.appointments[key];
    }
  }

  function formatDate(date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

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

  function modifySchedule(array, beginHour, beginMinute, endHour, endMinute) {
    for(var i = 0; i < array.length; i++) {
      if(array[i].endHour == endHour) {
        // array[i].mins = adjustNextTimeMinsForEndOfDaySchedule(array[i].mins);
      }
      if(array[i].beginHour == beginHour) {
        if(1+i < array.length && beginMinute !== 0) {
          array[1+i].mins = correctNextTimeMins(endMinute, array[1+i].mins);
        } 
        if(i-1 > 0 && endMinute !== 0) {
          array[i-1].mins = correctPreviousTimeMins(beginMinute, array[i-1].mins);
        }
        for(var j = 0; j < array[i].mins.length; j++) {
          array[i].mins[j].disabled = true; // is this necessary? 
        }
        array[i].disabled = true;
      }
    }
  }

  function adjustNextTimeMinsForEndOfDaySchedule(minArray) {
    // This will skip the 1st element to disabled 15, 30, 45.
    for(var i = 1; i < minArray.length; i++) {
      minArray[i].disabled = true;
    }
    //console.log(minArray);
    return minArray;
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

  function onChangeBeginHour(e) {
    console.log("e: " + e);
    const timeFilter = times.filter(time => time.beginHour == e);
    const time = timeFilter[0];
    const minuteFilter = time.mins.filter(min => min.disabled == false);
    const minute = minuteFilter[0];
    console.log("onChangeBeginHour.time: " + JSON.stringify(time));
    setSelectedTime(time);
    timeIndex = findIndexTimeByBeginHour(e);
    console.log("timeIndex: " + timeIndex);
    // setSelectedMinutes(time.mins);
  }

  function findIndexTimeByBeginHour(e) {
    if(times.length > 0) {
      for(let i = 0; i < times.length; i++) {
        if(times[i].beginHour == e) {
          return i;
        }
      }}
      return 0;
  }

  function onChangeBeginMinute(e) {
    setSelectedMinute(e);
    console.log(e);
    // setSelectedMinute(e);
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

  function maskBeginHour(time) {
    return time.beginHour;
    if(time.beginHour > 12) {
      return (time.beginHour % 12);
    }
    return time.beginHour;
  }

  function maskEndHour(time) {
    return time.endHour;
    if(time.endHour > 12) {
      return (time.endHour % 12);
    }
    return time.endHour;
  }
  //console.log("times: " + JSON.stringify(times));

  // There is something wrong with my useState objects. 

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
                {maskBeginHour(time)}
              </option>
            ))}
          </select>

          <select
            className="h-10 w-10 text-center"
            value={selectedMinute}
            onChange={(e) => onChangeBeginMinute(e.target.value)}
            disabled={props.disabled}
          >
            {times[timeIndex].mins.map((min) => (
              <option key={min.min} className="" value={min.min} disabled={min.disabled}>
                {checkMinuteForZero(min.min)}
              </option>
            ))}
          </select>

          <label className="pr-6">{selectedTime.meredian[0]}</label>

          <label className="">End Time:</label>
          <select
            className="h-10 w-10 text-center"
            value={selectedTime.endHour}
            onChange={(e) => disabled(e.target.value)}
            disabled={true}
          >
            {times.map((time) => (
              <option key={time.endHour} className="" value={time.endHour}>
                {maskEndHour(time)}
              </option>
            ))}
          </select>
          <select
            className="h-10 w-10 text-center select-none"
            value={selectedMinute}
            onChange={(e) => disabled(e.target.value)}
            disabled={true}
          >
            {times[timeIndex].mins.map((min) => (
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
