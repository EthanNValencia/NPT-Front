import React from "react";

function EmployeeCard(props) {
  function onClick() {
    console.log(`You clicked ${props.employee.name}`);
    props.selected(props.employee);
  }

  return (
    <>
      {props.fullRender === true ? (
        <div className="flex-none">
          <button
            onClick={onClick}
            className="overflow-visible w-80 relative pr-6 max-w-sm mx-auto  bg-white shadow-2xl ring-1 ring-black focus:ring-npt_colors-350 focus:ring-4 focus:bg-npt_colors-30 rounded-xl flex items-center"
          >
            <img
              className="absolute -left-28 w-44 h-44 rounded-full shadow-xl ring-1 ring-npt_colors-350"
              src={props.employee.img}
            />
            <div className="flex flex-col text-left py-5 pl-20">
              <strong className="text-slate-900 text-sm font-medium ">
                {props.employee.name}
              </strong>
              <span className="text-slate-500 text-sm font-medium">
                {props.employee.role}, {props.employee.role_id}
              </span>
              <span className="text-slate-500 text-sm font-medium">
                {props.employee.meta}
              </span>
            </div>
          </button>
        </div>
      ) : (
        <div className="flex-none">
          <button
            onClick={onClick}
            className="overflow-hidden w-96 relative pr-6 max-w-sm mx-auto  bg-white shadow-lg ring-1 ring-black focus:ring-npt_colors-350 focus:ring-2 focus:bg-npt_colors-30 rounded-xl flex items-center"
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
      )}
    </>
  );
}

export default EmployeeCard;
