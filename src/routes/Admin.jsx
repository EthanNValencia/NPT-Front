import React, { useState, useEffect, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import NssButton from "../nss/NssButton";
import { adminGetEmployees, adminGetUnansweredQuestions } from "../axios/api";
import { AuthContext } from "../contexts/context";
import ApiError from "../components/ApiError";
import FaqAdminDiv from "../admin/FaqAdminDiv";
import EmployeeAdminDiv from "../admin/EmployeeAdminDiv";
import WebsiteAdmin from "../admin/WebsiteAdmin";

// eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJlam5lcGhld0B5YWhvby5jb20iLCJpYXQiOjE2OTg3NjQ3MDUsImV4cCI6MTY5ODc2NTQyNX0.-QKYmy_q2c31JQDve49YVD6dg3qbd3S4HXOyUBCTE-wIzkL7P4ZJOppAgYL7shcQpsJjmeX_04c9xMMuJoxLPA

function Admin() {
  const [employeeObjects, setEmployeeObjects] = useState([]);
  const [faqObjects, setFaqObjects] = useState([]);
  const [websiteObject, setWebsiteObject] = useState({});
  const [showEmployeeDump, setShowEmployeeDump] = useState(false);
  const [showEmployees, setShowEmployees] = useState(false);
  const [showFAQs, setShowFAQs] = useState(false);
  const [showOffices, setShowOffices] = useState(false);
  const [showWebsite, setShowWebsite] = useState(false);
  const counterRef = useRef(0);
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const [hasApiError, setHasApiError] = useState(false);

  async function fetchFaqs() {
    try {
      const data = await adminGetUnansweredQuestions(authContext.token);
      // console.log(JSON.stringify(data));
      setFaqObjects(data);
      setHasApiError(false);
    } catch (error) {
      setHasApiError(true);
      // console.error("Error loading unanswered questions:", error);
    }
  }

  async function fetchEmployees() {
    try {
      const data = await adminGetEmployees(authContext.token);
      setEmployeeObjects(data);
      console.log(JSON.stringify(data[0]));
      setHasApiError(false);
    } catch (error) {
      setHasApiError(true);
      // console.error("Error loading employees:", error);
    }
  }

  useEffect(() => {
    fetchEmployees();
    fetchFaqs();
  }, []);

  const loadFaqs = () => {
    fetchFaqs();
  };

  const loadEmployees = () => {
    fetchEmployees();
  };

  const onGoBack = () => {
    navigate("/options");
  };

  const editOffices = () => {
    setShowOffices(!showOffices);
    setShowFAQs(false);
    setShowEmployeeDump(false);
    setShowEmployees(false);
    setShowWebsite(false);
  };

  const employeeDump = () => {
    setShowEmployeeDump(!showEmployeeDump);
    setShowFAQs(false);
    setShowEmployees(false);
    setShowOffices(false);
    setShowWebsite(false);
  };

  const editFaqs = () => {
    setShowFAQs(!showFAQs);
    setShowEmployeeDump(false);
    setShowEmployees(false);
    setShowOffices(false);
    setShowWebsite(false);
  };

  const editEmployees = () => {
    setShowEmployees(!showEmployees);
    setShowFAQs(false);
    setShowEmployeeDump(false);
    setShowOffices(false);
    setShowWebsite(false);
  };

  const editWebsite = () => {
    setShowWebsite(true);
    setShowEmployees(false);
    setShowFAQs(false);
    setShowEmployeeDump(false);
    setShowOffices(false);
  };

  // NEED TO FIX THIS, IT NEEDS TO DELETE FIRST
  const updateFaqObjects = (faq, index) => {
    for (let i = 0; i < faqObjects.length; i++) {
      if (i == index) {
        // What to do here?
      }
    }
    const newFaqs = [...faqObjects, faq];
    setFaqObjects(newFaqs);
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

  const createFaq = () => {
    const newFaq = {
      id: null,
      questionIsAnswered: false,
      question: null,
      answer: null,
    };
    setFaqObjects([...faqObjects, newFaq]);
  };

  const createEmployee = () => {
    const newEmployee = {};
    setEmployeeObjects([...employeeObjects], newEmployee);
  };

  const removeFaq = (faqToRemove) => {
    const newFaqList = faqObjects.filter((faq) => faq.id !== faqToRemove.id);
    setFaqObjects(newFaqList);
  };

  const removeEmployee = (employeeToRemove) => {
    const newEmployeeList = employeeObjects.filter(
      (employee) => employee.id !== employeeToRemove.id
    );
    setEmployeeObjects(newEmployeeList);
  };

  const createOffice = () => {};

  const EmployeesAsDiv = () => {
    return employeeObjects.map((employee, index) => (
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

  const ReturnCategoryControls = () => {
    if (showEmployees) {
      return (
        <div className="flex gap-2 py-2">
          <NssButton
            onClick={createEmployee}
            label="Create Employee"
          ></NssButton>
          <NssButton
            onClick={loadEmployees}
            label="Reload Employees"
          ></NssButton>
        </div>
      );
    }
    if (showFAQs) {
      return (
        <div className="flex gap-2 py-2">
          <NssButton onClick={createFaq} label="Create FAQ"></NssButton>
          <NssButton onClick={loadFaqs} label="Reload FAQs"></NssButton>
        </div>
      );
    }
    if (showOffices) {
      return (
        <div className="flex gap-2 py-2">
          <NssButton onClick={createOffice} label="Create Office"></NssButton>
        </div>
      );
    }
  };

  const FAQs = () => {
    return faqObjects.map((faq, index) => (
      <div key={index} className="">
        <FaqAdminDiv
          faq={faq}
          removeFaq={removeFaq}
          updateFaqObjects={updateFaqObjects}
          index={index}
        />
      </div>
    ));
  };

  const Employees = () => {
    return employeeObjects.map((employee, index) => (
      <div key={index}>
        <EmployeeAdminDiv employee={employee} removeEmployee={removeEmployee} />
      </div>
    ));
  };

  return (
    <div>
      <div>
        <div className="flex justify-between">
          <div className="flex gap-2">
            <NssButton onClick={editFaqs} label="FAQs"></NssButton>
            <NssButton onClick={employeeDump} label="Employee Dump"></NssButton>
            <NssButton onClick={editOffices} label="Offices"></NssButton>
            <NssButton onClick={editEmployees} label="Employees"></NssButton>
            <NssButton onClick={editWebsite} label="Website"></NssButton>
          </div>
          <div>
            <NssButton onClick={onGoBack} label="Back" />
          </div>
        </div>
        <div className="flex gap-2">
          <ReturnCategoryControls />
        </div>
        <div className="">
          {showEmployeeDump ? <div>{<EmployeesAsDiv />}</div> : <></>}
          {showEmployees ? (
            <div>
              <Employees />
            </div>
          ) : (
            <></>
          )}
          {showFAQs ? (
            <div className="grid xl:grid-cols-2 gap-2 lg:grid-cols-1">
              <FAQs />
            </div>
          ) : (
            <></>
          )}
          {showOffices ? <div>Edit Office</div> : <></>}
          {showWebsite ? <WebsiteAdmin /> : <></>}
        </div>
      </div>
      <div>{hasApiError ? <ApiError /> : <></>}</div>
    </div>
  );
}

export default Admin;
