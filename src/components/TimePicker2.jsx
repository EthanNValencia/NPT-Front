import React, { useState, useEffect, useRef } from "react";

function TimePicker(props) {
  const { selectedDate, selectedEmployee, minimumAppointmentDuration, maxAppointmentDuration, disabled, saveSelectedTimes } = props;
  const [range, setRange] = useState( { begin: 7, end: 8, beginMinute: 0, endMinute: 0 } );
  const [begin, setBegin] = useState({hourValue: 7, minuteValue: 0, hourIndex: 0, minuteIndex: 0});
  const [end, setEnd] = useState({hourValue: 7, minuteValue: 30, hourIndex: 0, minuteIndex: 2});
  const appointmentsSchedule = setSchedule(selectedDate);
  const [beginTimes, setBeginTimes] = useState(generateAvailableBeginTimes(appointmentsSchedule));
  const [endTimes, setEndTimes] = useState(generateAvailableEndTimes());

  useEffect(() => {
    const newRange = setBeginAndEndHours();
    setRange(newRange);
    const newBeginTimes = generateAvailableBeginTimes(appointmentsSchedule, newRange);
    setBeginTimes(newBeginTimes);
  }, [selectedEmployee, selectedDate]);

    useEffect(()=>{
        const newBegin = findValidTime(beginTimes);
        setBegin(newBegin); // Begin
    }, [beginTimes])

  useEffect(() => {
    const newEndTimes = generateAvailableEndTimes();
    setEndTimes(newEndTimes); // EndTimes
  }, [begin]);

  useEffect(() => {
    const newEnd = findValidTime(endTimes);
    // console.log("End: " + JSON.stringify(end));
    setEnd(newEnd);
  }, [endTimes]);

  useEffect(() => {
    saveSelectedTimes(begin, end);
  }, [end, begin]);

  // {hourValue: 7, minuteValue: 30, hourIndex: 0, minuteIndex: 2}
  function findValidTime(times) {
    // console.log("times in findValidTime(): " + JSON.stringify(times));
    const timeFilter = times.filter(time => time.disabled == false);
    // console.log("TimeFilter in findValidTime(): " + JSON.stringify(timeFilter));
    const firstValidHour = timeFilter[0];
    const minuteFilter = timeFilter[0].mins.filter(min => min.disabled == false);
    const firstValidMinute = minuteFilter[0];

    if(firstValidHour.beginHour == undefined) {
        return { hourValue: firstValidHour.endHour, minuteValue: firstValidMinute.min, hourIndex: firstValidHour.i, minuteIndex: firstValidMinute.i };
    }
    return { hourValue: firstValidHour.beginHour, minuteValue: firstValidMinute.min, hourIndex: firstValidHour.i, minuteIndex: firstValidMinute.i };
  }

  // element: {"id":2,"day":"Mon","beginTime":"07:00:00","endTime":"18:30:00"}
    function setBeginAndEndHours() {
        const date = selectedDate;
        const options = { weekday: 'short' };
        const dayName = date.toLocaleDateString('en-US', options);
        let result = null;
        selectedEmployee.schedule.forEach(element => {
        if (element.day === dayName) {
            // element: {"id":2,"day":"Mon","beginTime":"07:00:00","endTime":"18:30:00"}
            const beginHour = parseInt(element.beginTime.split(":")[0]);
            const endHour = parseInt(element.endTime.split(":")[0]);
            const beginMinute = parseInt(element.beginTime.split(":")[1]);
            const endMinute = parseInt(element.endTime.split(":")[1]);
            result = { begin: beginHour, end: endHour, beginMinute: beginMinute,  endMinute: endMinute};
            // console.log("Range: " + JSON.stringify(result));
        }
        });
        return result; 
    }

    /*
    "schedule":[
        {"id":3,"day":"Thu","beginTime":"07:00:00","endTime":"18:30:00"},
        {"id":2,"day":"Wed","beginTime":"07:00:00","endTime":"18:30:00"},
        {"id":1,"day":"Fri","beginTime":"13:00:00","endTime":"15:00:00"},
        {"id":5,"day":"Tue","beginTime":"07:00:00","endTime":"18:30:00"},
        {"id":4,"day":"Mon","beginTime":"07:00:00","endTime":"18:30:00"}
    */

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
    if(begin.minuteValue >= 30) {
        obj = { endHour: beginTimes[beginHourIndex].beginHour, mins: copyMinsArray(beginTimes[beginHourIndex].mins), disabled: true, meredian: beginTimes[beginHourIndex].meredian, i: 0 };
    } else {
        obj = { endHour: beginTimes[beginHourIndex].beginHour, mins: copyMinsArray(beginTimes[beginHourIndex].mins), disabled: beginTimes[beginHourIndex].disabled, meredian: beginTimes[beginHourIndex].meredian, i: 0 };
    }
    endTimesArray.push(obj);
    if(begin.hourIndex < beginTimes.length && beginTimes[beginHourIndex + 1] != undefined) {
      obj = { endHour: beginTimes[beginHourIndex + 1].beginHour, mins: copyMinsArray(beginTimes[beginHourIndex + 1].mins), disabled: beginTimes[beginHourIndex + 1].disabled, meredian: beginTimes[beginHourIndex].meredian, i: 1 };
      endTimesArray.push(obj);
    } else if (range.endMinute == 0) {
        obj = { endHour: beginTimes[beginHourIndex].beginHour + 1, mins: generateLastHourMinuteArray(), disabled: false, meredian: beginTimes[beginHourIndex].meredian, i: 1 };
        endTimesArray.push(obj);
    } else if(range.endMinute == 30) {
        obj = { endHour: beginTimes[beginHourIndex].beginHour + 1, mins: generateLastHourMinuteArray(), disabled: false, meredian: beginTimes[beginHourIndex].meredian, i: 1 };
        endTimesArray.push(obj);
    }
    modifyMinutes(endTimesArray);
    validateTimes(endTimesArray);
    return endTimesArray;
  }

  function validateTimes(endTimesArray) {
    for(let i = 0; i < endTimesArray.length; i++) {
        const minutes = endTimesArray[i].mins.filter(min => min.disabled == false);
        if(minutes.length == 0) {
            endTimesArray[i].disabled = true;
        }
        // console.log("minutes: " + JSON.stringify(minutes));
        // console.log("EndTimesArrayModified: " + JSON.stringify(endTimesArray[i]));
    }
  }

  function findValidMinute(time) {
    const validMinute = time.mins.filter(min => min.disabled == false);
    return validMinute[0];
  }

  function copyMinsArray(mins) {
    const newMins = [];
    for(let i = 0; i < mins.length; i++) {
        newMins.push(JSON.parse(JSON.stringify(mins[i])))
    }
    return newMins;
  }

  function modifyMinutes(endTimesArray) { // You need to fix this. 
    let min = 30;
    let max = 60;
    const increment = 30;
    let minsTraveled = -1 * begin.minuteValue;
    for(var i = 0; i < endTimesArray.length; i++) {
        for(var j = 0; j < endTimesArray[i].mins.length; j++) {
            if((minsTraveled == min || minsTraveled == max)) {
                // Change nothing. COME BACK TO THIS 
            } else {
                endTimesArray[i].mins[j].disabled = true;
            }
            minsTraveled = minsTraveled + increment;
        }
    }
    // console.log("endTimesArray in modifyMinutes: " + JSON.stringify(endTimesArray));
        /*
            This is what it should look like with mins 0,15,30,45
                0       15      30        45              0       15      30        45
        0 ->  disabled disabled enabled enabled   ->    enabled disabled disabled disabled
        15 -> disabled disabled disabled enabled  ->    enabled enabled disabled disabled
        30 -> disabled disabled disabled disabled ->    enabled enabled enabled disabled
        45 -> disabled disabled disabled disabled ->    disabled enabled enabled enabled

            This is with 0,30
                0       30          0       30
        0 ->  disabled enabled    enabled  disabled
        30 -> disabled disabled   enabled  enabled
        */
  }

  function modifyMinutesDeprecated(endTimesArray) { // You need to redo this. It just isn't working. 
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
  

  function generateAvailableBeginTimes(appSchedule, range) {
    if(range == undefined) {
        range = { begin: 7, end: 8, beginMinute: 0, endMinute: 30 };
    }
    var array = [];
    // First it builds the time array.
    for(var i = range.begin; i < range.end; i++) {
      var obj;
      if(i === 12) {
        obj = { beginHour: i, mins: generateMinuteArray(), meredian: ["AM", "PM"], disabled: false, i: null, date: selectedDate };
      } else if (i > 12) {
         obj = { beginHour: i, mins: generateMinuteArray(), meredian: ["PM", "PM"], disabled: false, i: null, date: selectedDate };
      } else {
         obj = { beginHour: i, mins: generateMinuteArray(), meredian: ["AM", "AM"], disabled: false, i: null, date: selectedDate };
      }
      array.push(obj);
    }
    // console.log("SelectedDate: " + selectedDate);
    if(appSchedule != undefined) {
      for(var i = 0; i < appSchedule.length; i++) {
        const beginHour =  new Date(appSchedule[i].beginTime).getHours();
        const beginMinute =  new Date(appSchedule[i].beginTime).getMinutes();
        const endHour = new Date(appSchedule[i].endTime).getHours(); 
        const endMinute = new Date(appSchedule[i].endTime).getMinutes();
        modifyTimes(array, beginHour, beginMinute, endHour, endMinute);
      }
    }
    assignIndexesAndModifyLastTimeAndMinuteArray(array, range);
    return array;
  }

  function generateMinuteArray() {
    const mins = [];
    const increment = 30; // 0 30
    let counter = 0;
    for(let i = 0; i < 2; i++) {
        mins.push({min:counter, disabled:false, i: i});
        counter = counter + increment;
    }
    return mins;
  }

  function modifyTimes(array, beginHour, beginMinute, endHour, endMinute) {
    for(let i = 0; i < array.length; i++) {
      if(array[i].beginHour == beginHour) {
        if(1+i < array.length && beginMinute !== 0) {
          array[1+i].mins = correctNextTimeMins(endMinute, array[1+i].mins);
        }
        if(i-1 > 0 && endMinute !== 0) {
          array[i-1].mins = correctPreviousTimeMins(beginMinute, array[i-1].mins);
        }
        for(let j = 0; j < array[i].mins.length; j++) {
          array[i].mins[j].disabled = true; // is this necessary? 
        }
        array[i].disabled = true;
      }
    }
  }

  function generateLastHourMinuteArray() {
    const mins = [];
    const increment = 30; // 0 15 30 45
    let counter = 0;
    // use range here? 
    for(let i = 0; i < 2; i++) {
        if(i == 0) {
            mins.push({min:counter, disabled:false, i: i});
        } else {
            mins.push({min:counter, disabled:true, i: i});
        }
        counter = counter + increment;
    }
    // console.log("Last Hour Minute Array: " + JSON.stringify(mins));
    return mins;
  }

  function assignIndexesAndModifyLastTimeAndMinuteArray(array, range) {
    for(let i = 0; i < array.length; i++) {
        array[i].i = i;
        const endHour = array[i].beginHour + 1;
        // console.log("Endhour: " + JSON.stringify(endHour) + " Range:" + JSON.stringify(range));
        if(endHour == range.end) {
            for(let j = 0; j < array[i].mins.length; j++) {
                if(range.endMinute == 30) {
                    if(array[i].mins[j].min > range.endMinute) {
                        array[i].mins[j].disabled = true;
                    } 
                } else if (range.endMinute == 0) {
                    if(array[i].mins[j].min == 45) {
                        array[i].mins[j].disabled = true;
                    } 
                }
                
            }
        }
        // console.log("Time Object: " +  JSON.stringify(array[i]));
    }
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
    // console.log("timeFilter: " + JSON.stringify(timeFilter));
    // timeFilter: [{"beginHour":17,"mins":[{"min":0,"disabled":true,"i":0},{"min":15,"disabled":true,"i":1},{"min":30,"disabled":true,"i":2},{"min":45,"disabled":false,"i":3}],"meredian":["PM","PM"],"disabled":false,"i":10,"date":"2023-10-18T04:00:00.000Z"}]
    const time = timeFilter[0];
    // console.log("time: " + JSON.stringify(time));
    const newBegin = { ...begin, hourValue: time.beginHour, hourIndex: time.i };
    setBegin(newBegin);
  }

  function onChangeEndHour(e) {
    const timeFilter = endTimes.filter(time => time.endHour == e);
    const time = timeFilter[0];
    const minute = findValidMinute(time);
    const newEnd = { minuteValue: minute.min, minuteIndex: minute.i, hourValue: time.endHour, hourIndex: time.i };
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

  function maskMinute(min) {
    if(min == 0) {
      return "00";
    }
    return min;
  }

  function maskBeginHour(time) {
    // return time.beginHour;
    if(time.beginHour > 12) {
      return (time.beginHour % 12);
    }
    return time.beginHour;
  }

  function maskEndHour(time) {
    // return time.endHour;
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
      <div className="rounded-lg text-xs">
        <div className="border-2 pr-2 pl-2 shadow-xl rounded-lg">
        <div className="flex justify-between">
          <div> 

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
                {maskMinute(min.min)}
              </option>
            ))}
          </select>

          <label className="pr-6">{beginTimes[begin.hourIndex].meredian[0]}</label>
          </div>
          <div>
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
              {maskMinute(min.min)}
            </option>
            ))}
          </select>
          <label className="">{endTimes[end.hourIndex].meredian[1]}</label>
        </div>
        </div>
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