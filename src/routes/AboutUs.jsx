import React, { useEffect, useState } from "react";
import { getEmployees } from "../axios/api";
import EmployeeCard from "../components/EmployeeCard";

function AboutUs() {
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState([]);
  const [selectedTherapist, setSelectedTherapist] = useState({});

  useEffect(() => {
    setLoading(true);
    async function getNptEmployees() {
      getEmployees(setLoading, setEmployees);
    }
    getNptEmployees();
  }, []);

  function selected(employee) {
    setSelectedTherapist(employee);
  }

  return (
    <div className="p-4">
      <p className="p-4">
        Hi There! Our team truly defines who we are as a practice, and we think
        they’re pretty amazing. We look forward to introducing ourselves in
        person, but for now, thank you for taking a moment to get to know us
        electronically!
      </p>
      <div className="flex flex-wrap gap-24 gap-x-32 content-center pl-52 pb-12 pt-12 max-w-screen-2xl">
        {employees.map((employee) => (
          <EmployeeCard
            therapist={selectedTherapist}
            selectedEmployee={selectedTherapist}
            key={employee.id}
            employee={employee}
            selected={selected}
            fullRender={true}
          />
        ))}
      </div>
    </div>
  );
}

export default AboutUs;
