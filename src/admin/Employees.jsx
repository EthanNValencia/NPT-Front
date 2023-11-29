import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../contexts/context";
import ApiError from "../components/ApiError";
import SocialMediaProfile from "./SocialMediaProfile";
import DataField from "./DataField";
import Appointments from "./Appointments";
import ToolTip from "./ToolTip";
import {
  deleteEmployeeApi,
  updateEmployeeApi,
  adminGetEmployees,
} from "../axios/api";
import EmployeeServices from "./EmployeeServices";
import NssButtonChevron from "../nss/NssButtonChevron";
import NssButtonSave from "../nss/NssButtonSave";
import NssButtonEdit from "../nss/NssButtonEdit";
import NssButtonSubtract from "../nss/NssButtonSubtract";
import Texts from "./Texts";
import Schedule from "./Schedule";
import Dump from "./Dump";
import NssButtonReload from "../nss/NssButtonReload";
import NssButtonAdd from "../nss/NssButtonAdd";
import { NewEmployee } from "./Objects";
import EmployeeOffice from "./EmployeeOffice";

function Employees() {
  const [employees, setEmployees] = useState([]);
  const authContext = useContext(AuthContext);
  const [hasApiError, setHasApiError] = useState(false);

  useEffect(() => {
    fetchEmployees();
  }, []);

  async function fetchEmployees() {
    try {
      const data = await adminGetEmployees(authContext.token);
      setEmployees(data);
      // console.log(JSON.stringify(data[0]));
      setHasApiError(false);
    } catch (error) {
      setHasApiError(true);
    }
  }

  const loadEmployees = () => {
    fetchEmployees();
  };

  const updateEmployees = (employee, index) => {
    const updatedEmployeeObjects = [...employees];
    if (index >= 0 && index < updatedEmployeeObjects.length) {
      updatedEmployeeObjects[index] = employee;
      setEmployees(updatedEmployeeObjects);
    }
  };

  const createEmployee = () => {
    const newEmployee = { ...NewEmployee };
    setEmployees([newEmployee, ...employees]);
  };

  const removeEmployee = (employeeToRemove) => {
    const newEmployeeList = employees.filter(
      (employee) => employee.id !== employeeToRemove.id
    );
    setEmployees(newEmployeeList);
  };

  return (
    <div>
      <div className="flex justify-between">
        <div className="flex gap-2 py-2">
          <NssButtonAdd
            onClick={createEmployee}
            label="Create Employee"
          ></NssButtonAdd>
          <NssButtonReload
            onClick={loadEmployees}
            label="Reload Employees"
          ></NssButtonReload>
        </div>

        <div>
          <div className="text-xs font-bold pt-2">
            Number of Employees: {employees.length}
          </div>
        </div>
      </div>
      <div>
        {employees.map((employee, index) => (
          <div key={employee.id}>
            <Employee
              employee={employee}
              index={index}
              removeEmployee={removeEmployee}
              updateEmployees={updateEmployees}
            />
          </div>
        ))}
      </div>
      <div>{hasApiError ? <ApiError /> : <></>}</div>
    </div>
  );
}

