import React, { useState, useContext } from "react";
import { AuthContext } from "../contexts/context";
import ApiError from "../components/ApiError";
import NssButton from "../nss/NssButton";
import SocialMediaProfile from "./SocialMediaProfile";
import DataField from "./DataField";

function EmployeeAdminDiv(props) {
  const { employee, removeEmployee, index } = props;
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState(employee.id);
  const [hasApiError, setHasApiError] = useState(false);
  const [showSocialMedia, setShowSocialMedia] = useState(false);
  const [showSchedule, setShowSchedule] = useState(false);
  const [showOffice, setShowOffice] = useState(false);
  const [showEditEmployee, setShowEditEmployee] = useState(false);
  const authContext = useContext(AuthContext);

  const openSocialMediaProfile = () => {
    setShowSocialMedia(!showSocialMedia);
    setShowSchedule(false);
    setShowOffice(false);
  };

  const openSchedule = () => {
    setShowSocialMedia(false);
    setShowSchedule(!showSchedule);
    setShowOffice(false);
  };

  const openOffice = () => {
    setShowSocialMedia(false);
    setShowSchedule(false);
    setShowOffice(!showOffice);
  };

  const onEditEmployee = () => {
    setShowEditEmployee(!showEditEmployee);
  };

  const onSaveEmployee = () => {
    console.log("Save!");
  };

  const onDeleteEmployee = () => {
    console.log("Delete!");
  };

  const DailyScheduleCard = (props) => {
    const { dailySchedule, index, employeeId } = props;
    return (
      <div key={index} className="w-44">
        <div className="text-center">{dailySchedule.day}</div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <div className="text-xs font-bold">Begin Time:</div>
            <div className="text-sm">{dailySchedule.beginTime}</div>
          </div>
          <div>
            <div className="text-xs font-bold">End Time:</div>
            <div className="text-sm">{dailySchedule.endTime}</div>
          </div>
        </div>
      </div>
    );
  };

  const Schedule = (props) => {
    const { schedule, employeeId } = props;

    const sortedSchedule = schedule.sort((a, b) => {
      const dayOrder = {
        Sun: 0,
        Mon: 1,
        Tue: 2,
        Wed: 3,
        Thu: 4,
        Fri: 5,
        Sat: 6,
      };
      return dayOrder[a.day] - dayOrder[b.day];
    });

    return (
      <div>
        <div className=" shadow-xl min-w-0 border-2 rounded-md mt-2">
          <div className="overflow-x-auto flex p-4 gap-2">
            {sortedSchedule.map((dailySchedule, index) => (
              <DailyScheduleCard
                dailySchedule={dailySchedule}
                index={index}
                employeeId={employeeId}
              />
            ))}
          </div>
        </div>
      </div>
    );
  };

  const Office = (props) => {
    const { office, employeeId } = props;

    return (
      <div className="shadow-xl min-w-0 border-2 rounded-md p-2 mt-2">
        <div>Office</div>
        <div className="flex flex-row gap-2">
          <div>
            <div className="text-xs font-bold">Street:</div>
            <div className="text-sm">
              <DataField value={office.street} />
            </div>
          </div>
          <div>
            <div className="text-xs font-bold">Unit:</div>
            <div className="text-sm">
              <DataField value={office.unit} />
            </div>
          </div>
          <div>
            <div className="text-xs font-bold">City:</div>
            <div className="text-sm">
              <DataField value={office.city} />
            </div>
          </div>
          <div>
            <div className="text-xs font-bold">State:</div>
            <div className="text-sm">
              <DataField value={office.state} />
            </div>
          </div>
          <div>
            <div className="text-xs font-bold">Zip:</div>
            <div className="text-sm">
              <DataField value={office.zip} />
            </div>
          </div>
          <div>
            <div className="text-xs font-bold">Phone:</div>
            <div className="text-sm">
              <DataField value={office.phone} />
            </div>
          </div>
          <div>
            <div className="text-xs font-bold">Fax:</div>
            <div className="text-sm">
              <DataField value={office.fax} />
            </div>
          </div>
          <div>
            <div className="text-xs font-bold">Email:</div>
            <div className="text-sm">
              <DataField value={office.email} />
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-nss-21 border rounded-lg shadow-xl py-2 px-2 my-2">
      <div>Employee {index}</div>
      <div className="grid grid-cols-3">
        <div>
          <div className="text-xs font-bold">First Name:</div>
          <div className="text-sm">
            <DataField value={employee.firstName} />
          </div>
        </div>
        <div>
          <div className="text-xs font-bold">Middle Name:</div>
          <div className="text-sm">
            <DataField value={employee.middleName} />
          </div>
        </div>
        <div>
          <div className="text-xs font-bold">Last Name:</div>
          <div className="text-sm">
            <DataField value={employee.lastName} />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3">
        <div>
          <div className="text-xs font-bold">Role:</div>
          <div className="text-sm">
            <DataField value={employee.role} />
          </div>
        </div>
        <div>
          <div className="text-xs font-bold">Role Id:</div>
          <div className="text-sm">
            <DataField value={employee.role_id} />
          </div>
        </div>
        <div>
          <div className="text-xs font-bold">Meta:</div>
          <div className="text-sm">
            <DataField value={employee.meta} />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3">
        <div>
          <div className="text-xs font-bold">Email:</div>
          <div className="text-sm">
            <DataField value={employee.email} />
          </div>
        </div>
        <div>
          <div className="text-xs font-bold">Work Phone:</div>
          <div className="text-sm">
            <DataField value={employee.workPhone} />
          </div>
        </div>
        <div>
          <div className="text-xs font-bold">Personal Phone:</div>
          <div className="text-sm">
            <DataField value={employee.personalPhone} />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3">
        <div>
          <div className="text-xs font-bold">Img:</div>
          <div className="text-sm">
            <DataField value={employee.img} />
          </div>
        </div>
        <div>
          <div className="text-xs font-bold">Subject:</div>
          <div className="text-sm">
            <DataField value={employee.subject} />
          </div>
        </div>
        <div>
          <div className="text-xs font-bold">Possessive:</div>
          <div className="text-sm">
            <DataField value={employee.possessive} />
          </div>
        </div>
      </div>
      <div className="flex justify-between">
        <div className="flex gap-2">
          <NssButton
            onClick={openSocialMediaProfile}
            label="Social Media Profile"
          ></NssButton>
          <NssButton onClick={openSchedule} label="Daily Schedule"></NssButton>
          <NssButton onClick={openOffice} label="Office"></NssButton>
        </div>

        <div className="flex gap-2">
          <NssButton
            onClick={onDeleteEmployee}
            label="Delete Employee"
          ></NssButton>
          <NssButton onClick={onEditEmployee} label="Edit Employee"></NssButton>
          <NssButton onClick={onSaveEmployee} label="Save Employee"></NssButton>
        </div>
      </div>
      <div>
        {showSocialMedia ? (
          <SocialMediaProfile
            socialMediaProfile={employee.employeeSocialMedialProfile}
            parentId={employee.id}
          />
        ) : (
          <></>
        )}
      </div>
      {showSchedule ? (
        <Schedule schedule={employee.schedule} employeeId={employee.id} />
      ) : (
        <></>
      )}
      {showOffice ? (
        <Office office={employee.office} employeeId={employee.id} />
      ) : (
        <></>
      )}
      <div>{hasApiError ? <ApiError /> : <></>}</div>
    </div>
  );
}

export default EmployeeAdminDiv;
