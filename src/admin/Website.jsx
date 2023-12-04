import React, { useState, useEffect, useContext } from "react";
import {
  adminGetWebsite,
  adminUpdateWebsite,
  adminCreatePage,
} from "../axios/api";
import DataField from "./DataField";
import SocialMediaProfile from "./SocialMediaProfile";
import ApiError from "../components/ApiError";
import { AuthContext } from "../contexts/context";
import NssButtonChevron from "../nss/NssButtonChevron";
import NssButtonSave from "../nss/NssButtonSave";
import NssButtonEdit from "../nss/NssButtonEdit";
import NssButtonReload from "../nss/NssButtonReload";
import Dump from "./Dump";
import NssButtonAdd from "../nss/NssButtonAdd";

function Website() {
  const [editMode, setShowEditMode] = useState(false);
  const [website, setWebsite] = useState({});
  const [hasApiError, setHasApiError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [changeDetected, setChangeDetected] = useState(false);
  const [showDump, setShowDump] = useState(false);
  const [showPages, setShowPages] = useState(false);
  const authContext = useContext(AuthContext);

  const ReturnDisplayMessage = () => {
    if (loading) {
      return <div>Your changes are being submitted...</div>;
    }
    if (editMode) {
      return (
        <div className="text-yellow-400 font-bold pt-2 animate-pulse text-sm">
          Edit mode is on.
        </div>
      );
    }
    if (changeDetected) {
      return (
        <div className="text-yellow-400 font-bold pt-2 text-sm">
          A change was detected. Do not forget to save.
        </div>
      );
    }
    if (!changeDetected) {
      return (
        <div className="text-green-700 font-bold pt-2 text-sm">
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

  async function fetchWebsite() {
    try {
      setLoading(true);
      const data = await adminGetWebsite(authContext.token);
      setWebsite(data);
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

  async function updateWebsite() {
    try {
      setLoading(true);
      const data = await adminUpdateWebsite(website, authContext.token);
      setWebsite(data);
      // console.log(JSON.stringify(data));
      setHasApiError(false);
      setLoading(false);
      setChangeDetected(false);
    } catch (error) {
      setLoading(false);
      setHasApiError(true);
      setChangeDetected(false);
      console.log("There was an error updating the website data.");
      // console.error("Error loading employees:", error);
    }
  }

  async function createPage() {
    try {
      setLoading(true);
      const data = await adminCreatePage(website, authContext.token);
      setWebsite(data);
      // console.log(JSON.stringify(data));
      setHasApiError(false);
      setLoading(false);
      setChangeDetected(false);
    } catch (error) {
      setLoading(false);
      setHasApiError(true);
      setChangeDetected(false);
      console.log("There was an error updating the website data.");
      // console.error("Error loading employees:", error);
    }
  }

  const copyProfile = (profile) => {
    const updatedWebsiteObject = { ...website };
    updatedWebsiteObject.profile = profile;
    setWebsite(updatedWebsiteObject);
  };

  useEffect(() => {
    fetchWebsite();
  }, []);

  const openProfile = () => {
    setShowProfile(!showProfile);
    setShowDump(false);
    setShowPages(false);
  };

  const openDump = () => {
    setShowProfile(false);
    setShowDump(!showDump);
    setShowPages(false);
  };

  const openPages = () => {
    setShowProfile(false);
    setShowDump(false);
    setShowPages(!showPages);
  };

  const onSaveWebsite = () => {
    updateWebsite();
  };

  const onReloadWebsite = () => {
    fetchWebsite();
  };

  const onEditWebsite = () => {
    setShowEditMode(!editMode);
  };

  const addPage = () => {
    if (changeDetected) {
      updateWebsite();
    }
    createPage();
  };

  return (
    <div
      className={`bg-nss-21 border ${pickDivColor()} rounded-lg shadow-xl py-2 px-2 mt-2`}
    >
      <div className="text-xl text-center py-2">
        Website Data (this entity needs work)
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <div className="text-xs font-bold">Name:</div>
          <div className="text-sm">
            {editMode ? (
              <input
                className="bg-nss-21 text-xs placeholder-nss-300 shadow appearance-none border rounded w-full py-1 px-3 text-nss-300 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                placeholder="Enter website name..."
                value={website.name}
                onChange={(e) => {
                  const updatedWebsiteObject = { ...website };
                  updatedWebsiteObject.name = e.target.value;
                  setWebsite(updatedWebsiteObject);
                  setChangeDetected(true);
                }}
              />
            ) : (
              <DataField value={website.name} />
            )}
          </div>
        </div>
        <div>
          <div className="text-xs font-bold">Home Url:</div>
          <div className="text-sm">
            {editMode ? (
              <input
                className="bg-nss-21 text-xs placeholder-nss-300 shadow appearance-none border rounded w-full py-1 px-3 text-nss-300 leading-tight focus:outline-none focus:shadow-outline"
                id="homeUrl"
                type="text"
                placeholder="Enter home URL..."
                value={website.homeUrl}
                onChange={(e) => {
                  const updatedWebsiteObject = { ...website };
                  updatedWebsiteObject.homeUrl = e.target.value;
                  setWebsite(updatedWebsiteObject);
                  setChangeDetected(true);
                }}
              />
            ) : (
              <DataField value={website.homeUrl} />
            )}
          </div>
        </div>
      </div>
      <div className="flex gap-2 pt-2"></div>
      <div className="flex justify-between">
        <div className="flex gap-2">
          <NssButtonSave
            onClick={onSaveWebsite}
            label="Save Website"
          ></NssButtonSave>
          <NssButtonEdit
            onClick={onEditWebsite}
            label="Edit Website"
          ></NssButtonEdit>
          <NssButtonReload
            onClick={onReloadWebsite}
            label="Reload Website"
          ></NssButtonReload>
        </div>
        <div>
          <ReturnDisplayMessage />
        </div>
      </div>
      <div className="flex gap-2 pt-2">
        <NssButtonChevron
          onClick={openProfile}
          label="Show Profile"
          selected={showProfile}
        ></NssButtonChevron>
        <NssButtonChevron
          onClick={openDump}
          label="Dump"
          selected={showDump}
        ></NssButtonChevron>
        <NssButtonChevron
          onClick={openPages}
          label="Pages"
          selected={showPages}
        ></NssButtonChevron>
      </div>
      <div>
        {showPages ? (
          <Pages
            changeDetected={changeDetected}
            setChangeDetected={setChangeDetected}
            addPage={addPage}
            website={website}
          ></Pages>
        ) : (
          <></>
        )}
        {showDump ? <Dump data={website} /> : <></>}
        {showProfile ? (
          <SocialMediaProfile
            socialMediaProfile={website.profile}
            parentId={website.id}
            loading={loading}
            copyProfileToParent={copyProfile}
            setChangeDetected={setChangeDetected}
          />
        ) : (
          <></>
        )}
      </div>
      <div>{hasApiError ? <ApiError /> : <></>}</div>
    </div>
  );
}

const Pages = (props) => {
  const { changeDetected, setChangeDetected, addPage, website } = props;

  return (
    <div className="bg-nss-21 border rounded-lg shadow-xl py-2 px-2 mt-2">
      <div className="flex gap-1">
        <NssButtonAdd onClick={addPage} label="Add Page"></NssButtonAdd>
      </div>
      {website.pages.map((page, index) => (
        <Page page={page} key={page.id} />
      ))}
    </div>
  );
};

const Page = (props) => {
  const { page } = props;
  return <div>{JSON.stringify(page)}</div>;
};

export default Website;
