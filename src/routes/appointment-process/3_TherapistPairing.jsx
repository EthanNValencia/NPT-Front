import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/context";
import EmployeeCard from "../../components/EmployeeCard";
import { findMyTherapists } from "../../axios/employees-api";
import Calendar from "react-calendar";
import TimePicker from "../../components/TimePicker";
import ContinueBack from "../../components/ContinueBack";
import SelectDisableExample from "../../components/SelectDisableExample";

function TherapistPairing() {
  const userContext = useContext(UserContext);
  const [therapistArray, setTherapistArray] = useState([]);
  const [selectedTherapist, setSelectedTherapist] = useState({});
  const navigate = useNavigate();
  const [date, setDate] = useState(new Date()); // selected date
  const [therapistSelected, setTherapistSelected] = useState(false);
  const [selectedDateSchedule, setSelectedDateSchedule] = useState([]);
  // const [dateSelected, setDateSelected] = useState(true);
  // const [timeSelected, setTimeSelected] = useState(false);

  const calendarOnChange = (date) => {
    setDate(date);
    setSchedule(date);
    console.log(date);
  };

  function formatDate(date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  function setSchedule(date) {
    const key = formatDate(date);
    if(selectedTherapist.appointments) {
      setSelectedDateSchedule(selectedTherapist.appointments[key]);
    }
  }

  function goBack() {
    navigate("/category");
  }

  function onContinue() {
    // navigate("/");
  }

  function selected(employee) {
    console.log(employee);
    setSelectedTherapist(employee);
    const date = new Date();
    setDate(date);
    setSchedule(date);
    setTherapistSelected(true);
  }

  useEffect(() => {
    async function findTherapistMatches() {
      findMyTherapists(setTherapistArray, userContext.categories);
    }
    findTherapistMatches();
  }, []);

  function employeeCardList() {
    return therapistArray.map((employee, index) => {
      return (
        <EmployeeCard
          key={index}
          selectedEmployee={selectedTherapist}
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
    selectedTherapist.schedule.forEach(element => {
      if(element.day == dayName) {
        bool = false;
        return;
      }
    });
    return bool;
  }

  function calendar() {
    // If therapist was not selected, then there is no point in operating the calendar.
    if (therapistSelected) {
      return (
        <Calendar
          onChange={calendarOnChange}
          value={date}
          defaultValue={new Date()}
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
          value={date}
          defaultValue={date}
          tileDisabled={({ date }) =>
            [0, 1, 2, 3, 4, 5, 6].includes(date.getDay())
          }
        />
      );
    }
  }

  function timePicker() {
    if (therapistSelected) {
      return <TimePicker disabled={false} selectedDateSchedule={selectedDateSchedule} selectedTherapist={selectedTherapist} />;
    } else {
      return <TimePicker disabled={true} />;
    }
  }

  function userInstructions() {
    if (!therapistSelected) {
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
          <p>You have selected {selectedTherapist.name}!</p>
          <p>
            Next select the day and time that you would like to meet{" "}
            {selectedTherapist.name}.
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
