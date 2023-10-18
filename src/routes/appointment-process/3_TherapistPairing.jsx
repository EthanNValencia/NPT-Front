import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/context";
import EmployeeCard from "../../components/EmployeeCard";
import { findMyMatch } from "../../axios/api";
import Calendar from "react-calendar";
import TimePicker2 from "../../components/TimePicker2";
import ContinueBack from "../../components/ContinueBack";
import DisabledTimePicker from "../../components/DisabledTimePicker";

function TherapistPairing() {
  const userContext = useContext(UserContext);
  const [employeeMatchArray, setEmployeeMatchArray] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState({}); // employee object
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(null); // selected date
  const [isEmployeeSelected, setIsEmployeeSelected] = useState(false); // boolean check
  const [isDateSelected, setIsDateSelected] = useState(false);
  const [isTimeSelected, setIsTimeSelected] = useState(false);
  const [selectedTimes, setSelectedTimes] = useState([{hourValue: null, minuteValue: null, hourIndex: null, minuteIndex: null}, {hourValue: null, minuteValue: null, hourIndex: null, minuteIndex: null}]);

  function findAValidInitalDate(date) {
    if(selectedEmployee.schedule == undefined) {
      return date;
    }
    for(var i = 0; i < 7; i++) { // 7 days in a week, but this should not fully execute unless the employee has no schedule. 
      const options = { weekday: 'short' };
      const dayName = date.toLocaleDateString('en-US', options);
      const match = selectedEmployee.schedule.filter(element => element.day == dayName);
      if(match.length > 0) {
         return date;
      }
      date.setDate(date.getDate() + 1);
    }
  }

  function saveSelectedTimes(begin, end) {
    const newBegin = { ...selectedTimes[0], ...begin };
    const newEnd = { ...selectedTimes[1], ...end };
    const newSelectedTimes = [newBegin, newEnd];
    setIsTimeSelected(true);
    setSelectedTimes(newSelectedTimes);
  }

  useEffect(() => {
    // const date = findAValidInitalDate(selectedDate);
    // setSelectedDate(date);
  }, [selectedEmployee]);


  const calendarOnChange = (date) => {
    setIsDateSelected(true);
    setSelectedDate(date);
  };
  /*
  function formatDate(date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  function setSchedule(date) {
    const key = formatDate(date);
    if(selectedEmployee.appointments) {
      setSelectedDateSchedule(selectedEmployee.appointments[key]);
    }
  }
  */
  function goBack() {
    navigate("/category");
  }

  function onContinue() {
  
    const check = verifySelectedTimes();
    if(check == false) {
      console.log("Failed");
      return;
    }
    // [{"hourValue":13,"minuteValue":0,"hourIndex":0,"minuteIndex":0},{"hourValue":13,"minuteValue":30,"hourIndex":0,"minuteIndex":1}]
    
    // console.log("Mins: " + selectedTimes[0].minuteValue + "-" + selectedTimes[1].minuteValue);
    const beginHour = selectedTimes[0].hourValue;
    const beginMinute = selectedTimes[0].minuteValue;
    const endHour = selectedTimes[1].hourValue;
    const endMinute = selectedTimes[1].minuteValue;

    let beginDate = new Date(selectedDate); 
    beginDate.setHours(beginHour, beginMinute);
    beginDate.setSeconds(0);

    let endDate = new Date(selectedDate);
    endDate.setHours(endHour, endMinute);
    endDate.setSeconds(0);

    userContext.setAppointmentTimes(beginDate, endDate);

    // console.log("Success");
    navigate("/contact-information");
  }

  function verifySelectedTimes() {
    if(selectedTimes[0].hourIndex == null || selectedTimes[0].hourValue == null || selectedTimes[0].minuteIndex == null || selectedTimes[0].minuteValue == null) {
      return false;
    }
    if(selectedTimes[1].hourIndex == null || selectedTimes[1].hourValue == null || selectedTimes[1].minuteIndex == null || selectedTimes[1].minuteValue == null) {
      return false;
    }
    return true;
  }

  function selected(employee) {
    setSelectedEmployee(employee);
    userContext.setEmployeeName(employee.firstName, employee.middleName, employee.lastName);
    setIsEmployeeSelected(true);
  }

  useEffect(() => {
    async function fetchMatches() {
      try {
        const matchedTherapists = await findMyMatch(userContext.services);
        setEmployeeMatchArray(matchedTherapists);
      } catch (error) {
        console.error('Error finding therapist matches:', error);
      }
    }

    fetchMatches();
  }, []); 

  function employeeCardList() {
    return employeeMatchArray.map((employee, index) => {
      return (
        <EmployeeCard
          key={index}
          selectedEmployee={selectedEmployee}
          employee={employee}
          selected={selected}
          fullRender={false}
        />
      );
    });
  }

  function generateAvailableCalendarDays({ date }) {
    const options = { weekday: 'short' };
    const dayName = date.toLocaleDateString('en-US', options);
    var bool = true;
    selectedEmployee.schedule.forEach(element => {
      if(element.day == dayName) {
        bool = false;
        return;
      }
    });
    return bool;
  }

  function calendar() {
    // If therapist was not selected, then there is no point in operating the calendar.
    if (isEmployeeSelected) {
      return (
        <Calendar
          onChange={calendarOnChange}
          value={selectedDate}
          defaultValue={selectedDate}
          minDate={new Date()}
          tileDisabled={generateAvailableCalendarDays}
        />
      );
    } else {
      // This will return a date that disables all dates. 
      return (
        <Calendar
          onChange={calendarOnChange}
          value={selectedDate}
          defaultValue={selectedDate}
          tileDisabled={({ date }) =>
            [0, 1, 2, 3, 4, 5, 6].includes(date.getDay())
          }
        />
      );
    }
  }

  function timePicker() {
    if (isEmployeeSelected && isDateSelected) {
      return <TimePicker2 disabled={false} selectedDate={selectedDate} selectedEmployee={selectedEmployee} minimumAppointmentDuration={30} maxAppointmentDuration={60} saveSelectedTimes={saveSelectedTimes} />;
    } else {
      return <DisabledTimePicker disabled={true} />;
    }
  }

  function getEmployeeName(employee) {
    if(employee.middleName) {
      return employee.firstName + " " + employee.middleName + " " + employee.lastName;
    }
    return employee.firstName + " " + employee.lastName;
  }

  function userInstructions() {
    if (!isEmployeeSelected) {
      return (
        <div>
          <p className="text-lg">
            {userContext.user.firstName}, begin by selecting your
            therapist. Each of these excellent therapists have been matched to
            you based on the service you selected in the previous step.
          </p>
        </div>
      );
    } else {
      return (
        <div>
          <p>You have selected {getEmployeeName(selectedEmployee)}! Next select the day and time that you would like to meet.</p>
        </div>
      );
    }
  }

  const checkOrTick = (boolean) => {
    if(boolean) {
      return <svg className="fill-none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <rect width="24" height="24" fill="white"></rect> <path d="M7 13.4545L9.66667 16L17 9" stroke="#000000" stroke-linecap="round" stroke-linejoin="round"></path> <rect x="4" y="4" width="16" height="16" rx="2" stroke="#000000" stroke-linecap="round" stroke-linejoin="round"></rect> </g></svg>
    } else {
      return <svg className="fill-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <rect width="24" height="24" fill="white"></rect> <path d="M7 13.4545L9.66667 16L17 9" stroke="#000000" stroke-linecap="round" stroke-linejoin="round"></path> <rect x="4" y="4" width="16" height="16" rx="2" stroke="#000000" stroke-linecap="round" stroke-linejoin="round"></rect> </g></svg>
    }
  }

  return (
    <div>
    <div className="w-full mx-auto">
      <div className=" shadow-xl min-w-0 border-2 rounded-md">
        <div className="overflow-x-auto flex p-4 gap-2">
          {employeeCardList()}
        </div>
      </div>
      <div className="flex md:flex-row sm:flex-col xs:flex-col gap-4 place-content-center pt-4 pb-4">
      <div className="relative bg-white px-2 py-2 shadow-xl ring-1 ring-gray-900/5 rounded-lg w-full">
        <div className="text-xs px-2 py-2 shadow-sm rounded-lg ring-1 ring-gray-900/5 w-fit float-right">
            <div className="grid grid-flow-row grid-cols-6 grid-rows-3">
              <p className="col-span-5 flex justify-center items-center">Therapist Selected:</p>
              <p className="col-span-1 ">{checkOrTick(isEmployeeSelected)}</p>
              <p className="col-span-5 flex justify-center items-center">Date Selected:</p>
              <p className="col-span-1">{checkOrTick(isDateSelected)}</p>
              <p className="col-span-5 flex justify-center items-center">Time Selected:</p>
              <p className="col-span-1">{checkOrTick(isTimeSelected)}</p>
            </div>
        </div>
        {userInstructions()}
        <p>I want to render specific things about the selected therapist here.</p>
        </div>
        <div className="relative bg-white px-2 pt-2 pb-2 shadow-xl w-fit ring-1 ring-gray-900/5 rounded-lg">
          {calendar()}
          <div className="mt-2">
            {timePicker()}
          </div>
        </div>
      </div>
    </div>
      <ContinueBack goBack={goBack} onContinue={onContinue} continueIsEnabled={isEmployeeSelected && isDateSelected && isTimeSelected} />
      </div>
  );


}
// overflow-x-scroll flex-row flex
export default TherapistPairing;