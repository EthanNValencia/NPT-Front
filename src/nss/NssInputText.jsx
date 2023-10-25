import React from "react";

function NssInputText(props) {
  const { value, onChange, id, placeholder, type } = props;
  return (
    <div>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-nss-1 leading-tight focus:outline-none focus:ring focus:ring-nss-305 focus:bg-nss-20 focus:shadow-outline"
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
        }}
      />
    </div>
  );
}

export default NssInputText;
