import React, { useState, useContext } from "react";
import { UserContext } from "../../contexts/context";
import { useNavigate } from "react-router-dom";

// Step 1

function RequestName() {
  // Define state variables for form fields
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [fnValidated, setFnValidated] = useState(false);
  const [lastName, setLastName] = useState("");
  const [lnValidated, setLnValidated] = useState(false);
  const userContext = useContext(UserContext);
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitAttempted(true);

    if (fnValidated && lnValidated) {
      userContext.setUserName(firstName, lastName);
      navigate("/category");
    }
  };

  const validateInputFields = () => {
    if (firstName.length >= 3) {
      setFnValidated(true);
    } else {
      setFnValidated(false);
    }
    if (lastName.length >= 3) {
      setLnValidated(true);
    } else {
      setLnValidated(false);
    }
  };

  function goBack() {
    navigate("/");
  }

  return (
    <div>
      <h1 className="text-center text-xl mb-4">
        Welcome to Nephew Physical Therapy. Please begin by introducing
        yourself.
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col justify-center items-center">
          <div className="mb-4">
            {!fnValidated && submitAttempted ? (
              <div className="text-center text-red-400">
                Please enter your first name.
              </div>
            ) : (
              <></>
            )}
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Enter your first name:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="firstName"
              type="text"
              placeholder="First name"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
                validateInputFields();
              }}
            />
          </div>

          <div className="mb-4">
            {!lnValidated && submitAttempted ? (
              <div className="text-center text-red-400">
                Please enter your last name.
              </div>
            ) : (
              <></>
            )}
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Enter your last name:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="firstName"
              type="text"
              placeholder="Last name"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
                validateInputFields();
              }}
            />
          </div>

          <div className="flex gap-20">
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-npt_colors-350 hover:bg-npt_colors-300 transition ease-in-out duration-150 cursor-pointer"
              disabled=""
              onClick={goBack}
            >
              Go Back
            </button>
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-npt_colors-350 hover:bg-npt_colors-300 transition ease-in-out duration-150 cursor-pointer"
              disabled=""
            >
              Continue
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default RequestName;

// {submittedName && <p>You submitted the name: {submittedName}</p>}
