import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../contexts/context";
import {
  adminGetServices,
  adminPutServices,
  adminDeleteService,
} from "../axios/api";
import ApiError from "../components/ApiError";
import DataField from "./DataField";
import ToolTipAdmin from "./ToolTipAdmin";
import NssButtonAdd from "../nss/NssButtonAdd";
import NssButtonSubtract from "../nss/NssButtonSubtract";
import NssButtonEdit from "../nss/NssButtonEdit";
import NssButtonReload from "../nss/NssButtonReload";
import NssButtonSave from "../nss/NssButtonSave";

function ServicesAdmin() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasApiError, setHasApiError] = useState(false);
  const [changeDetected, setChangeDetected] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const authContext = useContext(AuthContext);

  const newService = () => {
    const newService = {
      name: "",
      employees: [],
    };
    const updatedServices = [...services, { ...newService }];
    setServices(updatedServices);
    setChangeDetected(true);
  };

  useEffect(() => {
    fetchServices();
  }, []);

  async function fetchServices() {
    try {
      setLoading(true);
      const data = await adminGetServices(authContext.token);
      setServices(data);
      // console.log(JSON.stringify(data));
      setHasApiError(false);
      setLoading(false);
      setChangeDetected(false);
    } catch (error) {
      setLoading(false);
      setHasApiError(true);
      setChangeDetected(false);
      console.log("There was an error fetching the website data.");
      // console.error("Error loading employees:", error);
    }
  }

  const removeServiceFromArray = (service) => {
    const updatedServicesArray = services.filter((s) => s.id !== service.id);
    setServices(updatedServicesArray);
  };

  async function deleteService(service) {
    try {
      setLoading(true);
      const data = await adminDeleteService(service.id, authContext.token);
      // setServices(data);
      // console.log(JSON.stringify(data));
      removeServiceFromArray(service);
      setHasApiError(false);
      setLoading(false);
      setChangeDetected(false);
    } catch (error) {
      setLoading(false);
      setHasApiError(true);
      setChangeDetected(false);
      console.log("There was an error fetching the website data.");
      // console.error("Error loading employees:", error);
    }
  }

  async function putServices() {
    try {
      setLoading(true);
      const data = await adminPutServices(services, authContext.token);
      setServices(data);
      // console.log(JSON.stringify(data));
      setHasApiError(false);
      setLoading(false);
      setChangeDetected(false);
    } catch (error) {
      setLoading(false);
      setHasApiError(true);
      setChangeDetected(false);
      console.log("There was an error fetching the website data.");
      // console.error("Error loading employees:", error);
    }
  }

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

  const saveServices = () => {
    putServices();
  };

  const reloadServices = () => {
    fetchServices();
  };

  const updateServices = (service, index) => {
    const newServices = [...services];
    newServices[index] = { ...service };
    setServices(newServices);
  };

  return (
    <div
      className={`${pickDivColor()} border rounded-lg shadow-xl py-2 px-2 my-2`}
    >
      <div className="flex gap-2 py-2">
        <NssButtonAdd onClick={newService} label="New Service"></NssButtonAdd>
        <NssButtonReload
          onClick={reloadServices}
          label="Reload Services"
        ></NssButtonReload>
      </div>
      Services
      <div>
        <div className="grid 2xl:grid-cols-6 xl:grid-cols-4 md:grid-cols-2 gap-2">
          {services.map((service, index) => (
            <Service
              key={index}
              service={service}
              index={index}
              setChangeDetected={setChangeDetected}
              deleteService={deleteService}
              undefined={!service.id || !service.name}
              updateServices={updateServices}
            />
          ))}
        </div>
        <div>{hasApiError ? <ApiError /> : <></>}</div>
        <div className="flex gap-2 pt-2 justify-between">
          <div>
            <NssButtonSave
              animateBounce={changeDetected}
              onClick={saveServices}
              label="Save Services"
            ></NssButtonSave>
          </div>
          <div>
            <ReturnDisplayMessage />
          </div>
        </div>
      </div>
    </div>
  );
}

function Service(props) {
  const {
    service,
    index,
    setChangeDetected,
    deleteService,
    undefined,
    updateServices,
  } = props;
  const [newService, setNewService] = useState({ ...service });
  const [editMode, setEditMode] = useState(undefined);

  const editService = () => {
    if (editMode) {
      updateServices(newService, index);
      setChangeDetected(true);
    }

    setEditMode(!editMode);
  };

  const pickDivColor = () => {
    if (editMode) {
      return "border-r-2 border-yellow-600";
    }
  };

  const deleteThisService = () => {
    deleteService(newService);
  };

  const generateText = () => {
    if (newService.employees.length == 0) {
      return "You have no employees assigned to this service. Please assign an employee to this service.";
    } else if (newService.employees.length == 1) {
      return "You only have one employee assigned to this service. Does this service need more employees?";
    } else {
      return "This service has multiple employees providing it.";
    }
  };

  return (
    <div>
      <div
        key={index}
        className={`${pickDivColor()} border rounded-lg shadow-xl py-2 px-2`}
      >
        <div>
          <div className="flex justify-between">
            <div>
              <div className="text-xs pr-2">Service Name:</div>
              {editMode ? (
                <input
                  className="bg-nss-21 text-xs placeholder-red-600 shadow appearance-none border rounded w-full py-1 px-3 text-green-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="servicename"
                  type="text"
                  placeholder="Enter service name..."
                  value={newService.name}
                  onChange={(e) => {
                    const updatedService = { ...newService };
                    updatedService.name = e.target.value;
                    setNewService(updatedService);
                  }}
                />
              ) : (
                <DataField value={newService.name} />
              )}
            </div>
            <div>
              <div className="text-xs font-bold pr-2 inline-flex">
                Employees
                <ToolTipAdmin text={generateText()} />
              </div>
              <div className="text-xs pr-2 text-center font-bold">
                {newService.employees.length}
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-2 justify-between pt-2">
          <NssButtonEdit onClick={editService} label="Edit"></NssButtonEdit>
          <NssButtonSubtract
            onClick={deleteThisService}
            label="Delete"
            disabled={service.id == null || newService.employees.length >= 1}
          ></NssButtonSubtract>
        </div>
      </div>
    </div>
  );
}

export default ServicesAdmin;

/*

<div className="flex justify-end">
                <div>
                  <ToolTipAdmin />
                </div>
              </div>

*/
