import React, { useDebugValue, useState } from "react";
import DataField from "./DataField";
import NssButton from "../nss/NssButton";

const SocialMediaProfile = (props) => {
  const { socialMediaProfile, parentId, loading } = props;
  const [newSocialMediaProfile, setNewSocialMediaProfile] = useState({
    ...socialMediaProfile,
  });
  const [showEdit, setShowEdit] = useState(false);

  if (loading || socialMediaProfile == undefined) {
    return <div>The data is being loaded...</div>;
  }

  const onEditSocialMediaProfile = () => {
    setShowEdit(!showEdit);
  };
  console.log(JSON.stringify(newSocialMediaProfile));

  return (
    <div className="bg-nss-21 border-2 rounded-lg shadow-xl py-2 px-2 mt-2">
      <div>Social Media Profile</div>
      <div className="grid grid-flow-row grid-cols-10 gap-2">
        <div className="text-xs font-bold">LinkedIn:</div>
        <div className="text-xs font-bold col-span-9">
          {showEdit ? (
            <input
              className="bg-nss-21 text-xs placeholder-nss-300 shadow appearance-none border rounded w-full py-1 px-3 text-nss-300 leading-tight focus:outline-none focus:shadow-outline"
              id="linkedin"
              type="text"
              placeholder="Enter linkedin URL..."
              value={newSocialMediaProfile.linkedin}
              onChange={(e) => {
                const updatedSocialMediaProfile = { ...newSocialMediaProfile };
                updatedSocialMediaProfile.linkedin = e.target.value;
                setNewSocialMediaProfile(updatedSocialMediaProfile);
              }}
            />
          ) : (
            <DataField value={newSocialMediaProfile.linkedin} />
          )}
        </div>

        <div className="text-xs font-bold">YouTube:</div>
        <div className="text-xs font-bold col-span-9">
          {showEdit ? (
            <input
              className="bg-nss-21 text-xs placeholder-nss-300 shadow appearance-none border rounded w-full py-1 px-3 text-nss-300 leading-tight focus:outline-none focus:shadow-outline"
              id="youtube"
              type="text"
              placeholder="Enter youtube URL..."
              value={newSocialMediaProfile.youtube}
              onChange={(e) => {
                const updatedSocialMediaProfile = { ...newSocialMediaProfile };
                updatedSocialMediaProfile.youtube = e.target.value;
                setNewSocialMediaProfile(updatedSocialMediaProfile);
              }}
            />
          ) : (
            <DataField value={newSocialMediaProfile.youtube} />
          )}
        </div>

        <div className="text-xs font-bold">Facebook:</div>
        <div className="text-xs font-bold col-span-9">
          {showEdit ? (
            <input
              className="bg-nss-21 text-xs placeholder-nss-300 shadow appearance-none border rounded w-full py-1 px-3 text-nss-300 leading-tight focus:outline-none focus:shadow-outline"
              id="facebook"
              type="text"
              placeholder="Enter facebook URL..."
              value={newSocialMediaProfile.facebook}
              onChange={(e) => {
                const updatedSocialMediaProfile = { ...newSocialMediaProfile };
                updatedSocialMediaProfile.facebook = e.target.value;
                setNewSocialMediaProfile(updatedSocialMediaProfile);
              }}
            />
          ) : (
            <DataField value={newSocialMediaProfile.facebook} />
          )}
        </div>
        <div className="text-xs font-bold">linkedin:</div>
        <div className="text-xs font-bold col-span-9">
          <DataField value={socialMediaProfile.linkedin} />
        </div>
        <div className="text-xs font-bold">MySpace:</div>
        <div className="text-xs font-bold col-span-9">
          <DataField value={socialMediaProfile.myspace} />
        </div>
        <div className="text-xs font-bold">Instagram:</div>
        <div className="text-xs font-bold col-span-9">
          <DataField value={socialMediaProfile.instagram} />
        </div>
        <div className="text-xs font-bold">Yelp:</div>
        <div className="text-xs font-bold col-span-9">
          <DataField value={socialMediaProfile.yelp} />
        </div>
        <div className="text-xs font-bold">TikTok:</div>
        <div className="text-xs font-bold col-span-9">
          <DataField value={socialMediaProfile.tiktok} />
        </div>
        <div className="text-xs font-bold">X (Twitter):</div>
        <div className="text-xs font-bold col-span-9">
          <DataField value={socialMediaProfile.x} />
        </div>
        <div className="text-xs font-bold">Pinterest:</div>
        <div className="text-xs font-bold col-span-9">
          <DataField value={socialMediaProfile.pinterest} />
        </div>
        <div className="text-xs font-bold">Snapchat:</div>
        <div className="text-xs font-bold col-span-9">
          <DataField value={socialMediaProfile.snapchat} />
        </div>
        <div className="text-xs font-bold">WhatsApp:</div>
        <div className="text-xs font-bold col-span-9">
          <DataField value={socialMediaProfile.whatsapp} />
        </div>
        <div className="text-xs font-bold">Tumblr:</div>
        <div className="text-xs font-bold col-span-9">
          <DataField value={socialMediaProfile.tumblr} />
        </div>
        <div className="text-xs font-bold">Google:</div>
        <div className="text-xs font-bold col-span-9">
          <DataField value={socialMediaProfile.google} />
        </div>
      </div>
      <div className="pt-2">
        <NssButton
          onClick={onEditSocialMediaProfile}
          label="Edit Social Media Profile"
        ></NssButton>
      </div>
    </div>
  );
};

export default SocialMediaProfile;
