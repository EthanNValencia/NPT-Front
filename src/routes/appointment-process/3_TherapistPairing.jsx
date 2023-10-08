import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/context";
import EmployeeCard from "../../components/EmployeeCard";
import { findMyTherapists } from "../../axios/api";
import Calendar from "react-calendar";
import TimePicker from "../../components/TimePicker";
import ContinueBack from "../../components/ContinueBack";

function TherapistPairing() {
  const userContext = useContext(UserContext);
  const [employeeMatchArray, setEmployeeMatchArray] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState({}); // employee object
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(new Date()); // selected date
  const [isEmployeeSelected, setIsEmployeeSelected] = useState(false); // boolean check
  // const [selectedDateSchedule, setSelectedDateSchedule] = useState([]);

  function findAValidInitalDate(date) {
    if(selectedEmployee.schedule == undefined) {
      return date;
    }
    for(var i = 0; i < 7; i++) {
      const options = { weekday: 'short' };
      const dayName = date.toLocaleDateString('en-US', options);
      console.log(JSON.stringify(selectedEmployee.schedule))
      const match = selectedEmployee.schedule.filter(element => element.day == dayName);
      if(match.length > 0) {
         return date;
      }
      date.setDate(date.getDate() + 1);
    }
  }

  useEffect(() => {
    const date = findAValidInitalDate(selectedDate);
    setSelectedDate(date);
    console.log("selectedDate: " + selectedDate);
  }, [selectedEmployee]);


  const calendarOnChange = (date) => {
    setSelectedDate(date);
    // setSchedule(date);
    console.log(date);
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
    // navigate("/");
  }

  function selected(employee) {
    console.log(employee);
    setSelectedEmployee(employee);
    // const date = new Date();
    // setSelectedDate(date);
    // setSchedule(date);
    setIsEmployeeSelected(true);
  }

  useEffect(() => {
    async function findTherapistMatches() {
      findMyTherapists(setEmployeeMatchArray, userContext.categories);
    }
    findTherapistMatches();
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
      return <TimePicker disabled={false} selectedDate={selectedDate} selectedEmployee={selectedEmployee} />;
    } else {
      return <TimePicker disabled={true} />;
    }
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
          <p>You have selected {selectedEmployee.name}!</p>
          <p>
            Next select the day and time that you would like to meet{" "}
            {selectedEmployee.name}.
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