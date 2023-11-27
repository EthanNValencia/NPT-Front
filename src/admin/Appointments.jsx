import React, { useState, useContext } from "react";
import { AuthContext } from "../contexts/context";
import NssButton from "../nss/NssButton";
import ApiError from "../components/ApiError";
import DataField from "./DataField";
import {
  adminNotifyAppointment,
  adminNotifyByEmailAppointment,
} from "../axios/api";
import NptEmail from "../emails/NptEmail";
import NssEmail from "../emails/NssEmail";
import { render } from "@react-email/render";
import NptEmail002 from "../emails/NptEmail002";

function Appointments(props) {
  const { appointments, updateParentAppointments, employeeIndex } = props;
  const [newAppointments, setNewAppointments] = useState([...appointments]);
  const [hasApiError, setHasApiError] = useState(false);
  const authContext = useContext(AuthContext);

  const Appointment = (props) => {
    const { appointment, index, employeeIndex, updateParentAppointments } =
      props;
    const [newAppointment, setNewAppointment] = useState({ ...appointment });

    const onApproveAppointment = () => {
      console.log("onApproveAppointment");
    };

    const onNotify = () => {
      console.log("onNotify");
    };

    // Do this when a change happens here.
    const onUpdate = () => {
      updateParentAppointments(newAppointment, index, employeeIndex);
    };

    const onEmail = () => {
      const emailHtml = render(<NssEmail test={"Test"} />);
      // const emailHtml = render(<NptEmail devMode={true} />);
      // const emailHtml = render(<NptEmail002 body="Test body" heading="Test heading" />);
      console.log(emailHtml);

      adminNotifyByEmailAppointment(
        newAppointment,
        emailHtml,
        authContext.token
      );
      console.log("onEmail");
      // console.log(otherEmailHtml);
    };
    // setShowEditEmployee
    return (
      <div
        key={index}
        className="bg-nss-21 border-2 rounded-lg shadow-xl py-2 px-2"
      >
        <div>
          <div className="">
            <div className="">
              <div className=" grid grid-cols-2">
                <div>
                  <div className="text-xs font-bold">First Name:</div>
                  <div className="text-sm">
                    <DataField value={newAppointment.firstName} />
                  </div>
                </div>
                <div>
                  <div className="text-xs font-bold">Last Name:</div>
                  <div className="text-sm">
                    <DataField value={newAppointment.lastName} />
                  </div>
                </div>
              </div>

              <div className=" grid grid-cols-2">
                <div>
                  <div className="text-xs font-bold">Phone Number:</div>
                  <div className="text-sm">
                    <DataField value={newAppointment.phoneNumber} />
                  </div>
                </div>
                <div>
                  <div className="text-xs font-bold">Email:</div>
                  <div className="text-sm">
                    <DataField value={newAppointment.email} />
                  </div>
                </div>
              </div>

              <div className=" grid grid-cols-2">
                <div>
                  <div className="text-xs font-bold">Begin Time:</div>
                  <div className="text-sm">
                    <DataField value={newAppointment.beginTime} />
                  </div>
                </div>
                <div>
                  <div className="text-xs font-bold">End Time:</div>
                  <div className="text-sm">
                    <DataField value={newAppointment.endTime} />
                  </div>
                </div>
              </div>
            </div>

            <div className="pb-2">
              <div className="text-xs font-bold">Notes:</div>
              <div className="text-sm">
                <DataField value={newAppointment.notes} />
              </div>
            </div>
          </div>
          <div className="flex content-between">
            <div className="flex gap-2">
              <NssButton
                onClick={onApproveAppointment}
                label="Approve Appointment"
                disabled={true}
              ></NssButton>
              <NssButton
                onClick={onNotify}
                label="Notify"
                disabled={true}
              ></NssButton>
              <NssButton
                onClick={onEmail}
                label="Email"
                disabled={false}
              ></NssButton>
            </div>
            <div className="flex gap-2"></div>
          </div>
        </div>
      </div>
    );
  };

  // "appointmentApproved":false,"emailSent":false,"smsSent":false,"appointmentModified":false,"appointmentModifiedApproved":false

  return (
    <div className="bg-nss-21 border-2 rounded-lg shadow-xl py-2 px-2 mt-2 gap-2 grid grid-cols-3">
      {newAppointments.length > 0 ? (
        newAppointments.map((appointment, index) => (
          <Appointment
            key={index}
            appointment={appointment}
            updateParentAppointments={updateParentAppointments}
            employeeIndex={employeeIndex}
          />
        ))
      ) : (
        <div>There are no appointments to show.</div>
      )}
      <div>{hasApiError ? <ApiError /> : <></>}</div>
    </div>
  );
}

export default Appointments;
