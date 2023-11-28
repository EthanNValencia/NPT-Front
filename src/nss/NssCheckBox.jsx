import React from "react";

const NssCheckbox = ({ label, value, onChange }) => {
  return (
    <div className="accent-nss-300">
      <label>
        <input type="checkbox" checked={value} onChange={onChange} />
        {label}
      </label>
    </div>
  );
};

export default NssCheckbox;
