import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../contexts/context";
import ApiError from "../components/ApiError";
import { adminGetOffices } from "../axios/api";
import DataField from "./DataField";
import SocialMediaProfile from "./SocialMediaProfile";
import NssButtonChevron from "../nss/NssButtonChevron";

function Offices() {
  const [changeDetected, setChangeDetected] = useState(false);
  const authContext = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [hasApiError, setHasApiError] = useState(false);
  const [offices, setOffices] = useState([]);

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
      setChangeDetected(false);
    } catch (error) {
      setLoading(false);
      setHasApiError(true);
      setChangeDetected(false);
      // console.log("There was an error fetching the website data.");
      console.error("Error loading offices:", error);
    }
  }

  const updateOffice = (office, index) => {
    const updatedOffices = [...offices];
    if (index >= 0 && index < updatedOffices.length) {
      updatedOffices[index] = office;
      setOffices(updatedOffices);
    }
  };

  return (
    <div>
      {offices.map((office, index) => (
        <Office
          office={office}
          key={index}
          index={index}
          setChangeDetected={setChangeDetected}
          changeDetected={changeDetected}
          updateOffice={updateOffice}
          loading={loading}
        />
      ))}
      <div>{hasApiError ? <ApiError /> : <></>}</div>
    </div>
  );
}

function Office(props) {
  const {
    office,
    index,
    setChangeDetected,
    changeDetected,
    updateOffice,
    loading,
  } = props;
  const [localOffice, setLocalOffice] = useState({ ...office });
  const [editMode, setEditMode] = useState(false);
  const [showDump, setShowDump] = useState(false);
  const [showSchedule, setShowSchedule] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

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

  const openProfile = () => {
    setShowProfile(!showProfile);
    setShowSchedule(false);
  };
  const openSchedule = () => {
    setShowProfile(false);
    setShowSchedule(!showSchedule);
  };

  const copyProfileToParent = (profile) => {
    const updatedOffice = { ...office };
    office.socialMediaProfile = profile;
    setLocalOffice(updatedEmployee);
    updateOffice(updatedOffice, index);
  };

  return (
    <div>
      <div className="shadow-xl min-w-0 border-2 rounded-md p-2 mt-2">
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
          <div>
            <div className="text-xs font-bold">Accepting Walk-Ins:</div>
            <div className="text-sm">
              <DataField value={JSON.stringify(office.acceptingWalkIns)} />
            </div>
          </div>
          <div>
            <div className="text-xs font-bold">Map URL:</div>
            <div className="text-sm">
              <DataField value={office.mapUrl} />
            </div>
          </div>
          <div>
            <div className="text-xs font-bold">Number of Employees:</div>
            <div className="text-sm">
              <DataField value={office.employees.length} />
            </div>
          </div>
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
        </div>
        {showProfile ? (
          <SocialMediaProfile
            socialMediaProfile={office.officeSocialMedialProfile}
            parentIndex={index}
            loading={loading}
            setChangeDetected={setChangeDetected}
            copyProfileToParent={copyProfileToParent}
          />
        ) : (
          <></>
        )}
      </div>

      {JSON.stringify(office)}
    </div>
  );
}

/*

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

*/

export default Offices;
