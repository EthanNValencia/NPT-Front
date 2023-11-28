import React, { useState, useEffect, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { adminGetEmployees, adminGetUnansweredQuestions } from "../axios/api";
import { AuthContext } from "../contexts/context";
import ApiError from "../components/ApiError";
import FaqAdmin from "../admin/FaqAdmin";
import Employee from "../admin/Employee";
import Website from "../admin/Website";
import Services from "../admin/Services";
import NssButtonChevron from "../nss/NssButtonChevron";
import NssButtonAdd from "../nss/NssButtonAdd";
import NssButtonReload from "../nss/NssButtonReload";
import Offices from "../admin/Offices";
import NssButtonBack from "../nss/NssButtonBack";

// eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJlam5lcGhld0B5YWhvby5jb20iLCJpYXQiOjE2OTg3NjQ3MDUsImV4cCI6MTY5ODc2NTQyNX0.-QKYmy_q2c31JQDve49YVD6dg3qbd3S4HXOyUBCTE-wIzkL7P4ZJOppAgYL7shcQpsJjmeX_04c9xMMuJoxLPA

function Admin() {
  const [employeeObjects, setEmployeeObjects] = useState([]);
  const [faqObjects, setFaqObjects] = useState([]);
  // const [showEmployeeDump, setShowEmployeeDump] = useState(false);
  const [showEmployees, setShowEmployees] = useState(false);
  const [showFAQs, setShowFAQs] = useState(false);
  const [showOffices, setShowOffices] = useState(false);
  const [showWebsite, setShowWebsite] = useState(false);
  const [showServices, setShowServices] = useState(false);
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
      // console.log(JSON.stringify(data[0]));
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
    // setShowEmployeeDump(false);
    setShowEmployees(false);
    setShowWebsite(false);
    setShowServices(false);
  };

  const employeeDump = () => {
    //setShowEmployeeDump(!showEmployeeDump);
    setShowFAQs(false);
    setShowEmployees(false);
    setShowOffices(false);
    setShowWebsite(false);
    setShowServices(false);
  };

  const editFaqs = () => {
    setShowFAQs(!showFAQs);
    //setShowEmployeeDump(false);
    setShowEmployees(false);
    setShowOffices(false);
    setShowWebsite(false);
    setShowServices(false);
  };

  const editEmployees = () => {
    setShowEmployees(!showEmployees);
    setShowFAQs(false);
    //setShowEmployeeDump(false);
    setShowOffices(false);
    setShowWebsite(false);
    setShowServices(false);
  };

  const editWebsite = () => {
    setShowWebsite(!showWebsite);
    setShowEmployees(false);
    setShowFAQs(false);
    //setShowEmployeeDump(false);
    setShowOffices(false);
    setShowServices(false);
  };

  const editServices = () => {
    setShowWebsite(false);
    setShowEmployees(false);
    setShowFAQs(false);
    //setShowEmployeeDump(false);
    setShowOffices(false);
    setShowServices(!showServices);
  };

  const updateFaqObjects = (faq, index) => {
    const updatedFaqObjects = [...faqObjects];
    if (index >= 0 && index < updatedFaqObjects.length) {
      updatedFaqObjects[index] = faq;
      setFaqObjects(updatedFaqObjects);
    }
  };

  const updateEmployees = (employee, index) => {
    const updatedEmployeeObjects = [...employeeObjects];
    if (index >= 0 && index < updatedEmployeeObjects.length) {
      updatedEmployeeObjects[index] = employee;
      setEmployeeObjects(updatedEmployeeObjects);
    }
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
          <NssButtonAdd
            onClick={createEmployee}
            label="Create Employee"
          ></NssButtonAdd>
          <NssButtonReload
            onClick={loadEmployees}
            label="Reload Employees"
          ></NssButtonReload>
        </div>
      );
    }
    if (showFAQs) {
      return (
        <div className="flex gap-2 py-2">
          <NssButtonAdd onClick={createFaq} label="Create FAQ"></NssButtonAdd>
          <NssButtonReload
            onClick={loadFaqs}
            label="Reload FAQs"
          ></NssButtonReload>
        </div>
      );
    }
    if (showOffices) {
      return <></>;
    }
  };

  const FAQs = () => {
    return faqObjects.map((faq, index) => (
      <div key={index} className="">
        <FaqAdmin
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
      <div key={employee.id}>
        <Employee
          employee={employee}
          removeEmployee={removeEmployee}
          createEmployee={createEmployee}
          updateEmployees={updateEmployees}
        />
      </div>
    ));
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
        <div className="flex gap-2">
          <ReturnCategoryControls />
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
            <div className="grid xl:grid-cols-2 gap-2 lg:grid-cols-1">
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
      <div>{hasApiError ? <ApiError /> : <></>}</div>
    </div>
  );
}

export default Admin;
