import React, { useState, useEffect, useContext } from "react";
import { adminGetWebsite } from "../axios/api";
import DataField from "./DataField";
import SocialMediaProfile from "./SocialMediaProfile";
import NssButton from "../nss/NssButton";
import ApiError from "../components/ApiError";
import { AuthContext } from "../contexts/context";

function WebsiteAdmin(props) {
  const [showEditWebsite, setShowEditWebsite] = useState(false);
  const [websiteObject, setWebsiteObject] = useState({});
  const [hasApiError, setHasApiError] = useState(false);
  const [loading, setLoading] = useState(false);
  const authContext = useContext(AuthContext);

  useEffect(() => {
    async function fetchWebsite() {
      try {
        setLoading(true);
        const data = await adminGetWebsite(authContext.token);
        setWebsiteObject(data);
        console.log(JSON.stringify(data));
        setHasApiError(false);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setHasApiError(true);
        // console.error("Error loading employees:", error);
      }
    }
    fetchWebsite();
  }, []);

  const onSaveWebsite = () => {};

  const onEditWebsite = () => {
    setShowEditWebsite(!showEditWebsite);
  };

  return (
    <div>
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
        </div>
      </div>
      <div>
        <SocialMediaProfile
          socialMediaProfile={websiteObject.profile}
          parentId={websiteObject.id}
          loading={loading}
        />
      </div>
      <div>{hasApiError ? <ApiError /> : <></>}</div>
    </div>
  );
}

export default WebsiteAdmin;
