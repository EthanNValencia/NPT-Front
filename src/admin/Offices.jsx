import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../contexts/context";
import ApiError from "../components/ApiError";
import { adminGetOffices, adminPostOffice } from "../axios/api";
import DataField from "./DataField";
import SocialMediaProfile from "./SocialMediaProfile";
import NssButtonChevron from "../nss/NssButtonChevron";
import Dump from "./Dump";
import Schedule from "./Schedule";
import NssButtonSave from "../nss/NssButtonSave";
import NssButtonEdit from "../nss/NssButtonEdit";
import NssButtonSubtract from "../nss/NssButtonSubtract";
import NssCheckbox from "../nss/NssCheckBox";
import NssButtonAdd from "../nss/NssButtonAdd";
import { NewOffice } from "./Objects";
import NssButtonReload from "../nss/NssButtonReload";

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

  const reloadOffices = () => {
    fetchOffices();
  };

  const updateOffice = (office, index) => {
    const updatedOffices = [...offices];
    if (index >= 0 && index < updatedOffices.length) {
      updatedOffices[index] = office;
      setOffices(updatedOffices);
    }
  };

  async function postOffice(office, index) {
    try {
      setLoading(true);
      const data = await adminPostOffice(office, authContext.token);
      updateOffice(data, index);
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

  const createOffice = () => {
    const updatedOffices = [...offices, { ...NewOffice }];
    setOffices(updatedOffices);
  };

  return (
    <div>
      <div className="flex gap-2 pt-2">
        <NssButtonAdd
          onClick={createOffice}
          label="Create Office"
        ></NssButtonAdd>
        <NssButtonReload
          onClick={reloadOffices}
          label="Reload Offices"
        ></NssButtonReload>
      </div>
      {offices.map((office, index) => (
        <Office
          office={office}
          key={office.id}
          index={index}
          setChangeDetected={setChangeDetected}
          changeDetected={changeDetected}
          updateOffice={updateOffice}
          loading={loading}
          setLoading={setLoading}
          postOffice={postOffice}
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
    postOffice,
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
    setShowDump(false);
  };
  const openSchedule = () => {
    setShowProfile(false);
    setShowSchedule(!showSchedule);
    setShowDump(false);
  };

  const openDump = () => {
    setShowProfile(false);
    setShowSchedule(false);
    setShowDump(!showDump);
  };

  const copyProfileToParent = (profile) => {
    const updatedOffice = { ...office };
    office.socialMediaProfile = profile;
    setLocalOffice(updatedOffice);
    updateOffice(updatedOffice, index);
  };

  const onDeleteOffice = () => {};

  const onEditOffice = () => {
    setEditMode(!editMode);
  };
  const onSaveOffice = () => {
    postOffice(localOffice, index);
  };

  const handleAcceptingWalkInsChange = () => {
    const updatedOffice = { ...localOffice };
    office.acceptingWalkIns = !office.acceptingWalkIns;
    setLocalOffice(updatedOffice);
    setChangeDetected(true);
  };

  return (
    <div className="pt-2">
      <div className="shadow-xl min-w-0 border-2 rounded-md px-2 pb-2">
        <div className="p-2">
          <div className="text-xs font-bold">
            Number of Employees at this Office: {localOffice.employees.length}
          </div>
        </div>
        <div className="grid 2xl:grid-cols-4 xl:grid-cols-2 md:grid-cols-1 gap-1 break-words">
          <div className="bg-nss-20 border p-2 rounded-md">
            <div className="text-xs font-bold">Street:</div>
            <div className="text-sm">
              {editMode ? (
                <input
                  className="bg-nss-21 text-xs placeholder-red-600 shadow appearance-none border rounded w-full py-1 px-3 text-green-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="street"
                  type="text"
                  placeholder="Enter office street..."
                  value={localOffice.street}
                  onChange={(e) => {
                    const updatedOffice = { ...localOffice };
                    updatedOffice.street = e.target.value;
                    setLocalOffice(updatedOffice);
                    setChangeDetected(true);
                  }}
                />
              ) : (
                <DataField value={localOffice.street} />
              )}
            </div>
          </div>
          <div className="bg-nss-20 border p-2 rounded-md">
            <div className="text-xs font-bold">Unit:</div>
            <div className="text-sm">
              {editMode ? (
                <input
                  className="bg-nss-21 text-xs placeholder-red-600 shadow appearance-none border rounded w-full py-1 px-3 text-green-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="unit"
                  type="text"
                  placeholder="Enter office unit..."
                  value={localOffice.unit}
                  onChange={(e) => {
                    const updatedOffice = { ...localOffice };
                    updatedOffice.unit = e.target.value;
                    setLocalOffice(updatedOffice);
                    setChangeDetected(true);
                  }}
                />
              ) : (
                <DataField value={localOffice.unit} />
              )}
            </div>
          </div>
          <div className="bg-nss-20 border p-2  rounded-md">
            <div className="text-xs font-bold">City:</div>
            <div className="text-sm">
              {editMode ? (
                <input
                  className="bg-nss-21 text-xs placeholder-red-600 shadow appearance-none border rounded w-full py-1 px-3 text-green-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="city"
                  type="text"
                  placeholder="Enter office city..."
                  value={localOffice.city}
                  onChange={(e) => {
                    const updatedOffice = { ...localOffice };
                    updatedOffice.city = e.target.value;
                    setLocalOffice(updatedOffice);
                    setChangeDetected(true);
                  }}
                />
              ) : (
                <DataField value={localOffice.city} />
              )}
            </div>
          </div>
          <div className="bg-nss-20 border p-2  rounded-md">
            <div className="text-xs font-bold">State:</div>
            <div className="text-sm">
              {editMode ? (
                <input
                  className="bg-nss-21 text-xs placeholder-red-600 shadow appearance-none border rounded w-full py-1 px-3 text-green-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="state"
                  type="text"
                  placeholder="Enter office state..."
                  value={localOffice.state}
                  onChange={(e) => {
                    const updatedOffice = { ...localOffice };
                    updatedOffice.state = e.target.value;
                    setLocalOffice(updatedOffice);
                    setChangeDetected(true);
                  }}
                />
              ) : (
                <DataField value={localOffice.state} />
              )}
            </div>
          </div>
          <div className="bg-nss-20 border p-2  rounded-md">
            <div className="text-xs font-bold">Zip:</div>
            <div className="text-sm">
              {editMode ? (
                <input
                  className="bg-nss-21 text-xs placeholder-red-600 shadow appearance-none border rounded w-full py-1 px-3 text-green-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="zip"
                  type="text"
                  placeholder="Enter office zip..."
                  value={localOffice.zip}
                  onChange={(e) => {
                    const updatedOffice = { ...localOffice };
                    updatedOffice.zip = e.target.value;
                    setLocalOffice(updatedOffice);
                    setChangeDetected(true);
                  }}
                />
              ) : (
                <DataField value={localOffice.zip} />
              )}
            </div>
          </div>
          <div className="bg-nss-20 border p-2  rounded-md">
            <div className="text-xs font-bold">Phone:</div>
            <div className="text-sm">
              {editMode ? (
                <input
                  className="bg-nss-21 text-xs placeholder-red-600 shadow appearance-none border rounded w-full py-1 px-3 text-green-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="phone"
                  type="text"
                  placeholder="Enter office phone..."
                  value={localOffice.phone}
                  onChange={(e) => {
                    const updatedOffice = { ...localOffice };
                    updatedOffice.phone = e.target.value;
                    setLocalOffice(updatedOffice);
                    setChangeDetected(true);
                  }}
                />
              ) : (
                <DataField value={localOffice.phone} />
              )}
            </div>
          </div>
          <div className="bg-nss-20 border p-2  rounded-md">
            <div className="text-xs font-bold">Fax:</div>
            <div className="text-sm">
              {editMode ? (
                <input
                  className="bg-nss-21 text-xs placeholder-red-600 shadow appearance-none border rounded w-full py-1 px-3 text-green-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="fax"
                  type="text"
                  placeholder="Enter office fax..."
                  value={localOffice.fax}
                  onChange={(e) => {
                    const updatedOffice = { ...localOffice };
                    updatedOffice.fax = e.target.value;
                    setLocalOffice(updatedOffice);
                    setChangeDetected(true);
                  }}
                />
              ) : (
                <DataField value={localOffice.fax} />
              )}
            </div>
          </div>
          <div className="bg-nss-20 border p-2  rounded-md">
            <div className="text-xs font-bold">Email:</div>
            <div className="text-sm">
              {editMode ? (
                <input
                  className="bg-nss-21 text-xs placeholder-red-600 shadow appearance-none border rounded w-full py-1 px-3 text-green-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="text"
                  placeholder="Enter office email..."
                  value={localOffice.email}
                  onChange={(e) => {
                    const updatedOffice = { ...localOffice };
                    updatedOffice.email = e.target.value;
                    setLocalOffice(updatedOffice);
                    setChangeDetected(true);
                  }}
                />
              ) : (
                <DataField value={localOffice.email} />
              )}
            </div>
          </div>
          <div className="bg-nss-20 border p-2  rounded-md">
            <div className="text-xs font-bold">Accepting Walk-Ins:</div>
            <div className="text-sm">
              {editMode ? (
                <NssCheckbox
                  label=""
                  value={office.acceptingWalkIns}
                  onChange={handleAcceptingWalkInsChange}
                />
              ) : (
                <DataField
                  value={JSON.stringify(localOffice.acceptingWalkIns)}
                />
              )}
            </div>
          </div>
          <div className="bg-nss-20 border p-2  rounded-md">
            <div className="text-xs font-bold">Map URL:</div>
            <div className="text-sm">
              {editMode ? (
                <input
                  className="bg-nss-21 text-xs placeholder-red-600 shadow appearance-none border rounded w-full py-1 px-3 text-green-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="mapUrl"
                  type="text"
                  placeholder="Enter office google maps url..."
                  value={localOffice.mapUrl}
                  onChange={(e) => {
                    const updatedOffice = { ...localOffice };
                    updatedOffice.mapUrl = e.target.value;
                    setLocalOffice(updatedOffice);
                    setChangeDetected(true);
                  }}
                />
              ) : (
                <DataField value={localOffice.mapUrl} />
              )}
            </div>
          </div>
          <div className="bg-nss-20 border p-2  rounded-md">
            <div className="text-xs font-bold">Introduction:</div>
            <div className="text-sm">
              {editMode ? (
                <input
                  className="bg-nss-21 text-xs placeholder-red-600 shadow appearance-none border rounded w-full py-1 px-3 text-green-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="introduction"
                  type="text"
                  placeholder="Enter office introduction..."
                  value={localOffice.introduction}
                  onChange={(e) => {
                    const updatedOffice = { ...localOffice };
                    updatedOffice.introduction = e.target.value;
                    setLocalOffice(updatedOffice);
                    setChangeDetected(true);
                  }}
                />
              ) : (
                <DataField value={localOffice.introduction} />
              )}
            </div>
          </div>
        </div>
        <div className="flex gap-2 pt-2">
          <NssButtonSubtract
            onClick={onDeleteOffice}
            disabled={false}
            label="Delete Office"
          ></NssButtonSubtract>
          <NssButtonEdit
            onClick={onEditOffice}
            label="Edit Office"
            disabled={false}
          ></NssButtonEdit>
          <NssButtonSave
            onClick={onSaveOffice}
            disabled={disableButton()}
            label="Save Office"
          ></NssButtonSave>
        </div>
        <div className="flex gap-2 pt-2">
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
            onClick={openDump}
            label="Dump"
            selected={showDump}
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
        {showDump ? <Dump data={localOffice} /> : <></>}
        {showSchedule ? (
          <Schedule schedule={localOffice.schedule} parentId={localOffice.id} />
        ) : (
          <></>
        )}
      </div>
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
