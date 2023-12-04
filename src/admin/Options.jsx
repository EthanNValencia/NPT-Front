import React from "react";

const Options = (props) => {
  const { selected, selectOptions, name, selectedChange } = props;

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    selectedChange(selectedValue);
  };

  if (selectOptions != undefined) {
    return (
      <div className="">
        <div className="flex gap-1">
          <div className="text-sm">{name}:</div>
          <select
            id="selectInput"
            value={selected}
            onChange={handleSelectChange}
            className="bg-nss-20 border border-nss-1 text-gray-900 text-xs rounded-lg focus:ring-nss-300 focus:border-nss-300 block px-1 py-0.5"
          >
            {selectOptions.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>
    );
  }
};

export default Options;
