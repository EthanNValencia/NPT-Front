import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext, npt_employees } from "../contexts/context";
import EmployeeCard from "../components/EmployeeCard";

function TherapistPairing() {
  const userContext = useContext(UserContext);
  const [therapist, setTherapist] = useState(null);
  const navigate = useNavigate();

  function goBack() {
    navigate("/pain-category");
  }

  function onContinue() {
    // navigate("/");
  }

  function selected(employee) {
    setTherapist(employee);
  }

  function getEmployeeCardList() {
    // const userCategories = Object.entries(userContext.painCategories);
    // console.log(userCategories);

    return npt_employees.map((employee, index) => {
      return (
        <EmployeeCard key={index} employee={employee} selected={selected} />
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
      <p></p>
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
