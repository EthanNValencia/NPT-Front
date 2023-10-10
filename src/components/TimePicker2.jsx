import React, { useState, useEffect } from "react";

function TimePicker(props) {
  const { selectedDate, selectedEmployee, minimumAppointmentDuration, maxAppointmentDuration, disabled } = props;
  const [range, setRange] = useState(setBeginAndEndHours(selectedDate));
  const [begin, setBegin] = useState({hourValue: 7, minuteValue: 0, hourIndex: 0, minuteIndex: 0});
  const [end, setEnd] = useState({hourValue: 7, minuteValue: 30, hourIndex: 0, minuteIndex: 2});
  const schedule = setSchedule(selectedDate);
  const [beginTimes, setBeginTimes] = useState(generateAvailableBeginTimes(schedule));
  const [endTimes, setEndTimes] = useState(generateAvailableEndTimes());

  useEffect(() => {
    setStates();
  }, [selectedEmployee, selectedDate]);

  useEffect(() => {
    setStates();
  }, []);

    function setStates() {
        const newRange = setBeginAndEndHours(selectedDate);
        setRange(newRange);
        const schedule = setSchedule(selectedDate);
        const beginTimesArray = generateAvailableBeginTimes(schedule);
        setBeginTimes(beginTimesArray);
        const newEndTimes = generateAvailableEndTimes();
        setEndTimes(newEndTimes);
    }

  useEffect(() => {
    const array = generateAvailableEndTimes();
    console.log(array);
    setEndTimes(array);
  }, [begin]);

    function setBeginAndEndHours(date) {
    const options = { weekday: 'short' };
    const dayName = date.toLocaleDateString('en-US', options);
    let result = null;
    selectedEmployee.schedule.forEach(element => {
      if (element.day === dayName) {
        const beginHour = parseInt(element.beginTime.split(":")[0]);
        const endHour = parseInt(element.endTime.split(":")[0]);
        result = { begin: beginHour, end: endHour };
      }
    });
    return result; 
    }

  function setSchedule(date) {
    const key = formatDate(date);
    if(selectedEmployee.appointments) {
      return selectedEmployee.appointments[key];
    }
  }

  function formatDate(date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  function generateAvailableEndTimes() {
    if(props.minimumAppointmentDuration == undefined || props.maxAppointmentDuration == undefined) {
      return [{ beginHour: 7, mins: [{min:30, disabled:false}], disabled: false }]; // Make this default render? 
    }
    let endTimesArray = [];
    
    // begin {"hourValue":7,"minuteValue":30,"hourIndex":0,"minuteIndex":2}
    //   end {"hourValue":7,"minuteValue":30,"hourIndex":0,"minuteIndex":2}

    let obj;
    const beginHourIndex = begin.hourIndex;
    obj = { endHour: beginTimes[beginHourIndex].beginHour, mins: copyMinsArray(beginTimes[beginHourIndex].mins), disabled: beginTimes[beginHourIndex].disabled, meredian: beginTimes[beginHourIndex].meredian, i: 0 };
    endTimesArray.push(obj);
    
    if(begin.hourIndex < beginTimes.length) {
      obj = { endHour: beginTimes[beginHourIndex + 1].beginHour, mins: copyMinsArray(beginTimes[beginHourIndex + 1].mins), disabled: beginTimes[beginHourIndex + 1].disabled, meredian: beginTimes[beginHourIndex].meredian, i: 1 };
    } else {
        console.log("Uh oh find a solution for this");
    }
    // 
    endTimesArray.push(obj);
    modifyMinutes(endTimesArray);
    return endTimesArray;
  }

  function copyMinsArray(mins) {
    const newMins = [];
    for(let i = 0; i < mins.length; i++) {
        newMins.push(JSON.parse(JSON.stringify(mins[i])))
    }
    return newMins;
  }

  function modifyMinutes(endTimesArray) { // You need to fix this. 
    let min = 1;
    let max = 3;
    let minsTraveled = 0;
    // {hourValue: 7, minuteValue: 0, hourIndex: 0, minuteIndex: 2}
    for(let i = 0; i < endTimesArray.length; i++) {
        if(endTimesArray[i].endHour == begin.hourValue && begin.minuteValue >= 30) {
            endTimesArray[i].disabled = true;
            endTimesArray[i].mins.forEach(min => min.disabled = true);
        }
        /*
                0       15      30        45              0       15      30        45
        0 ->  disabled disabled enabled enabled   ->    enabled disabled disabled disabled
        15 -> disabled disabled disabled enabled  ->    enabled enabled disabled disabled
        30 -> disabled disabled disabled disabled ->    enabled enabled enabled disabled
        45 -> disabled disabled disabled disabled ->    disabled enabled enabled enabled
        */
    }
  }

  function modifyMinutesssss(endTimesArray) { // You need to redo this. It just isn't working. 
    let min = 1;
    let max = 3;
    let counter = 0;
    for(let i = 0; i < endTimesArray.length; i++) {
      for(let j = 0; j < endTimesArray[i].mins.length; j++) {
        if(i == 0) {
          if(j < begin.minuteIndex) {
            endTimesArray[i].mins[j].disabled = true;
            counter = counter + 1;
          }
          if(j >= begin.minuteIndex && counter <= min) {
            endTimesArray[i].mins[j].disabled = true;
            counter = counter + 1;
          }
        } else if (i == 1) {
            // console.log("i: " + i + " counter:" + counter);
            if(counter < max) {
              counter = counter + 1;
            } else {
              endTimesArray[i].mins[j].disabled = true;
            }
        }
      }
    }
  }
  

  function generateAvailableBeginTimes(selectedDateSchedule) {
    var array = [];
    // First it builds the time array.
    for(var i = range.begin; i < range.end; i++) {
      var obj;
      if(i === 12) {
        obj = { beginHour: i, mins: generateMinuteArray(), meredian: ["AM", "PM"], disabled: false, i: null };
      } else if (i > 12) {
         obj = { beginHour: i, mins: generateMinuteArray(), meredian: ["PM", "PM"], disabled: false, i: null };
      } else {
         obj = { beginHour: i, mins: generateMinuteArray(), meredian: ["AM", "AM"], disabled: false, i: null };
      }
      array.push(obj);
    }
    if(selectedDateSchedule) {
      for(var i = 0; i < selectedDateSchedule.length; i++) {
        const beginHour =  new Date(selectedDateSchedule[i].beginTime).getHours();
        const beginMinute =  new Date(selectedDateSchedule[i].beginTime).getMinutes();
        const endHour = new Date(selectedDateSchedule[i].endTime).getHours(); 
        const endMinute = new Date(selectedDateSchedule[i].endTime).getMinutes();
        modifyTimes(array, beginHour, beginMinute, endHour, endMinute);
      }
    }
    assignIndexes(array);
    return array;
  }

  function generateMinuteArray() {
    const mins = [];
    let increment = 0; // 0 15 30 45
    for(let i = 0; i < 4; i++) {
        mins.push({min:increment, disabled:false, i: i});
        increment = increment + 15;
    }
    return mins;
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

  function assignIndexes(array) {
    for(let i = 0; i < array.length; i++) {
        array[i].i = i;
    }
  }

  function adjustNextTimeMinsForEndOfDaySchedule(minArray) {
    for(var i = 1; i < minArray.length; i++) {
      minArray[i].disabled = true;
    }
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

  // begin {hourValue: 7, minuteValue: 0, hourIndex: 0, minuteIndex: 0};
  function onChangeBeginHour(e) {
    const timeFilter = beginTimes.filter(time => time.beginHour == e);
    const time = timeFilter[0];
    const newBegin = { ...begin, hourValue: time.beginHour, hourIndex: time.i };
    setBegin(newBegin);
  }

  function onChangeEndHour(e) {
    const timeFilter = endTimes.filter(time => time.endHour == e);
    const time = timeFilter[0];
    const newEnd = { ...end, hourValue: time.endHour, hourIndex: time.i };
    setEnd(newEnd);
  }

    // begin {hourValue: 7, minuteValue: 0, hourIndex: 0, minuteIndex: 0};
  function onChangeBeginMinute(e) {
    const minuteFilter = beginTimes[begin.hourIndex].mins.filter(min => min.min == e);
    const minute = minuteFilter[0];
    const newBegin = { ...begin, minuteValue: minute.min, minuteIndex: minute.i };
    setBegin(newBegin);
  }

  // end {hourValue: 7, minuteValue: 30, hourIndex: 0, minuteIndex: 2}
  function onChangeEndMinute(e) {
    const minuteFilter = endTimes[end.hourIndex].mins.filter(min => min.min == e);
    const minute = minuteFilter[0];
    const newEnd = { ...end, minuteValue: minute.min, minuteIndex: minute.i };
    setEnd(newEnd);
  }

  function log(element) {
    console.log("***" + JSON.stringify(element));
  }

  function checkMinuteForZero(min) {
    /*
    if(min == 0) {
      return "00";
    } 
    */
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

  function newTimePicker() {
    if(disabled) {
        return <DisabledTimePicker />
    }


    return (
      <div className="flex rounded-lg text-xs">
        <div className="border-2 pr-2 pl-2 shadow-xl rounded-lg">
          <label className="">Begin Time:</label>
          <select
            className="h-10 w-10 text-center"
            value={begin.hourValue}
            onChange={(e) => onChangeBeginHour(e.target.value)}
          >
            {beginTimes.map((time) => (
              <option key={time.beginHour} className="" value={time.beginHour} disabled={time.disabled}>
                {maskBeginHour(time)}
              </option>
            ))}
          </select>

          <select
            className="h-10 w-10 text-center"
            value={begin.minuteValue}
            onChange={(e) => onChangeBeginMinute(e.target.value)}
          >
            {beginTimes[begin.hourIndex].mins.map((min) => (
              <option key={min.min} className="" value={min.min} disabled={min.disabled}>
                {checkMinuteForZero(min.min)}
              </option>
            ))}
          </select>

          <label className="pr-6">{beginTimes[begin.hourIndex].meredian[0]}</label>
          <label className="">End Time:</label>
          <select
            className="h-10 w-10 text-center"
            value={end.hourValue}
            onChange={(e) => onChangeEndHour(e.target.value)}
          >
            {endTimes.map((time) => (
              <option key={time.endHour} className="" value={time.endHour} disabled={time.disabled}>
                {maskEndHour(time)}
              </option>
            )) }
          </select>
          <select
            className="h-10 w-10 text-center select-none"
            value={end.minuteValue}
            onChange={(e) => onChangeEndMinute(e.target.value)}
          >
            {endTimes[end.hourIndex].mins.map((min) => (
              <option key={min.min} className="" value={min.min} disabled={min.disabled}>
              {checkMinuteForZero(min.min)}
            </option>
            ))}
          </select>
          <label className="">{endTimes[end.hourIndex].meredian[1]}</label>
        </div>
      </div>
    );
  }

  return (
    <>
    {newTimePicker()}
    </>
  );
}

export default TimePicker;
