import React from "react";

const CheckBox = (props) => {
  const { selected, name, selectedChange } = props;
  const onChange = (event) => {
    const selectedValue = event.target.checked;
    selectedChange(selectedValue);
  };
  return (
    <div className="flex items-center">
      <label className="text-xs pr-1">{name}:</label>
      <input
        id="italic"
        type="checkbox"
        checked={selected}
        onChange={onChange}
        className="accent-nss-300"
      />
    </div>
  );
};

export default CheckBox;
