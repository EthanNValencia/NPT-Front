import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../contexts/context";
import { useNavigate } from "react-router-dom";
import ContinueBack from "../../components/ContinueBack";
import { postAppointment } from "../../axios/api";
import NtButton from "../../components/NtButton";
import ApiError from "../../components/ApiError";

function Notes() {
  const [openNote, setOpenNote] = useState(false);
  const [note, setNote] = useState("");
  const [continueIsEnabled, setContinueIsEnabled] = useState(false);
  const [looksGood, setLooksGood] = useState(false);
  const [submitted, setSubmitted] = useState(false); //  If submission is successful this will be true.
  const [loading, setLoading] = useState(false);
  const [hasApiError, setHasApiError] = useState(false);

  const userContext = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    userContext.navigateAppointment(navigate);
  }, []);

  const goBack = () => {
    navigate("/contact-information");
  };

  const onContinue = () => {
    console.log("Continue!");
  };

  const dateToReadableDateString = (date) => {
    try {
      const formattedDate = date.toDateString();
      const readableDate = `${formattedDate}`;
      return readableDate;
    } catch {}
  };

  const dateToReadableTimeString = (date) => {
    try {
      const formattedTime = date.toLocaleTimeString();
      const readableTime = `${formattedTime}`;
      return readableTime;
    } catch {}
  };

  const submitAppointment = async () => {
    setLoading(true);
    try {
      const newApp = await postAppointment(userContext.appointment);
      setLoading(false);
      setSubmitted(true);
      setHasApiError(false);
    } catch {
      setLoading(false);
      setHasApiError(true);
      // console.log("There was an error.");
    }
  };

  const onChangeLooksGood = () => {
    setLooksGood(true);
    // setContinueIsEnabled(true);
  };

  const onChangeNoteSection = () => {
    setOpenNote(!openNote);
  };

  const getEmployeeName = () => {
    if (userContext.appointment.employeeMiddleName == null) {
      return (
        userContext.appointment.employeeFirstName +
        " " +
        userContext.appointment.employeeLastName
      );
    } else {
      return (
        userContext.appointment.employeeFirstName +
        " " +
        userContext.appointment.employeeMiddleName +
        " " +
        userContext.appointment.employeeLastName
      );
    }
  };

  return (
    <div>
      <h1 className="flex justify-around mb-4 text-xl">
        You are almost there!
      </h1>
      <div className="flex justify-around flex-row">
        <div className="relative bg-white px-2 pt-2 pb-2 shadow-xl w-fit ring-1 ring-gray-900/5 rounded-lg">
          {hasApiError ? (
            <ApiError />
          ) : (
            <div>
              <div className="grid grid-flow-col grid-rows-3 gap-2">
                <div className="row-span-3">
                  <svg
                    fill="#000000"
                    height="125px"
                    width="125px"
                    version="1.2"
                    baseProfile="tiny"
                    id="Layer_1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 256 256"
                    xmlSpace="preserve"
                    transform="matrix(1, 0, 0, 1, 0, 0)"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      stroke="#CCCCCC"
                      strokeWidth="5.12"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <path
                        id="XMLID_1_"
                        d="M122.2,68.1c-13.1,0-23.8-10.6-23.8-23.8s10.7-23.8,23.8-23.8c13.2,0,23.8,10.6,23.8,23.8 S135.3,68.1,122.2,68.1 M194.7,228.7H4.9c-5.3,0-4.8,4.2-4.8,4.2v7c0,0-0.5,9.1,8.9,9.1h237.7c9.4,0,8.9-8.9,8.9-8.9v-19.4 c0,0-0.8-6.1-8-6.1h-23.2C216.4,214.7,209.9,228.7,194.7,228.7 M213.2,185.8c0,11.8,9.6,21.4,21.5,21.4c11.8,0,21.5-9.6,21.5-21.4 c0-11.9-9.6-21.4-21.5-21.4C222.8,164.4,213.2,174,213.2,185.8 M143.1,145c-1.4,4.3-4.6,7.8-9.2,9.5l-19.1,7.1l7,7h32.2l0-49.4 l-10.8,25.5C143.3,144.8,143.2,144.9,143.1,145 M189.4,180.3h-66.7l-16.1-15.7l-11.2,4.1c-8.3,3-18.4-1.6-21.5-9.8 c-1.8-5.1-1.6-10.8,1.5-15c-1.4-0.1-40.4,0-40.4,0c-6.5,0-11.8,5.2-11.8,11.7c0,6.5,5.3,11.6,11.8,11.6h39.8l15.8,23.9l-81.4,6.6 c-5.2,1.2-9.1,5.9-9.1,11.4c0,6.5,5.2,11.8,11.7,11.8l91.4,0c-1.6-2.6-2.6-5.6-2.6-8.8c0-9.3,7.6-16.9,16.9-16.9H154l29.6-6.2 l1.6,7.9l-30.4,6.4h-37.4c-4.9,0-8.8,3.9-8.8,8.8c0,4.8,3.9,8.7,8.6,8.8l72.3,0c11.2-0.1,20.2-9.1,20.2-20.3 C209.7,189.4,200.7,180.3,189.4,180.3 M130.8,147.9c2.4-0.9,4.4-2.8,5.4-5.1L153,102c3.7-9.4,0.2-27.6-18-27.6h-32.1 c-8.9,0-13.7,3.4-15.8,5.5c-1.6,1.6-51.6,56.5-51.6,56.5l28.6,0l25.3-27.6V135l25.8-9.5l8.9-21.4l6.8,2.5l-10.5,25l-33.9,12.8 c-4.7,2.1-6.9,7.6-4.8,12.3c2.1,4.7,7.6,6.8,12.3,4.8L130.8,147.9z"
                      ></path>{" "}
                    </g>
                  </svg>
                </div>
                <div className="col-span-2">
                  Here is your tentative appointment.
                </div>
                <div className="col-span-2 row-span-2">
                  <div className="grid grid-flow-row grid-cols-2 text-xs auto-rows-min">
                    <p className="text-right pe-2 ">Name:</p>
                    <p>
                      {userContext.appointment.appointmentFirstName +
                        " " +
                        userContext.appointment.appointmentLastName}
                    </p>
                    <p className="text-right pe-2 ">Reason:</p>
                    <p>{userContext.appointment.serviceName}</p>
                    <p className="text-right pe-2 ">With:</p>
                    <p>{getEmployeeName()}</p>
                    <p className="text-right pe-2 ">Requested Date:</p>
                    <p>
                      {dateToReadableDateString(
                        userContext.appointment.appointmentBeginTime
                      )}
                    </p>
                    <p className="text-right pe-2 ">Requested Time:</p>
                    <p>
                      {dateToReadableTimeString(
                        userContext.appointment.appointmentBeginTime
                      ) +
                        " - " +
                        dateToReadableTimeString(
                          userContext.appointment.appointmentEndTime
                        )}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex justify-around py-2">
                {!looksGood ? (
                  <button
                    onClick={onChangeLooksGood}
                    type="button"
                    className="inline-flex items-center px-8 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-npt_colors-350 hover:bg-npt_colors-10 hover:text-black first-line:transition ease-in-out duration-150 cursor-pointer"
                  >
                    Looks Good!
                  </button>
                ) : (
                  <button
                    onClick={onChangeLooksGood}
                    type="button"
                    className="inline-flex items-center px-8 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-npt_colors-350"
                  >
                    <div className="shrink-0 text-white">
                      <CheckIcon className="h-6 w-6" />
                    </div>
                  </button>
                )}
                <svg
                  className="hover:shadow-xl hover:ring-gray-900/5 hover:bg-npt_colors-10 hover:rounded-lg bg-npt_colors-350 rounded-lg first-line:transition ease-in-out duration-150 cursor-pointer fill-white hover:fill-black"
                  onClick={onChangeNoteSection}
                  width="40px"
                  height="40px"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <path d="M13.5,20 C14.3284271,20 15,19.3284271 15,18.5 C15,17.1192881 16.1192881,16 17.5,16 C18.3284271,16 19,15.3284271 19,14.5 L19,11.5 C19,11.2238576 19.2238576,11 19.5,11 C19.7761424,11 20,11.2238576 20,11.5 L20,14.5 C20,18.0898509 17.0898509,21 13.5,21 L6.5,21 C5.11928813,21 4,19.8807119 4,18.5 L4,5.5 C4,4.11928813 5.11928813,3 6.5,3 L12.5,3 C12.7761424,3 13,3.22385763 13,3.5 C13,3.77614237 12.7761424,4 12.5,4 L6.5,4 C5.67157288,4 5,4.67157288 5,5.5 L5,18.5 C5,19.3284271 5.67157288,20 6.5,20 L13.5,20 L13.5,20 Z M15.7913481,19.5014408 C16.9873685,18.9526013 17.9526013,17.9873685 18.5014408,16.7913481 C18.1948298,16.9255432 17.8561101,17 17.5,17 C16.6715729,17 16,17.6715729 16,18.5 C16,18.8561101 15.9255432,19.1948298 15.7913481,19.5014408 L15.7913481,19.5014408 Z M18,6 L20.5,6 C20.7761424,6 21,6.22385763 21,6.5 C21,6.77614237 20.7761424,7 20.5,7 L18,7 L18,9.5 C18,9.77614237 17.7761424,10 17.5,10 C17.2238576,10 17,9.77614237 17,9.5 L17,7 L14.5,7 C14.2238576,7 14,6.77614237 14,6.5 C14,6.22385763 14.2238576,6 14.5,6 L17,6 L17,3.5 C17,3.22385763 17.2238576,3 17.5,3 C17.7761424,3 18,3.22385763 18,3.5 L18,6 Z M8.5,9 C8.22385763,9 8,8.77614237 8,8.5 C8,8.22385763 8.22385763,8 8.5,8 L12.5,8 C12.7761424,8 13,8.22385763 13,8.5 C13,8.77614237 12.7761424,9 12.5,9 L8.5,9 Z M8.5,12 C8.22385763,12 8,11.7761424 8,11.5 C8,11.2238576 8.22385763,11 8.5,11 L15.5,11 C15.7761424,11 16,11.2238576 16,11.5 C16,11.7761424 15.7761424,12 15.5,12 L8.5,12 Z M8.5,15 C8.22385763,15 8,14.7761424 8,14.5 C8,14.2238576 8.22385763,14 8.5,14 L13.5,14 C13.7761424,14 14,14.2238576 14,14.5 C14,14.7761424 13.7761424,15 13.5,15 L8.5,15 Z"></path>{" "}
                  </g>
                </svg>
              </div>
              <div className="">
                {openNote ? (
                  <textarea
                    value={note}
                    onChange={(e) => {
                      setNote(e.target.value);
                      userContext.setNote(e.target.value);
                    }}
                    id="message"
                    rows="4"
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-200 rounded-lg border border-gray-300 focus:ring-npt_colors-30 focus:border-npt_colors-30"
                    placeholder="Write your note here..."
                  ></textarea>
                ) : (
                  <></>
                )}
              </div>
              {looksGood ? (
                <div className="flex justify-around pt-2">
                  <button
                    onClick={submitAppointment}
                    type="button"
                    className="inline-flex items-center px-8 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-npt_colors-350 hover:bg-npt_colors-10 hover:text-black first-line:transition ease-in-out duration-150 cursor-pointer"
                  >
                    Submit
                  </button>
                  <NtButton
                    label={submitted ? "Thank you" : "Submit"}
                    onClick={submitAppointment}
                    loading={loading}
                    disabled={submitted}
                  />
                </div>
              ) : (
                <></>
              )}
            </div>
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

export default Notes;

function CheckIcon(props) {
  // Example:
  // <div className="shrink-0 text-white">
  // <CheckIcon className="h-6 w-6" />
  // </div>
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx={12} cy={12} r={12} fill="#fff" opacity="0.2" />
      <path
        d="M7 13l3 3 7-7"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
