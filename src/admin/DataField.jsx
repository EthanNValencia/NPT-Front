import React from "react";

// This is used to display a data field to better discern between empty and filled fields.
const DataField = (props) => {
  const { value } = props;
  const valueIsNotNullOrEmpty = value != null && value != "";

  if (valueIsNotNullOrEmpty) {
    return <div className="text-green-700">{value}</div>;
  } else {
    return <div className="text-red-600">Undefined</div>;
  }
};

export default DataField;
