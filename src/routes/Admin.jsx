import React, { useState, useEffect, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { adminGetUnansweredQuestions } from "../axios/api";
import { AuthContext } from "../contexts/context";
import ApiError from "../components/ApiError";
import FAQs from "../admin/FAQs";
import Employees from "../admin/Employees";
import Website from "../admin/Website";
import Services from "../admin/Services";
import NssButtonChevron from "../nss/NssButtonChevron";
import NssButtonAdd from "../nss/NssButtonAdd";
import NssButtonReload from "../nss/NssButtonReload";
import Offices from "../admin/Offices";
import NssButtonBack from "../nss/NssButtonBack";

// eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJlam5lcGhld0B5YWhvby5jb20iLCJpYXQiOjE2OTg3NjQ3MDUsImV4cCI6MTY5ODc2NTQyNX0.-QKYmy_q2c31JQDve49YVD6dg3qbd3S4HXOyUBCTE-wIzkL7P4ZJOppAgYL7shcQpsJjmeX_04c9xMMuJoxLPA

function Admin() {
  const [showEmployees, setShowEmployees] = useState(false);
  const [showFAQs, setShowFAQs] = useState(false);
  const [showOffices, setShowOffices] = useState(false);
  const [showWebsite, setShowWebsite] = useState(false);
  const [showServices, setShowServices] = useState(false);
  const navigate = useNavigate();

  const onGoBack = () => {
    navigate("/options");
  };

  const editOffices = () => {
    setShowOffices(!showOffices);
    setShowFAQs(false);
    setShowEmployees(false);
    setShowWebsite(false);
    setShowServices(false);
  };

  const editFaqs = () => {
    setShowFAQs(!showFAQs);
    setShowEmployees(false);
    setShowOffices(false);
    setShowWebsite(false);
    setShowServices(false);
  };

  const editEmployees = () => {
    setShowEmployees(!showEmployees);
    setShowFAQs(false);
    setShowOffices(false);
    setShowWebsite(false);
    setShowServices(false);
  };

  const editWebsite = () => {
    setShowWebsite(!showWebsite);
    setShowEmployees(false);
    setShowFAQs(false);
    setShowOffices(false);
    setShowServices(false);
  };

  const editServices = () => {
    setShowWebsite(false);
    setShowEmployees(false);
    setShowFAQs(false);
    setShowOffices(false);
    setShowServices(!showServices);
  };

  return (
    <div>
      <div>
        <div className="flex justify-between">
          <div className="flex gap-2">
            <NssButtonChevron
              onClick={editFaqs}
              label="FAQs"
              selected={showFAQs}
            ></NssButtonChevron>
            <NssButtonChevron
              onClick={editOffices}
              label="Offices"
              selected={showOffices}
            ></NssButtonChevron>
            <NssButtonChevron
              onClick={editEmployees}
              label="Employees"
              selected={showEmployees}
            ></NssButtonChevron>
            <NssButtonChevron
              onClick={editWebsite}
              label="Website"
              selected={showWebsite}
            ></NssButtonChevron>
            <NssButtonChevron
              onClick={editServices}
              label="Services"
              selected={showServices}
            ></NssButtonChevron>
          </div>
          <div>
            <NssButtonBack onClick={onGoBack} label="Back" />
          </div>
        </div>
        <div>
          {showEmployees ? (
            <div>
              <Employees />
            </div>
          ) : (
            <></>
          )}
          {showFAQs ? (
            <div className="">
              <FAQs />
            </div>
          ) : (
            <></>
          )}
          {showServices ? <Services /> : <></>}
          {showOffices ? <Offices /> : <></>}
          {showWebsite ? <Website /> : <></>}
        </div>
      </div>
    </div>
  );
}

export default Admin;
