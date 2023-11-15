import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../contexts/context";
import {
  adminGetServices,
  adminPutServices,
  adminDeleteService,
} from "../axios/api";
import NssButton from "../nss/NssButton";
import ApiError from "../components/ApiError";
import DataField from "./DataField";

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

  async function updateServices() {
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
    updateServices();
  };

  const reloadServices = () => {
    fetchServices();
  };

  return (
    <div
      className={`${pickDivColor()} border rounded-lg shadow-xl py-2 px-2 my-2`}
    >
      <div className="flex gap-2 py-2">
        <NssButton onClick={newService} label="New Service"></NssButton>
        <NssButton onClick={reloadServices} label="Reload Services"></NssButton>
      </div>
      Services
      <div>
        <div className="grid grid-cols-6 gap-2">
          {services.map((service, index) => (
            <Service
              key={index}
              service={service}
              index={index}
              setChangeDetected={setChangeDetected}
              deleteService={deleteService}
              undefined={!service.id || !service.name}
            />
          ))}
        </div>
        <div>{hasApiError ? <ApiError /> : <></>}</div>
        <div className="flex gap-2 pt-2 justify-between">
          <div>
            <NssButton onClick={saveServices} label="Save Services"></NssButton>
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
  const { service, index, setChangeDetected, deleteService, undefined } = props;
  const [newService, setNewService] = useState({ ...service });
  const [editMode, setEditMode] = useState(undefined);

  const editService = () => {
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

  return (
    <div>
      <div
        key={index}
        className={`${pickDivColor()} border rounded-lg shadow-xl py-2 px-2`}
      >
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
                setChangeDetected(true);
              }}
            />
          ) : (
            <DataField value={newService.name} />
          )}
        </div>
        <div className="flex gap-2 justify-between pt-2">
          <NssButton onClick={editService} label="Edit"></NssButton>
          <NssButton
            onClick={deleteThisService}
            label="Delete"
            disabled={service.id == null}
          ></NssButton>
        </div>
      </div>
    </div>
  );
}

export default ServicesAdmin;
