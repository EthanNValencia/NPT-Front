import React, { useContext, useState } from "react";
import { UserContext } from "../../contexts/context";
import { useNavigate } from "react-router-dom";
import ContinueBack from "../../components/ContinueBack";


function Notes() {
    const [note, setNote] = useState("");
    const userContext = useContext(UserContext);
    const navigate = useNavigate();


    const goBack = () => {
        navigate("/contact-information");
      }
    
    const onContinue = () => {
    
    console.log("Continue!")
    }

    const dateToReadableDateString = (date) => {
        const formattedDate = date.toDateString();
        const readableDate = `${formattedDate}`;
        return readableDate;
    }

    const dateToReadableTimeString = (date) => {
        const formattedTime = date.toLocaleTimeString();
        const readableTime = `${formattedTime}`;
        return readableTime;
    }

    const submit = () => {
        console.log("Submit!");
    }

    const test = () => {
        console.log("Test");
    }

    return (
    <div>
        <h1 className="flex justify-around">You are almost there!</h1>
        <div className="flex justify-around flex-row">
            <div className="relative bg-white px-2 pt-2 pb-2 shadow-xl w-fit ring-1 ring-gray-900/5 rounded-lg">
                <div> 
                <div className="grid grid-flow-col grid-rows-3 gap-2">
                <div class="row-span-3"><svg fill="#000000" height="125px" width="125px" version="1.2" baseProfile="tiny" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 256 256" xml:space="preserve" transform="matrix(1, 0, 0, 1, 0, 0)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="5.12"></g><g id="SVGRepo_iconCarrier"> <path id="XMLID_1_" d="M122.2,68.1c-13.1,0-23.8-10.6-23.8-23.8s10.7-23.8,23.8-23.8c13.2,0,23.8,10.6,23.8,23.8 S135.3,68.1,122.2,68.1 M194.7,228.7H4.9c-5.3,0-4.8,4.2-4.8,4.2v7c0,0-0.5,9.1,8.9,9.1h237.7c9.4,0,8.9-8.9,8.9-8.9v-19.4 c0,0-0.8-6.1-8-6.1h-23.2C216.4,214.7,209.9,228.7,194.7,228.7 M213.2,185.8c0,11.8,9.6,21.4,21.5,21.4c11.8,0,21.5-9.6,21.5-21.4 c0-11.9-9.6-21.4-21.5-21.4C222.8,164.4,213.2,174,213.2,185.8 M143.1,145c-1.4,4.3-4.6,7.8-9.2,9.5l-19.1,7.1l7,7h32.2l0-49.4 l-10.8,25.5C143.3,144.8,143.2,144.9,143.1,145 M189.4,180.3h-66.7l-16.1-15.7l-11.2,4.1c-8.3,3-18.4-1.6-21.5-9.8 c-1.8-5.1-1.6-10.8,1.5-15c-1.4-0.1-40.4,0-40.4,0c-6.5,0-11.8,5.2-11.8,11.7c0,6.5,5.3,11.6,11.8,11.6h39.8l15.8,23.9l-81.4,6.6 c-5.2,1.2-9.1,5.9-9.1,11.4c0,6.5,5.2,11.8,11.7,11.8l91.4,0c-1.6-2.6-2.6-5.6-2.6-8.8c0-9.3,7.6-16.9,16.9-16.9H154l29.6-6.2 l1.6,7.9l-30.4,6.4h-37.4c-4.9,0-8.8,3.9-8.8,8.8c0,4.8,3.9,8.7,8.6,8.8l72.3,0c11.2-0.1,20.2-9.1,20.2-20.3 C209.7,189.4,200.7,180.3,189.4,180.3 M130.8,147.9c2.4-0.9,4.4-2.8,5.4-5.1L153,102c3.7-9.4,0.2-27.6-18-27.6h-32.1 c-8.9,0-13.7,3.4-15.8,5.5c-1.6,1.6-51.6,56.5-51.6,56.5l28.6,0l25.3-27.6V135l25.8-9.5l8.9-21.4l6.8,2.5l-10.5,25l-33.9,12.8 c-4.7,2.1-6.9,7.6-4.8,12.3c2.1,4.7,7.6,6.8,12.3,4.8L130.8,147.9z"></path> </g></svg></div>
                <div class="col-span-2">Here is your tentative appointment.</div>
                    <div className="col-span-2 row-span-2">
                        <div className="grid grid-flow-row grid-cols-2 text-xs auto-rows-min">
                            <p className="text-right pe-2 ">Name:</p>
                            <p>{userContext.appointment.appointmentFirstName + " " + userContext.appointment.appointmentLastName}</p>
                            <p className="text-right pe-2 ">Reason:</p>
                            <p>{userContext.appointment.serviceName}</p>
                            <p className="text-right pe-2 ">With:</p>
                            <p>{userContext.appointment.employeeFirstName + " " + userContext.appointment.employeeMiddleName + " " + userContext.appointment.employeeLastName}</p>
                            <p className="text-right pe-2 ">Requested Date:</p>
                            <p>{dateToReadableDateString(userContext.appointment.appointmentBeginTime)}</p>
                            <p className="text-right pe-2 ">Requested Time:</p>
                            <p>{dateToReadableTimeString(userContext.appointment.appointmentBeginTime) + " - " + dateToReadableTimeString(userContext.appointment.appointmentEndTime)}</p>
                        </div>
                    </div>
                </div>
                <div className="flex justify-around py-2">
                    <button
                        onClick={submit}
                        type="button"
                        className="inline-flex items-center px-8 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-npt_colors-350 hover:bg-npt_colors-10 hover:text-black first-line:transition ease-in-out duration-150 cursor-pointer">
                        Looks Good!
                    </button>
                    <svg className="hover:shadow-xl hover:ring-gray-900/5 hover:bg-npt_colors-10 hover:rounded-lg bg-npt_colors-350 rounded-lg first-line:transition ease-in-out duration-150 cursor-pointer" onClick={test} width="40px" height="40px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M20 14V7C20 5.34315 18.6569 4 17 4H12M20 14L13.5 20M20 14H15.5C14.3954 14 13.5 14.8954 13.5 16V20M13.5 20H7C5.34315 20 4 18.6569 4 17V12" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M7 4V7M7 10V7M7 7H4M7 7H10" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                </div>
                <div className="">
                    <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    id="message"
                    rows="4"
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-200 rounded-lg border border-gray-300 focus:ring-npt_colors-30 focus:border-npt_colors-30 "
                    placeholder="Write your note here..."
                    ></textarea>
                </div>
            </div>
            </div>
        </div>


        
        <ContinueBack goBack={goBack} onContinue={onContinue} continueDisabled={true}/>
    </div>
  )
}

export default Notes;