function Employee(props) {
  const { employee, removeEmployee, index, updateEmployees } = props;
  const [localEmployee, setLocalEmployee] = useState({ ...employee });
  const [loading, setLoading] = useState(false);
  const [hasApiError, setHasApiError] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showSchedule, setShowSchedule] = useState(false);
  const [showDump, setShowDump] = useState(false);
  const [showOffice, setShowOffice] = useState(false);
  const [showServices, setShowServices] = useState(false);
  const [showBiography, setShowBiography] = useState(false);
  const [showInformation, setShowInformation] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [showAppointments, setShowAppointments] = useState(false);
  const [changeDetected, setChangeDetected] = useState(false);
  const authContext = useContext(AuthContext);

  const disableButton = () => {
    if (loading) {
      return true;
    }
    if (editMode) {
      return true;
    }
    if (changeDetected) {
      return false;
    }
    if (!changeDetected) {
      return true;
    }
  };

  const saveEmployee = async () => {
    if (changeDetected && !editMode) {
      try {
        setLoading(true);
        // id":21,"questionIsAnswered":true,"question":"When is my payment due? ","answer":"When appointment is made."}
        const updatedEmployee = await updateEmployeeApi(
          {
            ...localEmployee,
          },
          authContext.token
        );
        // Id should remain the same.
        setLocalEmployee(updatedEmployee);
        updateEmployees(updatedEmployee, index);
        setHasApiError(false);
        setLoading(false);
        setChangeDetected(false);
      } catch (error) {
        setLoading(false);
        setHasApiError(true);
      }
    }
  };

  const openProfile = () => {
    setShowProfile(!showProfile);
    setShowSchedule(false);
    setShowOffice(false);
    setShowAppointments(false);
    setShowServices(false);
    setShowDump(false);
    setShowBiography(false);
    setShowInformation(false);
  };

  const openSchedule = () => {
    setShowProfile(false);
    setShowSchedule(!showSchedule);
    setShowOffice(false);
    setShowAppointments(false);
    setShowServices(false);
    setShowDump(false);
    setShowBiography(false);
    setShowInformation(false);
  };

  const openOffice = () => {
    setShowProfile(false);
    setShowSchedule(false);
    setShowOffice(!showOffice);
    setShowAppointments(false);
    setShowServices(false);
    setShowDump(false);
    setShowBiography(false);
    setShowInformation(false);
  };

  const openAppointments = () => {
    setShowProfile(false);
    setShowSchedule(false);
    setShowOffice(false);
    setShowAppointments(!showAppointments);
    setShowServices(false);
    setShowDump(false);
    setShowBiography(false);
    setShowInformation(false);
  };

  const openServices = () => {
    setShowProfile(false);
    setShowSchedule(false);
    setShowOffice(false);
    setShowAppointments(false);
    setShowServices(!showServices);
    setShowDump(false);
    setShowBiography(false);
    setShowInformation(false);
  };

  const openDump = () => {
    setShowProfile(false);
    setShowSchedule(false);
    setShowOffice(false);
    setShowAppointments(false);
    setShowServices(false);
    setShowDump(!showDump);
    setShowBiography(false);
    setShowInformation(false);
  };

  const openBiography = () => {
    setShowProfile(false);
    setShowSchedule(false);
    setShowOffice(false);
    setShowAppointments(false);
    setShowServices(false);
    setShowDump(false);
    setShowBiography(!showBiography);
    setShowInformation(false);
  };

  const openInformation = () => {
    setShowProfile(false);
    setShowSchedule(false);
    setShowOffice(false);
    setShowAppointments(false);
    setShowServices(false);
    setShowDump(false);
    setShowBiography(false);
    setShowInformation(!showInformation);
  };

  const onEditEmployee = () => {
    setEditMode(!editMode);
  };

  const onSaveEmployee = () => {
    saveEmployee();
  };

  const onDeleteEmployee = () => {
    console.log("Delete!");
  };

  const updateAppointments = (appointment, appointmentIndex, employeeIndex) => {
    console.log("Update appointments!");
  };

  const copyProfileToParent = (profile) => {
    const updatedEmployee = { ...localEmployee };
    updatedEmployee.profile = profile;
    setLocalEmployee(updatedEmployee);
    updateEmployees(updatedEmployee, index);
  };

  const updateServices = (services) => {
    const updatedEmployee = { ...localEmployee };
    updatedEmployee.services = services;
    setLocalEmployee(updatedEmployee);
    updateEmployees(updatedEmployee, index);
  };

  const updateBiographicalTexts = (biographicalTexts) => {
    const updatedEmployee = { ...localEmployee };
    updatedEmployee.biographicalTexts = biographicalTexts;
    setLocalEmployee(updatedEmployee);
  };

  const updateInformationalTexts = (informationalTexts) => {
    const updatedEmployee = { ...localEmployee };
    updatedEmployee.informationalTexts = informationalTexts;
    setLocalEmployee(updatedEmployee);
  };

  const updateEmployeeOffice = (office) => {
    const updatedEmployee = { ...localEmployee };
    updatedEmployee.office = office;
    setLocalEmployee(updatedEmployee);
  };

  const ReturnDisplayMessage = () => {
    if (loading) {
      return <div>Your changes are being submitted...</div>;
    }
    if (editMode) {
      return (
        <div className="text-yellow-400 font-bold pt-2 animate-pulse">
          Edit mode is on.
        </div>
      );
    }
    if (changeDetected) {
      return (
        <div className="text-yellow-400 font-bold pt-2">
          A change was detected. Do not forget to save.
        </div>
      );
    }
    if (!changeDetected) {
      return (
        <div className="text-green-700 font-bold pt-2">
          No changes detected.
        </div>
      );
    }
  };

  const pickDivColor = () => {
    if (loading) {
      return "border-r-8 border-red-400 animate-pulse";
    }
    if (editMode) {
      return "border-r-8 border-yellow-600";
    }
    if (changeDetected) {
      return "border-r-8 border-yellow-600";
    }
    if (!changeDetected) {
      return "border-r-8 border-green-600";
    }
  };

  return (
    <div
      className={`${pickDivColor()} border rounded-lg shadow-xl pt-2 pb-2 pl-2 my-2`}
    >
      <div className="grid grid-cols-3">
        <div
          className="bg-nss-20 border p-2 mr-2 
        rounded-md"
        >
          <div className="grid grid-flow-col grid-cols-2">
            <div className="text-xs font-bold">First Name:</div>
            <div className="">
              <ToolTip text={"Examples: Tina, Scott, Jeffrey"} />
            </div>
          </div>
          <div className="text-sm pr-2">
            {editMode ? (
              <input
                className="bg-nss-21 text-xs placeholder-red-600 shadow appearance-none border rounded w-full py-1 px-3 text-green-700 leading-tight focus:outline-none focus:shadow-outline"
                id="firstname"
                type="text"
                placeholder="Enter employee first name..."
                value={localEmployee.firstName}
                onChange={(e) => {
                  const updatedEmployee = { ...localEmployee };
                  updatedEmployee.firstName = e.target.value;
                  setLocalEmployee(updatedEmployee);
                  setChangeDetected(true);
                }}
              />
            ) : (
              <DataField value={localEmployee.firstName} />
            )}
          </div>
        </div>
        <div className="bg-nss-20 border p-2 mr-2 rounded-md">
          <div className="grid grid-flow-col grid-cols-2">
            <div className="text-xs font-bold">Middle Name:</div>
            <div>
              <ToolTip text={"Optional Field. Examples: T, Marie"} />
            </div>
          </div>
          <div className="text-sm pr-2">
            {editMode ? (
              <input
                className="bg-nss-21 text-xs placeholder-red-600 text-green-700 shadow appearance-none border rounded w-full py-1 px-3 leading-tight focus:outline-none focus:shadow-outline"
                id="middlename"
                type="text"
                placeholder="Enter employee middle name..."
                value={localEmployee.middleName}
                onChange={(e) => {
                  const updatedEmployee = { ...localEmployee };
                  updatedEmployee.middleName = e.target.value;
                  setLocalEmployee(updatedEmployee);
                  setChangeDetected(true);
                }}
              />
            ) : (
              <DataField value={localEmployee.middleName} />
            )}
          </div>
        </div>
        <div className="bg-nss-20 border p-2 mr-2 rounded-md">
          <div className="grid grid-flow-col grid-cols-2">
            <div className="text-xs font-bold">Last Name:</div>
            <div>
              <ToolTip text={"Examples: Smith, Nephew, Epstein"} />
            </div>
          </div>
          <div className="text-sm pr-2">
            {editMode ? (
              <input
                className="bg-nss-21 text-xs placeholder-red-600 shadow appearance-none border rounded w-full py-1 px-3 text-green-700 leading-tight focus:outline-none focus:shadow-outline"
                id="lastname"
                type="text"
                placeholder="Enter employee last name..."
                value={localEmployee.lastName}
                onChange={(e) => {
                  const updatedEmployee = { ...localEmployee };
                  updatedEmployee.lastName = e.target.value;
                  setLocalEmployee(updatedEmployee);
                  setChangeDetected(true);
                }}
              />
            ) : (
              <DataField value={localEmployee.lastName} />
            )}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 py-2">
        <div className="bg-nss-20 border p-2 mr-2 rounded-md">
          <div className="grid grid-flow-col grid-cols-2">
            <div className="text-xs font-bold">Role:</div>
            <div>
              <ToolTip text={"Examples: Physical Therapist, Receptionist"} />
            </div>
          </div>
          <div className="text-sm pr-2">
            {editMode ? (
              <input
                className="bg-nss-21 text-xs placeholder-red-600 shadow appearance-none border rounded w-full py-1 px-3 text-green-700 leading-tight focus:outline-none focus:shadow-outline"
                id="role"
                type="text"
                placeholder="Enter employee role..."
                value={localEmployee.role}
                onChange={(e) => {
                  const updatedEmployee = { ...localEmployee };
                  updatedEmployee.role = e.target.value;
                  setLocalEmployee(updatedEmployee);
                  setChangeDetected(true);
                }}
              />
            ) : (
              <DataField value={localEmployee.role} />
            )}
          </div>
        </div>
        <div className="bg-nss-20 border p-2 mr-2 rounded-md">
          <div className="grid grid-flow-col grid-cols-2">
            <div className="text-xs font-bold">Role:</div>
            <div>
              <ToolTip text={"Examples: RN, Stocker, PT, PTA"} />
            </div>
          </div>
          <div className="text-sm pr-2">
            {editMode ? (
              <input
                className="bg-nss-21 text-xs placeholder-red-600 shadow appearance-none border rounded w-full py-1 px-3 text-green-700 leading-tight focus:outline-none focus:shadow-outline"
                id="role_id"
                type="text"
                placeholder="Enter employee role id..."
                value={localEmployee.role_id}
                onChange={(e) => {
                  const updatedEmployee = { ...localEmployee };
                  updatedEmployee.role_id = e.target.value;
                  setLocalEmployee(updatedEmployee);
                  setChangeDetected(true);
                }}
              />
            ) : (
              <DataField value={localEmployee.role_id} />
            )}
          </div>
        </div>
        <div className="bg-nss-20 border p-2 mr-2 rounded-md">
          <div className="grid grid-flow-col grid-cols-2">
            <div className="text-xs font-bold">Meta:</div>
            <div>
              <ToolTip text={"Short description about the employee."} />
            </div>
          </div>
          <div className="text-sm pr-2">
            {editMode ? (
              <input
                className="bg-nss-21 text-xs placeholder-red-600 shadow appearance-none border rounded w-full py-1 px-3 text-green-700 leading-tight focus:outline-none focus:shadow-outline"
                id="meta"
                type="text"
                placeholder="Enter employee meta..."
                value={localEmployee.meta}
                onChange={(e) => {
                  const updatedEmployee = { ...localEmployee };
                  updatedEmployee.meta = e.target.value;
                  setLocalEmployee(updatedEmployee);
                  setChangeDetected(true);
                }}
              />
            ) : (
              <DataField value={localEmployee.meta} />
            )}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3">
        <div className="bg-nss-20 border p-2 mr-2 rounded-md">
          <div className="grid grid-flow-col grid-cols-2">
            <div className="text-xs font-bold">Email:</div>
            <div>
              <ToolTip text={"Employee work email address."} />
            </div>
          </div>
          <div className="text-sm pr-2">
            {editMode ? (
              <input
                className="bg-nss-21 text-xs placeholder-red-600 shadow appearance-none border rounded w-full py-1 px-3 text-green-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="text"
                placeholder="Enter employee email..."
                value={localEmployee.email}
                onChange={(e) => {
                  const updatedEmployee = { ...localEmployee };
                  updatedEmployee.email = e.target.value;
                  setLocalEmployee(updatedEmployee);
                  setChangeDetected(true);
                }}
              />
            ) : (
              <DataField value={localEmployee.email} />
            )}
          </div>
        </div>
        <div className="bg-nss-20 border p-2 mr-2 rounded-md">
          <div className="grid grid-flow-col grid-cols-2">
            <div className="text-xs font-bold">Work Phone:</div>
            <div>
              <ToolTip text={"Employee work phone number."} />
            </div>
          </div>
          <div className="text-sm pr-2">
            {editMode ? (
              <input
                className="bg-nss-21 text-xs placeholder-red-600 shadow appearance-none border rounded w-full py-1 px-3 text-green-700 leading-tight focus:outline-none focus:shadow-outline"
                id="workphone"
                type="text"
                placeholder="Enter employee work phone number..."
                value={localEmployee.workPhone}
                onChange={(e) => {
                  const updatedEmployee = { ...localEmployee };
                  updatedEmployee.workPhone = e.target.value;
                  setLocalEmployee(updatedEmployee);
                  setChangeDetected(true);
                }}
              />
            ) : (
              <DataField value={localEmployee.workPhone} />
            )}
          </div>
        </div>
        <div className="bg-nss-20 border p-2 mr-2 rounded-md">
          <div className="grid grid-flow-col grid-cols-2">
            <div className="text-xs font-bold">Personal Phone:</div>
            <div>
              <ToolTip text={"This is optional."} />
            </div>
          </div>
          <div className="text-sm pr-2">
            {editMode ? (
              <input
                className="bg-nss-21 text-xs placeholder-red-600 shadow appearance-none border rounded w-full py-1 px-3 text-green-700 leading-tight focus:outline-none focus:shadow-outline"
                id="personalPhone"
                type="text"
                placeholder="Enter employee personal phone number..."
                value={localEmployee.personalPhone}
                onChange={(e) => {
                  const updatedEmployee = { ...localEmployee };
                  updatedEmployee.personalPhone = e.target.value;
                  setLocalEmployee(updatedEmployee);
                  setChangeDetected(true);
                }}
              />
            ) : (
              <DataField value={localEmployee.personalPhone} />
            )}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 py-2">
        <div className="bg-nss-20 border p-2 mr-2 rounded-md">
          <div className="grid grid-flow-col grid-cols-2">
            <div className="text-xs font-bold">Img Url:</div>
            <div>
              <ToolTip text={"The url for the employee image."} />
            </div>
          </div>
          <div className="text-sm pr-2">
            {editMode ? (
              <input
                className="bg-nss-21 text-xs placeholder-red-600 shadow appearance-none border rounded w-full py-1 px-3 text-green-700 leading-tight focus:outline-none focus:shadow-outline"
                id="img"
                type="text"
                placeholder="Enter employee image url..."
                value={localEmployee.img}
                onChange={(e) => {
                  const updatedEmployee = { ...localEmployee };
                  updatedEmployee.img = e.target.value;
                  setLocalEmployee(updatedEmployee);
                  setChangeDetected(true);
                }}
              />
            ) : (
              <DataField value={localEmployee.img} />
            )}
          </div>
        </div>
        <div className="bg-nss-20 border p-2 mr-2 rounded-md">
          <div className="grid grid-flow-col grid-cols-2">
            <div className="text-xs font-bold">Subject:</div>
            <div>
              <ToolTip text={"Example: she, he"} />
            </div>
          </div>
          <div className="text-sm pr-2">
            {editMode ? (
              <input
                className="bg-nss-21 text-xs placeholder-red-600 shadow appearance-none border rounded w-full py-1 px-3 text-green-700 leading-tight focus:outline-none focus:shadow-outline"
                id="subject"
                type="text"
                placeholder="Enter employee subject..."
                value={localEmployee.subject}
                onChange={(e) => {
                  const updatedEmployee = { ...localEmployee };
                  updatedEmployee.subject = e.target.value;
                  setLocalEmployee(updatedEmployee);
                  setChangeDetected(true);
                }}
              />
            ) : (
              <DataField value={localEmployee.subject} />
            )}
          </div>
        </div>
        <div className="bg-nss-20 border p-2 mr-2 rounded-md">
          <div className="grid grid-flow-col grid-cols-2">
            <div className="text-xs font-bold">Possessive:</div>
            <div>
              <ToolTip text={"Example: her, him"} />
            </div>
          </div>
          <div className="text-sm pr-2">
            {editMode ? (
              <input
                className="bg-nss-21 text-xs placeholder-red-600 shadow appearance-none border rounded w-full py-1 px-3 text-green-700 leading-tight focus:outline-none focus:shadow-outline"
                id="possessive"
                type="text"
                placeholder="Enter employee possessive..."
                value={localEmployee.possessive}
                onChange={(e) => {
                  const updatedEmployee = { ...localEmployee };
                  updatedEmployee.possessive = e.target.value;
                  setLocalEmployee(updatedEmployee);
                  setChangeDetected(true);
                }}
              />
            ) : (
              <DataField value={localEmployee.possessive} />
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-between ">
        <div className="flex flex-col">
          <div className="flex gap-2 mb-2">
            <NssButtonSubtract
              onClick={onDeleteEmployee}
              disabled={false}
              label="Delete Employee"
            ></NssButtonSubtract>
            <NssButtonEdit
              onClick={onEditEmployee}
              label="Edit Employee"
              disabled={false}
            ></NssButtonEdit>
            <NssButtonSave
              onClick={onSaveEmployee}
              disabled={disableButton()}
              label="Save Employee"
            ></NssButtonSave>
          </div>
          <div className="flex gap-2 md:flex-col xl:flex-row">
            <div className="flex gap-2">
              <NssButtonChevron
                onClick={openProfile}
                label="Profile"
                selected={showProfile}
              ></NssButtonChevron>
              <NssButtonChevron
                onClick={openSchedule}
                label="Schedule"
                selected={showSchedule}
              ></NssButtonChevron>
              <NssButtonChevron
                onClick={openOffice}
                label="Office"
                selected={showOffice}
              ></NssButtonChevron>
              <NssButtonChevron
                onClick={openAppointments}
                label="Appointments"
                selected={showAppointments}
              ></NssButtonChevron>
            </div>
            <div className="flex gap-2">
              <NssButtonChevron
                onClick={openServices}
                label="Services"
                selected={showServices}
              ></NssButtonChevron>
              <NssButtonChevron
                onClick={openDump}
                label="Dump"
                selected={showDump}
              ></NssButtonChevron>
              <NssButtonChevron
                onClick={openBiography}
                label="Biography"
                selected={showBiography}
              ></NssButtonChevron>
              <NssButtonChevron
                onClick={openInformation}
                label="Information"
                selected={showInformation}
              ></NssButtonChevron>
            </div>
          </div>
        </div>
        <div className="pr-2">
          <ReturnDisplayMessage />
        </div>
      </div>
      <div>
        {showDump ? <Dump data={localEmployee} /> : <></>}
        {showProfile ? (
          <SocialMediaProfile
            socialMediaProfile={localEmployee.profile}
            parentIndex={index}
            loading={loading}
            setChangeDetected={setChangeDetected}
            copyProfileToParent={copyProfileToParent}
          />
        ) : (
          <></>
        )}
      </div>

      {showSchedule ? (
        <Schedule
          schedule={localEmployee.schedule}
          parentId={localEmployee.id}
        />
      ) : (
        <></>
      )}
      {showOffice ? (
        <EmployeeOffice
          office={localEmployee.office}
          employeeId={localEmployee.id}
          updateEmployeeOffice={updateEmployeeOffice}
          setChangeDetected={setChangeDetected}
        />
      ) : (
        <></>
      )}
      {showAppointments ? (
        <Appointments
          appointments={localEmployee.appointments}
          updateParentAppointments={updateAppointments}
          employeeIndex={index}
        />
      ) : (
        <></>
      )}
      {showServices ? (
        <EmployeeServices
          services={localEmployee.services}
          setChangeDetected={setChangeDetected}
          updateParentServices={updateServices}
        />
      ) : (
        <></>
      )}
      {showBiography ? (
        <Texts
          employeeId={localEmployee.id}
          parentTexts={localEmployee.biographicalTexts}
          setChangeDetected={setChangeDetected}
          updateTexts={updateBiographicalTexts}
          name={"Biography"}
        />
      ) : (
        <></>
      )}
      {showInformation ? (
        <Texts
          employeeId={localEmployee.id}
          parentTexts={localEmployee.informationalTexts}
          setChangeDetected={setChangeDetected}
          updateTexts={updateInformationalTexts}
          name={"Information"}
        />
      ) : (
        <></>
      )}
      <div>{hasApiError ? <ApiError /> : <></>}</div>
    </div>
  );
}

export default Employees;
