import React, { useState, useContext } from "react";
import { AuthContext } from "../contexts/context";
import NssButton from "../nss/NssButton";
import ApiError from "../components/ApiError";
import DataField from "./DataField";
import { adminNotifyAppointment } from "../axios/api";

function AppointmentsAdmin(props) {
  const { appointments, updateParentAppointments } = props;
  const [newAppointments, setNewAppointments] = useState([...appointments]);
  const [hasApiError, setHasApiError] = useState(false);
  const authContext = useContext(AuthContext);

  const Appointment = (props) => {
    const { appointment, index } = props;
    const [newAppointment, setNewAppointment] = useState({ ...appointment });

    const onApproveAppointment = () => {
      console.log("onApproveAppointment");
    };

    const onNotify = () => {
      console.log("onNotify");
    };

    return (
      <div
        key={index}
        className="bg-nss-21 border-2 rounded-lg shadow-xl py-2 px-2 mt-2"
      >
        <div>
          <div className="">
            <div className="">
              <div className="text-xs font-bold">First Name:</div>
              <div className="text-sm">
                <DataField value={newAppointment.firstName} />
              </div>
              <div className="text-xs font-bold">Last Name:</div>
              <div className="text-sm">
                <DataField value={newAppointment.lastName} />
              </div>
              <div className="text-xs font-bold">Phone Number:</div>
              <div className="text-sm">
                <DataField value={newAppointment.phoneNumber} />
              </div>
              <div className="text-xs font-bold">Email:</div>
              <div className="text-sm">
                <DataField value={newAppointment.email} />
              </div>
              <div className="text-xs font-bold">Begin Time:</div>
              <div className="text-sm">
                <DataField value={newAppointment.beginTime} />
              </div>
              <div className="text-xs font-bold">End Time:</div>
              <div className="text-sm">
                <DataField value={newAppointment.endTime} />
              </div>
            </div>
            <div className="text-xs font-bold">Notes:</div>
            <div className="text-sm">
              <DataField value={newAppointment.notes} />
            </div>
          </div>
          <div className="flex content-between">
            <div className="flex gap-2">
              <NssButton
                onClick={onApproveAppointment}
                label="Approve Appointment"
                disabled={false}
              ></NssButton>
              <NssButton
                onClick={onNotify}
                label="Notify"
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
    <div className="bg-nss-21 border-2 rounded-lg shadow-xl py-2 px-2 mt-2">
      <div>AppointmentsAdmin</div>
      {newAppointments.map((appointment, index) => (
        <Appointment index={index} appointment={appointment} />
      ))}
      <div>{hasApiError ? <ApiError /> : <></>}</div>
    </div>
  );
}

export default AppointmentsAdmin;
