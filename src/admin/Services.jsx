import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../contexts/context";
import { adminGetServices } from "../axios/api";
import NssButton from "../nss/NssButton";
import ApiError from "../components/ApiError";

function Services(props) {
  const authContext = useContext(AuthContext);
  const { services, setChangeDetected } = props;
  const [localEmployeeServices, setLocalEmployeeServices] = useState([
    ...services,
  ]);
  const [allServices, setAllServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasApiError, setHasApiError] = useState(false);

  useEffect(() => {
    fetchServices();
  }, []);

  async function fetchServices() {
    try {
      setLoading(true);
      const data = await adminGetServices(authContext.token);
      setAllServices(data);
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

  const removeService = (service) => {
    const newServices = localEmployeeServices.filter(
      (item) => item.name !== service.name
    );
    setLocalEmployeeServices(newServices);
    setChangeDetected(true);
  };

  const addService = (service) => {
    const newServices = [...localEmployeeServices, service];
    setLocalEmployeeServices(newServices);
    setChangeDetected(true);
  };

  const doesEmployeeHaveServiceName = (service) => {
    if (Array.isArray(localEmployeeServices)) {
      const hasMatch = localEmployeeServices.some(
        (obj) => obj.name === service.name
      );
      if (hasMatch) {
        return true;
      } else {
        return false;
      }
    }
  };

  return (
    <div>
      <div className="shadow-xl min-w-0 border-2 rounded-md p-2 mt-2">
        <div>Services</div>
        <div className="flex gap-2">
          {allServices.map((service, index) => (
            <Service
              service={service}
              index={index}
              includes={doesEmployeeHaveServiceName(service)}
              removeService={removeService}
              addService={addService}
            />
          ))}
        </div>
        <div>{hasApiError ? <ApiError /> : <></>}</div>
      </div>
    </div>
  );
}

function Service(props) {
  const { service, index, includes, removeService, addService } = props;

  const onClickButton = () => {
    console.log("includes: " + includes);
    if (includes) {
      removeService(service);
    } else {
      addService(service);
    }
  };

  return (
    <div key={index}>
      <NssButton
        onClick={onClickButton}
        label={service.name}
        selected={includes}
      ></NssButton>
    </div>
  );
}

export default Services;
