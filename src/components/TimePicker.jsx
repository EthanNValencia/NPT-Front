import React, { useState, useEffect } from "react";

function TimePicker(props) {
  let beginHour;
  let endHour;
  const selectedDate = props.selectedDate;
  const selectedEmployee = props.selectedEmployee;
  setBeginAndEndHours(selectedDate);
  const selectedDateSchedule = setSchedule(selectedDate);
  const beginTimes = generateAvailableBeginTimes(selectedDateSchedule);
  let beginTimeIndex = init(beginTimes);
  const [beginTime, setBeginTime] = useState(beginTimes[beginTimeIndex]);
  const [indexBeginMin, setIndexBeginMin] = useState(() => initIndexBeginMinute(beginTimes));
  const [indexBeginTime, setIndexBeginTime] = useState(0);
  
  const [endTimes, setEndTimes] = useState(generateAvailableEndTimes());
  const [endMin, setEndMin] = useState(beginMin);
  const [indexEndTime, setIndexEndTime] = useState(initIndexEndMinute(endTimes));

  const [beginMin, setBeginMin] = useState(beginTimes[indexBeginTime].mins[indexBeginMin].min);
  
  useEffect(() => {
    beginTimeIndex = init(beginTimes);
    setBeginTime(beginTimes[beginTimeIndex]);
    console.log("selectedTime: " + JSON.stringify(beginTime));
    console.log("indexOfTime: " + beginTimeIndex);
    console.log("Times: " + JSON.stringify(beginTimes));
    console.log("SelectedDate " + JSON.stringify(selectedDate));
    setIndexBeginTime(beginTimeIndex);
  }, [props.selectedEmployee, props.selectedDate]);

  useEffect(() => {
    const array = generateAvailableEndTimes();
    setEndTimes(array);
  }, [beginTime, indexBeginMin]);

  function init(times) {
    if(times.length > 0) {
      for(let i = 0; i < times.length; i++) {
        if(times[i].disabled == false) {
          return i;
        }
      }}
      return 0;
  }

  function initIndexBeginMinute() {
    for(var i = 0; i < beginTime.mins.length; i++) {
      if(beginTime.mins[i].disabled == false) {
        return i;
      }
    }
  }

  function initIndexEndMinute() {
    for(var i = 0; i < endTimes.mins.length; i++) {
      if(endTimes.mins[i].disabled == false) {
        return i;
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

  function generateAvailableEndTimes() {
    if(props.minimumAppointmentDuration == undefined || props.maxAppointmentDuration == undefined) {
      return [{ beginHour: 7, mins: [{min:30, disabled:false}], disabled: false }]; // Make this default render? 
    }
    console.log("minuteIndex: " + indexBeginMin);
    console.log("timeIndex: " + indexBeginTime);
    console.log("endMin: " + endMin);
    console.log("beginMin: " + beginMin);
    console.log("MinAppDur: " + props.minimumAppointmentDuration); // 1
    console.log("MaxAppDur: " + props.maxAppointmentDuration); // 3
    //
    let endTimesArray = [];
    // let counter = props.minimumAppointmentDuration + props.maxAppointmentDuration;
    var obj;
    obj = { endHour: beginTimes[indexBeginTime].beginHour, mins: beginTimes[indexBeginTime].mins, disabled: false };
    endTimesArray.push(obj);
    if(indexBeginTime < beginTimes.length) {
      obj = { endHour: beginTimes[indexBeginTime + 1].beginHour, mins: beginTimes[indexBeginTime + 1].mins, disabled: false };
    } else {
      let mins = beginTimes[indexBeginTime].mins;
      obj = { endHour: beginTimes[indexBeginTime].beginHour + 1, mins: mins, disabled: false };
    }
    // [{ endHour: 8, mins: [{min:0, disabled:false},{min:15, disabled:false},{min:30, disabled:false},{min:45, disabled:false}], disabled: false }]
    
    endTimesArray.push(obj);
    modifyEndTimes(endTimesArray);
    console.log(endTimesArray);
    return endTimesArray;
  }

  function modifyEndTimes(endTimesArray) {
    let min = 1;
    let max = 3;
    // 0 1 2 3 0 1 2 3
    let counter = 0;
    for(let i = 0; i < endTimesArray.length; i++) {
      for(let j = 0; j < endTimesArray[i].mins.length; j++) {
        if(i == 0) {
          if(j < indexBeginMin) {
            endTimesArray[i].mins[j].disabled = true;
          }
          if(j >= indexBeginMin && counter <= min) {
            endTimesArray[i].mins[j].disabled = true;
            counter = counter + 1;
          }
        } else if (i == 1) {
            if(counter <= max) {
              counter = counter + 1;
            } else {
              endTimesArray[i].mins[j].disabled = true;
            }
        }
      }
    }
    console.log("Final count: " + counter);
  }

  function generateAvailableBeginTimes(selectedDateSchedule) {
    var array = [];
    // First it builds the time array. 
    for(var i = beginHour; i < endHour; i++) {
      var obj;
      if(i === 12) {
        obj = { beginHour: i, mins: [{min:0, disabled:false},{min:15, disabled:false},{min:30, disabled:false},{min:45, disabled:false}], meredian: ["AM", "PM"], disabled: false };
      } else if (i > 12) {
         obj = { beginHour: i, mins: [{min:0, disabled:false},{min:15, disabled:false},{min:30, disabled:false},{min:45, disabled:false}], meredian: ["PM", "PM"], disabled: false };
      } else {
         obj = { beginHour: i, mins: [{min:0, disabled:false},{min:15, disabled:false},{min:30, disabled:false},{min:45, disabled:false}], meredian: ["AM", "AM"], disabled: false };
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
        modifyTimes(array, beginHour, beginMinute, endHour, endMinute);
      }
    }
    return array;
  }

  function modifyTimes(array, beginHour, beginMinute, endHour, endMinute) {
    for(var i = 0; i < array.length; i++) {
      // if(array[i].endHour == endHour) {
        // array[i].mins = adjustNextTimeMinsForEndOfDaySchedule(array[i].mins); // this isn't working.
      // }
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

  function findIndexTimeByBeginHour(e) {
    if(beginTimes.length > 0) {
      for(let i = 0; i < beginTimes.length; i++) {
        if(beginTimes[i].beginHour == e) {
          return i;
        }
      }}
      return 0;
  }

  function onChangeBeginHour(e) {
    // console.log("e: " + e);
    const timeFilter = beginTimes.filter(time => time.beginHour == e);
    const time = timeFilter[0];
    const minuteFilter = time.mins.filter(min => min.disabled == false);
    const minute = minuteFilter[0];
    // console.log("onChangeBeginHour.time: " + JSON.stringify(time));
    setBeginTime(time);
    beginTimeIndex = findIndexTimeByBeginHour(e);
    setIndexBeginTime(beginTimeIndex);
    // generateAvailableEndTimes();
    // setSelectedMinutes(time.mins);
  }

  function onChangeBeginMinute(e) {
    setBeginMin(e);
    for(var i = 0; i < beginTimes[indexBeginTime].mins.length; i++) {
      if(beginTimes[indexBeginTime].mins[i].min == e) {
        setIndexBeginMin(i);
      }
    }
    // generateAvailableEndTimes();
    console.log(e);
  }

  function onChangeEndHour(e) {
    
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
    // return time.beginHour;
    if(time.endHour > 12) {
      return (time.endHour % 12);
    }
    return time.endHour;
  }

  function newTimePicker() {
    return (
      <div className="flex rounded-lg text-xs">
        <div className="border-2 pr-2 pl-2 shadow-xl rounded-lg">
          <label className="">Begin Time:</label>
          <select
            className="h-10 w-10 text-center"
            value={beginTime.beginHour}
            onChange={(e) => onChangeBeginHour(e.target.value)}
            disabled={props.disabled}
          >
            {beginTimes.map((time) => (
              <option key={time.beginHour} className="" value={time.beginHour} disabled={time.disabled}>
                {maskBeginHour(time)}
              </option>
            ))}
          </select>

          <select
            className="h-10 w-10 text-center"
            value={beginMin}
            onChange={(e) => onChangeBeginMinute(e.target.value)}
            disabled={props.disabled}
          >
            {beginTimes[indexBeginTime].mins.map((min) => (
              <option key={min.min} className="" value={min.min} disabled={min.disabled}>
                {checkMinuteForZero(min.min)}
              </option>
            ))}
          </select>

          <label className="pr-6">{beginTime.meredian[0]}</label>
            {/* <><p>Time index: {timeIndex}</p> <p>useState index: {index}</p></> */}
            
          <label className="">End Time:</label>
          <select
            className="h-10 w-10 text-center"
            value={endTimes.endHour}
            onChange={(e) => onChangeEndHour(e.target.value)}
            disabled={false}
          >
            {endTimes.map((time) => (
              <option key={time.endHour} className="" value={time.endHour}>
                {time.endHour}
              </option>
            )) }
          </select>
          <select
            className="h-10 w-10 text-center select-none"
            value={endMin}
            onChange={(e) => disabled(e.target.value)}
            disabled={false}
          >
            {endTimes[indexBeginTime].mins.map((min) => (
              <option key={min.min} className="" value={min.min} disabled={min.disabled}>
              {checkMinuteForZero(min.min)}
            </option>
            ))}
          </select>
          <label className="">{beginTime.meredian[1]}</label>
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
