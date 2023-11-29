import React, { useState, useEffect, useContext } from "react";
import DataField from "./DataField";
import { AuthContext } from "../contexts/context";
import ApiError from "../components/ApiError";
import { adminGetOffices } from "../axios/api";

const EmployeeOffice = (props) => {
  const {
    office,
    employeeId,
    updateEmployeeOffice,
    setChangeDetected,
    changeDetected,
  } = props;
  const [offices, setOffices] = useState([]);
  const authContext = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [hasApiError, setHasApiError] = useState(false);

  useEffect(() => {
    fetchOffices();
  }, []);

  async function fetchOffices() {
    try {
      setLoading(true);
      const data = await adminGetOffices(authContext.token);
      setOffices(data);
      // console.log(JSON.stringify(data));
      setHasApiError(false);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setHasApiError(true);
      setChangeDetected(false);
      // console.log("There was an error fetching the website data.");
      console.error("Error loading offices:", error);
    }
  }

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
      <div>{hasApiError ? <ApiError /> : <></>}</div>
    </div>
  );
};

export default EmployeeOffice;
