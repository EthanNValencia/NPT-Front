import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../contexts/context";
import { useNavigate } from "react-router-dom";
import ContinueBack from "../../components/ContinueBack";
import MultipleCheckBoxes from "../../components/MultipleCheckBoxes";
import validator from "validator";

function ContactInformation() {
  const userContext = useContext(UserContext);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [emailIsValidated, setEmailIsValidated] = useState(false);
  const [phoneNumberIsValidated, setPhoneNumberIsValidated] = useState(false);
  const [emailIsSelected, setEmailIsSelected] = useState(false);
  const [phoneIsSelected, setPhoneIsSelected] = useState(false);
  const [contactTypeIsSelected, setContactTypeIsSelected] = useState(false);
  const [continueIsEnabled, setContinueIsEnabled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    userContext.navigateAppointment(navigate);
  }, []);

  useEffect(() => {
    if (!emailIsSelected) {
      setEmail("");
    }
    if (!phoneIsSelected) {
      setPhoneNumber("");
    }
  }, [emailIsSelected, phoneIsSelected]);

  useEffect(() => {
    validateInputFields();
  }, [email, phoneNumber]);

  const modifyPhoneNumber = (phoneNum) => {
    let modifiedPhoneNumber = phoneNum;
    const isUserDeletingNumber = phoneNum.length <= phoneNumber.length;
    const lastCharacter = phoneNum.slice(-1);
    if (
      (!isNumeric(lastCharacter) &&
        phoneNum.length != 4 &&
        phoneNum.length != 8 &&
        phoneNum.length != 0) ||
      phoneNum.length >= 13
    ) {
      return;
    }
    if (phoneNum.length == 3 && !isUserDeletingNumber) {
      modifiedPhoneNumber = modifiedPhoneNumber + "-";
    }
    if (phoneNum.length == 7 && !isUserDeletingNumber) {
      modifiedPhoneNumber = modifiedPhoneNumber + "-";
    }
    setPhoneNumber(modifiedPhoneNumber);
  };

  function isNumeric(str) {
    return !isNaN(str) && !isNaN(parseFloat(str));
  }

  const validateInputFields = () => {
    if (emailIsSelected || phoneIsSelected) {
      setContinueIsEnabled(true);
      setContactTypeIsSelected(true);
    } else {
      setContinueIsEnabled(false);
      setContactTypeIsSelected(false);
    }
    if (emailIsSelected) {
      if (validator.isEmail(email)) {
        setEmailIsValidated(true);
      } else {
        setEmailIsValidated(false);
      }
    }
    if (phoneIsSelected) {
      if (validatePhoneNumber(phoneNumber)) {
        setPhoneNumberIsValidated(true);
      } else {
        setPhoneNumberIsValidated(false);
      }
    }
  };

  // 123-123-1212
  const validatePhoneNumber = (phoneNum) => {
    if (phoneNum.length != 12) {
      return false;
    }
    for (let i = 0; i < phoneNum.length; i++) {
      let check = false;
      if (i == 3) {
        check = shouldEqual("-", phoneNum[i]);
      } else if (i == 7) {
        check = shouldEqual("-", phoneNum[i]);
      } else {
        check = isNumeric(phoneNum[i]);
      }
      if (check == false) {
        return false;
      }
    }
    return true;
  };

  const shouldEqual = (str1, str2) => {
    if (str1 == str2) {
      return true;
    }
    return false;
  };

  const goBack = () => {
    navigate("/pairing");
  };

  const validContinueConditions = () => {
    if (
      emailIsSelected &&
      emailIsValidated &&
      phoneIsSelected &&
      phoneNumberIsValidated
    ) {
      return true;
    }
    if (
      emailIsSelected &&
      emailIsValidated &&
      !phoneIsSelected &&
      !phoneNumberIsValidated
    ) {
      return true;
    }
    if (
      !emailIsSelected &&
      !emailIsValidated &&
      phoneIsSelected &&
      phoneNumberIsValidated
    ) {
      return true;
    }
    return false;
  };

  const onContinue = () => {
    setSubmitAttempted(true);
    if (validContinueConditions()) {
      userContext.setAppointmentPhoneAndOrEmail(phoneNumber, email);
      navigate("/notes");
    }
    // console.log("phone: " + phoneNumberIsValidated + ", email: " + emailIsValidated);
  };

  return (
    <div>
      <h1 className="text-center text-xl mb-4">
        You're almost there! Now we need to know how to contact you.
      </h1>
      <h1 className="text-center text-xl mb-4">
        How would you prefer to be contacted?
      </h1>

      {!contactTypeIsSelected && submitAttempted ? (
        <div className="text-center text-red-400 mb-4">
          <p>Please select your preferred means of communication.</p>{" "}
        </div>
      ) : (
        <></>
      )}

      <MultipleCheckBoxes
        emailIsSelected={emailIsSelected}
        setEmailIsSelected={setEmailIsSelected}
        phoneIsSelected={phoneIsSelected}
        setPhoneIsSelected={setPhoneIsSelected}
      />
      <div>
        {!phoneNumberIsValidated && submitAttempted && phoneIsSelected ? (
          <div className="text-center text-red-400">
            <p>Please enter a valid phone number.</p>
            <p>The expected format is: 616-543-4342</p>
          </div>
        ) : (
          <></>
        )}
        <div className="flex flex-col justify-center items-center">
          {phoneIsSelected ? (
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Enter your phone number:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="phoneNumber"
                type="text"
                placeholder="Phone number"
                value={phoneNumber}
                onChange={(e) => {
                  modifyPhoneNumber(e.target.value);
                  validateInputFields();
                }}
              />
            </div>
          ) : (
            <></>
          )}

          {!emailIsValidated && submitAttempted && emailIsSelected ? (
            <div className="text-center text-red-400">
              Please enter your email address.
            </div>
          ) : (
            <></>
          )}
          {emailIsSelected ? (
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Enter your email address:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="text"
                placeholder="Email address"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  validateInputFields();
                }}
              />
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
      <ContinueBack
        goBack={goBack}
        onContinue={onContinue}
        continueIsEnabled={continueIsEnabled}
      />
    </div>
  );
}

export default ContactInformation;
