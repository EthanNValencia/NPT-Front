import React from "react";

function EmployeeCard(props) {
  function onClick() {
    console.log(`You clicked ${props.employee.name}`);
    props.selected(props.employee);
  }

  return (
    <div className="flex-none">
      <button
        onClick={onClick}
        className="overflow-hidden w-96 relative pr-6 max-w-sm mx-auto  bg-white shadow-lg ring-1 ring-black focus:ring-npt_colors-350 focus:ring-2 focus:bg-npt_colors-300 rounded-xl flex items-center"
      >
        <img
          className="absolute -left-6 w-24 h-24 rounded-full shadow-lg"
          src={props.employee.img}
        />
        <div className="flex flex-col py-5 pl-24">
          <strong className="text-slate-900 text-sm font-medium ">
            {props.employee.name}
          </strong>
          <span className="text-slate-500 text-sm font-medium">
            {props.employee.role}
          </span>
        </div>
      </button>
    </div>
  );
}

export default EmployeeCard;
