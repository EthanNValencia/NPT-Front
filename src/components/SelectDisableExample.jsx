import React, { useState } from 'react';

const SelectDisableExample = () => {
  const [disabledOptions, setDisabledOptions] = useState(true); // IDs of disabled options

  const handleSelectChange = (event) => {
    // Handle the select change event here
    console.log('Selected value:', event.target.value);
  };

  return (
    <select onChange={handleSelectChange}>
      <option value="1">Option 1</option>
      <option value="2" disabled={disabledOptions}>Option 2</option>
      <option value="3">Option 3</option>
    </select>
  );
};

export default SelectDisableExample;
