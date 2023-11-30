import React, { useState, useEffect, useContext } from "react";
import DataField from "./DataField";
import { AuthContext } from "../contexts/context";
import ApiError from "../components/ApiError";
import { adminGetOffices } from "../axios/api";

const EmployeeOffice = (props) => {
  const { office, updateEmployeeOffice, setChangeDetected } = props;
  const [selectedOffice, setSelectedOffice] = useState({ ...office });
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
      // setOffices(data);
      orderAndSetOffices(data);
      setHasApiError(false);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setHasApiError(true);
      setChangeDetected(false);
      console.error("Error loading offices:", error);
    }
  }

  const orderAndSetOffices = (offices) => {
    const removeElementFromArray = offices.filter(
      (office) => selectedOffice.officeId != office.officeId
    );
    const orderedOfficeArray = [
      { ...selectedOffice },
      ...removeElementFromArray,
    ];
    setOffices(orderedOfficeArray);
  };

  const getOfficeStreetAddress = (office) => {
    const { street, unit, city, state, zip } = office;
    return `${street} ${unit ? unit + " " : ""}${city}, ${state} ${zip}`;
  };

  const handleSelectChange = (event) => {
    const selectedOffice = JSON.parse(event.target.value);
    setSelectedOffice(selectedOffice);
    updateEmployeeOffice(selectedOffice);
    setChangeDetected(true);
  };

  return (
    <div className="shadow-xl min-w-0 border-2 rounded-md p-2 mt-2">
      <div className="">
        <select
          id="selectInput"
          value={JSON.stringify(selectedOffice)}
          onChange={handleSelectChange}
          className="bg-nss-20 border border-nss-1 text-gray-900 text-sm rounded-lg focus:ring-nss-300 focus:border-nss-300 block w-full p-2.5"
        >
          {offices.map((office) => (
            <option key={office.officeId} value={JSON.stringify(office)}>
              {getOfficeStreetAddress(office)}
            </option>
          ))}
        </select>
      </div>
      <div>{hasApiError ? <ApiError /> : <></>}</div>
    </div>
  );
};

export default EmployeeOffice;

/*

<div>Office</div>
      <div className="flex flex-row gap-2">
        <div>
          <div className="text-xs font-bold">Street:</div>
          <div className="text-sm">
            <DataField value={selectedOffice.street} />
          </div>
        </div>
        <div>
          <div className="text-xs font-bold">Unit:</div>
          <div className="text-sm">
            <DataField value={selectedOffice.unit} />
          </div>
        </div>
        <div>
          <div className="text-xs font-bold">City:</div>
          <div className="text-sm">
            <DataField value={selectedOffice.city} />
          </div>
        </div>
        <div>
          <div className="text-xs font-bold">State:</div>
          <div className="text-sm">
            <DataField value={selectedOffice.state} />
          </div>
        </div>
        <div>
          <div className="text-xs font-bold">Zip:</div>
          <div className="text-sm">
            <DataField value={selectedOffice.zip} />
          </div>
        </div>
        <div>
          <div className="text-xs font-bold">Phone:</div>
          <div className="text-sm">
            <DataField value={selectedOffice.phone} />
          </div>
        </div>
        <div>
          <div className="text-xs font-bold">Fax:</div>
          <div className="text-sm">
            <DataField value={selectedOffice.fax} />
          </div>
        </div>
        <div>
          <div className="text-xs font-bold">Email:</div>
          <div className="text-sm">
            <DataField value={selectedOffice.email} />
          </div>
        </div>
      </div>

*/
