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
  const [selectedDate, setSelectedDate] = useState(new Date()); // selected date
  const [isEmployeeSelected, setIsEmployeeSelected] = useState(false); // boolean check
  // const [selectedDateSchedule, setSelectedDateSchedule] = useState([]);
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
    setSelectedTimes(newSelectedTimes);
  }

  useEffect(() => {
    const date = findAValidInitalDate(selectedDate);
    setSelectedDate(date);
  }, [selectedEmployee]);


  const calendarOnChange = (date) => {
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
  
    // console.log("selectedTimes: " + JSON.stringify(selectedTimes));
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

    console.log("Success");
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
          defaultValue={findAValidInitalDate(selectedDate)}
          minDate={new Date()}
          // tileDisabled={({ date }) => [0, 6].includes(date.getDay())}
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
    if (isEmployeeSelected) {
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
          <p>
            Hello, {userContext.user.firstName}! Please begin by selecting your
            therapist. Each of these excellent therapists have been matched to
            you based on the area(s) of interest that you selected in the
            previous step.
          </p>
        </div>
      );
    } else {
      return (
        <div>
          <p>You have selected {getEmployeeName(selectedEmployee)}!</p>
          <p>
            Next select the day and time that you would like to meet{" "}
            {getEmployeeName(selectedEmployee)}.
          </p>
        </div>
      );
    }
  }

  return (
    <div>
    <div className="xl:max-w-6xl lg:max-w-3xl md:max-w-2xl sm:max-w-sm xs:max-w-xs mx-auto">
      <div className=" shadow-xl min-w-0 border-2 rounded-md">
        <div className="overflow-x-auto flex p-4 gap-2">
          {employeeCardList()}
        </div>
      </div>
      <div className="flex md:flex-row sm:flex-col xs:flex-col gap-4 place-content-center pt-4 pb-4">
        <div className="text-">{userInstructions()}</div>
        <div>
          {calendar()}
          {timePicker()}
        </div>
      </div>
    </div>
      <ContinueBack goBack={goBack} onContinue={onContinue}/>
      </div>
  );
}
// overflow-x-scroll flex-row flex
export default TherapistPairing;