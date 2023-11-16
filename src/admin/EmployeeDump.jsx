import React, { useState } from "react";

function EmployeeDump(props) {
  const { employee } = props;
  const [searchString, setSearchString] = useState("");
  return (
    <div className="shadow-xl min-w-0 border-2 rounded-md p-2 mt-2">
      <div className="flex items-center justify-center">
        <div className="text-xs font-bold pr-2">Search:</div>
        <input
          className="bg-nss-21 w-48 text-xs placeholder-red-600 shadow appearance-none border rounded py-1 px-3 text-green-700 leading-tight focus:outline-none focus:shadow-outline"
          id="searchString"
          type="text"
          placeholder="Search"
          value={searchString}
          onChange={(e) => {
            setSearchString(e.target.value);
          }}
        />
      </div>
      <div className="shadow-xl min-w-0 border-2 rounded-md p-2 mt-2">
        {JSON.stringify(employee)}
      </div>
    </div>
  );
}

export default EmployeeDump;
