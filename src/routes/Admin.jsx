import React, { useState, useEffect, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import NssButton from "../nss/NssButton";
import { adminGetEmployees, adminGetUnansweredQuestions } from "../axios/api";
import { AuthContext } from "../contexts/context";

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

  useEffect(() => {
    async function fetchUnansweredQuestions() {
      try {
        const data = await adminGetUnansweredQuestions(authContext.token);
        console.log(JSON.stringify(data));
        setUnansweredFaqs(data);
      } catch (error) {
        console.error("Error loading unanswered questions:", error);
      }
    }
    async function fetchEmployees() {
      try {
        const data = await adminGetEmployees(authContext.token);
        setEmployees(data);
      } catch (error) {
        console.error("Error loading employees:", error);
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

  const editFAQ = () => {};

  const saveFAQ = () => {};

  const FAQs = () => {
    return unansweredFaqs.map((faq, index) => (
      <div
        className={`border rounded-lg shadow-xl py-2 px-2 my-2 ${
          faq.answer == null
            ? "border-r-8 border-red-600"
            : "border-r-8 border-green-600"
        }`}
      >
        <div key={faq.id} className="grid grid-flow-col grid-cols-2">
          <div>
            <div>Question:</div>
            <div>{faq.question}</div>
          </div>
          <div>
            <div>Answer:</div>
            {faq.answer == null ? (
              <AnswerTextArea faq={faq} />
            ) : (
              <div>{faq.answer}</div>
            )}
          </div>
        </div>
        <div className="flex gap-2">
          <NssButton onClick={editFAQ} label="Edit" />
          <NssButton onClick={saveFAQ} label="Save" />
        </div>
      </div>
    ));
  };

  const AnswerTextArea = (props) => {
    const { faq } = props;
    const [message, setMessage] = useState("");
    return (
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        id="message"
        rows="2"
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-200 rounded-lg border border-gray-300 focus:ring-npt_colors-30 focus:border-npt_colors-30 "
        placeholder="Write your answer here..."
      ></textarea>
    );
  };

  return (
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
  );
}

export default Admin;
