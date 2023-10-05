import React, { useState, useEffect } from "react";

function EmployeeCard(props) {
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    // I had to do this because double clicking the employee cards,
    // would cause them to stay selected visually.
    if (props.selectedEmployee.name === props.employee.name) {
      setSelected(true);
    } else {
      setSelected(false);
    }
  }, [props.selectedEmployee]);

  function onClick() {
    console.log(`You clicked ${props.employee.name}`);
    props.selected(props.employee);
  }

  function unselectedSmallEmployeeCard() {
    return (
      <div className="flex-none">
        <button
          onClick={onClick}
          className="overflow-hidden w-64 relative pr-6 max-w-sm mx-auto  bg-white shadow-lg ring-1 ring-black focus:ring-npt_colors-350 focus:ring-2 focus:bg-npt_colors-30 rounded-xl flex items-center"
        >
          <div>
            <img
              className="absolute -left-6 -top-2 w-24 h-24 rounded-full shadow-lg"
              src={props.employee.img}
            />
          </div>
          <div className="flex flex-col flex-grow py-5 pl-20 text-right">
            <strong className="text-slate-900 text-xs font-medium ">
              {props.employee.name}
            </strong>
            <span className="text-slate-500 text-xs font-medium">
              {props.employee.role}
            </span>
          </div>
        </button>
      </div>
    );
  }

  function selectedSmallEmployeeCard() {
    return (
      <div className="flex-none">
        <button
          onClick={onClick}
          className="overflow-hidden w-64 relative pr-6 max-w-sm mx-auto shadow-lg  ring-npt_colors-350 ring-2 bg-npt_colors-30 rounded-xl flex items-center"
        >
          <div>
            <img
              className="absolute -left-6 -top-2 w-24 h-24 rounded-full shadow-lg"
              src={props.employee.img}
            />
          </div>
          <div className="flex flex-col flex-grow py-5 pl-20 text-right">
            <strong className="text-slate-900 text-xs font-medium ">
              {props.employee.name}
            </strong>
            <span className="text-slate-500 text-xs font-medium">
              {props.employee.role}
            </span>
          </div>
        </button>
      </div>
    );
  }

  function unselectedLargeEmployeeCard() {
    return (
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
    );
  }

  function selectedLargeEmployeeCard() {
    return (
      <div className="flex-none">
        <button
          onClick={onClick}
          className="overflow-visible w-80 relative pr-6 max-w-sm mx-auto  shadow-2xl ring-npt_colors-350 ring-4 bg-npt_colors-30 rounded-xl flex items-center"
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
    );
  }

  function returnSmallEmployeeCard() {
    if (selected) {
      return selectedSmallEmployeeCard();
    } else {
      return unselectedSmallEmployeeCard();
    }
  }

  function returnLargeEmployeeCard() {
    if (selected) {
      return selectedLargeEmployeeCard();
    } else {
      return unselectedLargeEmployeeCard();
    }
  }

  return (
    <>
      {props.fullRender === true
        ? returnLargeEmployeeCard()
        : returnSmallEmployeeCard()}
    </>
  );
}

export default EmployeeCard;
