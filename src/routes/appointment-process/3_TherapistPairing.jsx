import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/context";
import EmployeeCard from "../../components/EmployeeCard";
import { findMyTherapists } from "../../axios/employees-api";
import Calendar from "react-calendar";
import TimePicker from "../../components/TimePicker";
import ContinueBack from "../../components/ContinueBack";

function TherapistPairing() {
  const userContext = useContext(UserContext);
  const [therapistArray, setTherapistArray] = useState([]);
  const [therapist, setTherapist] = useState({});
  const navigate = useNavigate();
  const [date, setDate] = useState(new Date());
  const [therapistSelected, setTherapistSelected] = useState(false);
  const [dateSelected, setDateSelected] = useState(true);
  const [timeSelected, setTimeSelected] = useState(false);

  const calendarOnChange = (date) => {
    setDate(date);
    console.log(date);
  };

  function goBack() {
    navigate("/category");
  }

  function onContinue() {
    // navigate("/");
  }

  function selected(employee) {
    console.log(employee);
    setTherapist(employee);
    setTherapistSelected(true);
  }

  useEffect(() => {
    //setLoading(true);
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
          therapist={therapist}
          employee={employee}
          selected={selected}
          fullRender={false}
        />
      );
    });
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
          tileDisabled={({ date }) => [0, 6].includes(date.getDay())}
        />
      );
    } else {
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
      return <TimePicker disabled={false} />;
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
          <p>You have selected {therapist.name}!</p>
          <p>
            Next select the day and time that you would like to meet{" "}
            {therapist.name}.
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
