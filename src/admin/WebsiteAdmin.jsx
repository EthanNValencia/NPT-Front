import React, { useState, useEffect, useContext } from "react";
import { adminGetWebsite, adminUpdateWebsite } from "../axios/api";
import DataField from "./DataField";
import SocialMediaProfileAdmin from "./SocialMediaProfileAdmin";
import NssButton from "../nss/NssButton";
import ApiError from "../components/ApiError";
import { AuthContext } from "../contexts/context";

function WebsiteAdmin() {
  const [showEditWebsite, setShowEditWebsite] = useState(false);
  const [websiteObject, setWebsiteObject] = useState({});
  const [hasApiError, setHasApiError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const authContext = useContext(AuthContext);

  async function fetchWebsite() {
    try {
      setLoading(true);
      const data = await adminGetWebsite(authContext.token);
      setWebsiteObject(data);
      // console.log(JSON.stringify(data));
      setHasApiError(false);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setHasApiError(true);
      // console.error("Error loading employees:", error);
    }
  }

  async function updateWebsite() {
    try {
      setLoading(true);
      const data = await adminUpdateWebsite(websiteObject, authContext.token);
      setWebsiteObject(data);
      // console.log(JSON.stringify(data));
      setHasApiError(false);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setHasApiError(true);
      // console.error("Error loading employees:", error);
    }
  }

  const copyProfile = (profile) => {
    // Create a copy of the current websiteObject
    const updatedWebsiteObject = { ...websiteObject };
    // Update the profile property with the new profile object
    updatedWebsiteObject.profile = profile;
    // Set the state with the updated websiteObject
    setWebsiteObject(updatedWebsiteObject);
  };

  useEffect(() => {
    fetchWebsite();
  }, []);

  const onShowProfile = () => {
    setShowProfile(!showProfile);
  };

  const onSaveWebsite = () => {
    updateWebsite();
  };

  const onReloadWebsite = () => {
    fetchWebsite();
  };

  const onEditWebsite = () => {
    setShowEditWebsite(!showEditWebsite);
  };

  return (
    <div className="bg-nss-21 border-2 rounded-lg shadow-xl py-2 px-2 mt-2">
      <div className="text-xl text-center py-2">Website Data</div>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <div className="text-xs font-bold">Name:</div>
          <div className="text-sm">
            {showEditWebsite ? (
              <input
                className="bg-nss-21 text-xs placeholder-nss-300 shadow appearance-none border rounded w-full py-1 px-3 text-nss-300 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                placeholder="Enter website name..."
                value={websiteObject.name}
                onChange={(e) => {
                  const updatedWebsiteObject = { ...websiteObject };
                  updatedWebsiteObject.name = e.target.value;
                  setWebsiteObject(updatedWebsiteObject);
                }}
              />
            ) : (
              <DataField value={websiteObject.name} />
            )}
          </div>
        </div>
        <div>
          <div className="text-xs font-bold">Home Url:</div>
          <div className="text-sm">
            {showEditWebsite ? (
              <input
                className="bg-nss-21 text-xs placeholder-nss-300 shadow appearance-none border rounded w-full py-1 px-3 text-nss-300 leading-tight focus:outline-none focus:shadow-outline"
                id="homeUrl"
                type="text"
                placeholder="Enter home URL..."
                value={websiteObject.homeUrl}
                onChange={(e) => {
                  const updatedWebsiteObject = { ...websiteObject };
                  updatedWebsiteObject.homeUrl = e.target.value;
                  setWebsiteObject(updatedWebsiteObject);
                }}
              />
            ) : (
              <DataField value={websiteObject.homeUrl} />
            )}
          </div>
        </div>
      </div>
      <div className="flex">
        <div className="flex gap-2 pt-2">
          <NssButton onClick={onSaveWebsite} label="Save Website"></NssButton>
          <NssButton onClick={onEditWebsite} label="Edit Website"></NssButton>
          <NssButton
            onClick={onReloadWebsite}
            label="Reload Website"
          ></NssButton>
          <NssButton onClick={onShowProfile} label="Show Profile"></NssButton>
        </div>
      </div>
      <div>
        {showProfile ? (
          <SocialMediaProfileAdmin
            socialMediaProfile={websiteObject.profile}
            parentId={websiteObject.id}
            loading={loading}
            copyProfileToParent={copyProfile}
          />
        ) : (
          <></>
        )}
      </div>
      <div>{hasApiError ? <ApiError /> : <></>}</div>
    </div>
  );
}

export default WebsiteAdmin;
