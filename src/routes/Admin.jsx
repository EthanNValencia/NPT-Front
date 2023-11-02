import React, { useState, useEffect, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import NssButton from "../nss/NssButton";
import { adminGetEmployees, adminGetUnansweredQuestions } from "../axios/api";
import { AuthContext } from "../contexts/context";
import ApiError from "../components/ApiError";
import FaqAdminDiv from "../admin/FaqAdminDiv";

// eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJlam5lcGhld0B5YWhvby5jb20iLCJpYXQiOjE2OTg3NjQ3MDUsImV4cCI6MTY5ODc2NTQyNX0.-QKYmy_q2c31JQDve49YVD6dg3qbd3S4HXOyUBCTE-wIzkL7P4ZJOppAgYL7shcQpsJjmeX_04c9xMMuJoxLPA

function Admin() {
  const [employees, setEmployees] = useState([]);
  const [unansweredFaqs, setUnansweredFaqs] = useState([]);
  const [showEmployeeDump, setShowEmployeeDump] = useState(false);
  const [showEditEmployees, setShowEditEmployees] = useState(false);
  const [showFAQs, setShowFAQs] = useState(false);
  const [showOffices, editShowOffices] = useState(false);
  const counterRef = useRef(0);
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const [hasApiError, setHasApiError] = useState(false);

  useEffect(() => {
    async function fetchUnansweredQuestions() {
      try {
        const data = await adminGetUnansweredQuestions(authContext.token);
        console.log(JSON.stringify(data));
        setUnansweredFaqs(data);
        setHasApiError(false);
      } catch (error) {
        setHasApiError(true);
        // console.error("Error loading unanswered questions:", error);
      }
    }
    async function fetchEmployees() {
      try {
        const data = await adminGetEmployees(authContext.token);
        setEmployees(data);
        setHasApiError(false);
      } catch (error) {
        setHasApiError(true);
        // console.error("Error loading employees:", error);
      }
    }
    fetchEmployees();
    fetchUnansweredQuestions();
  }, []);

  const onGoBack = () => {
    navigate("/options");
  };

  const editOffices = () => {
    editShowOffices(!showOffices);
    setShowFAQs(false);
    setShowEmployeeDump(false);
    setShowEditEmployees(false);
  };

  const employeeDump = () => {
    setShowEmployeeDump(!showEmployeeDump);
    setShowFAQs(false);
    setShowEditEmployees(false);
    editShowOffices(false);
  };

  const editFaqs = () => {
    setShowFAQs(!showFAQs);
    setShowEmployeeDump(false);
    setShowEditEmployees(false);
    editShowOffices(false);
  };

  const editEmployees = () => {
    setShowEditEmployees(!showEditEmployees);
    setShowFAQs(false);
    setShowEmployeeDump(false);
    editShowOffices(false);
  };

  function traverseObject(obj) {
    const elements = [];
    counterRef.current += 1;

    for (const key in obj) {
      if (typeof obj[key] === "object") {
        elements.push(traverseObject(obj[key]));
      } else {
        elements.push(<div key={key}>{`${key}: ${obj[key]}`}</div>);
      }
    }
    const key = "nested-" + counterRef.current;
    return <div key={key}>{elements}</div>;
  }

  const checkForArtifacts = (employee, key) => {
    return <div>{`${key}: ${employee[key]}`}</div>;
  };

  const getEmployeesAsDiv = () => {
    return employees.map((employee, index) => (
      <div key={index}>
        {Object.keys(employee).map((key) => (
          <div key={key}>
            {typeof employee[key] === "object"
              ? traverseObject(employee[key])
              : checkForArtifacts(employee, key)}
          </div>
        ))}
      </div>
    ));
  };

  const FAQs = () => {
    return unansweredFaqs.map((faq, index) => (
      <div key={index}>
        <FaqAdminDiv faq={faq} />
      </div>
    ));
  };

  return (
    <div>
      <div>
        <div className="gap-2 flex">
          <NssButton onClick={editFaqs} label="Edit FAQ"></NssButton>
          <NssButton onClick={employeeDump} label="Employee Dump"></NssButton>
          <NssButton onClick={editOffices} label="Edit Offices"></NssButton>
          <NssButton onClick={editEmployees} label="Edit Employees"></NssButton>
          <NssButton onClick={onGoBack} label="Back" />
        </div>
        {showEmployeeDump ? <div>{getEmployeesAsDiv()}</div> : <></>}
        {showEditEmployees ? <div>Edit Employees</div> : <></>}
        {showFAQs ? <div>{<FAQs />}</div> : <></>}
        {showOffices ? <div>Edit Office</div> : <></>}
      </div>
      <div>{hasApiError ? <ApiError /> : <></>}</div>
    </div>
  );
}

export default Admin;
