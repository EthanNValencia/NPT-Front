import React from "react";

function EmployeeDump(props) {
  const { employee } = props;
  return <div>{JSON.stringify(employee)}</div>;
}

export default EmployeeDump;
