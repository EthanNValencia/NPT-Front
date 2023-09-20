import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/context";
import EmployeeCard from "../../components/EmployeeCard";
import { findMyTherapists } from "../../axios/employees-api";
import Calendar from "react-calendar";
import TimePickerExample from "../../components/TimePickerExample";
import TimePicker from "../../components/TimePicker";

function TherapistPairing() {
  const userContext = useContext(UserContext);
  const [therapistArray, setTherapistArray] = useState([]);
  const [therapist, setTherapist] = useState({});
  const navigate = useNavigate();
  const [date, setDate] = useState(new Date());

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
    setTherapist(employee);
  }

  useEffect(() => {
    //setLoading(true);
    async function findTherapistMatches() {
      findMyTherapists(setTherapistArray, userContext.categories);
    }
    findTherapistMatches();
  }, []);

  function getEmployeeCardList() {
    // const userCategories = Object.entries(userContext.painCategories);
    // console.log(userCategories);

    return therapistArray.map((employee, index) => {
      return (
        <EmployeeCard
          key={index}
          employee={employee}
          selected={selected}
          fullRender={false}
        />
      );
    });
  }

  return (
    <div>
      <div className="xl:max-w-3xl md:max-w-lg sm:max-w-sm xs:max-w-xs mx-auto bg-white shadow-xl min-w-0">
        <div className="overflow-x-auto flex p-4 gap-2">
          {getEmployeeCardList()}
        </div>
      </div>
      <h1>Hello {userContext.user.firstName}</h1>
      {therapist ? <p>You have selected {therapist.name}</p> : <></>}
      <p>
        <Calendar
          onChange={calendarOnChange}
          value={date}
          defaultValue={new Date()}
          minDate={new Date()}
          tileDisabled={({ date }) => [0, 6].includes(date.getDay())}
        />
        <TimePicker />
      </p>
      <div className="flex gap-20 justify-center items-center">
        <button
          type="button"
          className="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-npt_colors-350 hover:bg-npt_colors-300 transition ease-in-out duration-150 cursor-pointer"
          disabled=""
          onClick={goBack}
        >
          Go Back
        </button>
        <button
          type="button"
          className="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-npt_colors-350 hover:bg-npt_colors-300 transition ease-in-out duration-150 cursor-pointer"
          disabled=""
          onClick={onContinue}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
// overflow-x-scroll flex-row flex
export default TherapistPairing;
