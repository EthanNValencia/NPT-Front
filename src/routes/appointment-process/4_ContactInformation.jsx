import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../contexts/context";
import { useNavigate } from "react-router-dom";
import ContinueBack from "../../components/ContinueBack";
import MultipleCheckBoxes from "../../components/MultipleCheckBoxes";


function ContactInformation() {
  const userContext = useContext(UserContext);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [emailValidated, setEmailValidated] = useState(false);
  const [phoneNumberValidated, setPhoneNumberValidated] = useState(false);
  const [emailIsSelected, setEmailIsSelected] = useState(false);
  const [phoneIsSelected, setPhoneIsSelected] = useState(false);
  // setEmailIsSelected, setPhoneIsSelected
  const navigate = useNavigate();

  const modifyPhoneNumber = (phoneNum) => {
    let modifiedPhoneNumber = phoneNum;
    const isUserDeletingNumber = (phoneNum.length <= phoneNumber.length);
    const lastCharacter = phoneNum.slice(-1);
    if(!isNumeric(lastCharacter) && phoneNum.length != 4 && phoneNum.length != 8 && phoneNum.length != 0 || phoneNum.length >= 13) {
      return;
    }
    if(phoneNum.length == 3 && !isUserDeletingNumber) {
      modifiedPhoneNumber = modifiedPhoneNumber + "-";
    }
    if(phoneNum.length == 7 && !isUserDeletingNumber) {
      modifiedPhoneNumber = modifiedPhoneNumber + "-";
    }
    setPhoneNumber(modifiedPhoneNumber);
  }

  function isNumeric(str) {
    return !isNaN(str) && !isNaN(parseFloat(str));
  }

  const validateInputFields = () => {
    
  };

  const handleSubmit = () => {

  }

  const goBack = () => {
    navigate("/");
  }

  const onContinue = () => {
    setSubmitAttempted(true);
    if (emailValidated && phoneNumberValidated) {
      // userContext.setUserName(firstName, lastName);
      navigate("/category");
    }
  }

  return (<div>
    <h1 className="text-center text-xl mb-4">You're almost there! Now we need to know how to contact you.</h1>
    <h1 className="text-center text-xl mb-4">How would you prefer to be contacted?</h1>

    <MultipleCheckBoxes emailIsSelected={emailIsSelected} setEmailIsSelected={setEmailIsSelected} phoneIsSelected={phoneIsSelected} setPhoneIsSelected={setPhoneIsSelected} />
    <div onSubmit={handleSubmit}>
      {!phoneNumberValidated && submitAttempted ? (
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
              }}
            />
          </div>
        ) : (<></>)}
      
          {!emailValidated && submitAttempted ? (
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
            }}
          />
          
        </div>
        ) : (<></>)}
      </div>
    </div>
    <ContinueBack goBack={goBack} onContinue={onContinue}/>
    </div>);
}

export default ContactInformation;
