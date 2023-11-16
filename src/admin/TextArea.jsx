import React from "react";

const TextArea = (props) => {
  const { text, onTextChange, changeDetected, rows } = props;
  return (
    <textarea
      value={text}
      onChange={(e) => {
        onTextChange(e.target.value);
        changeDetected(e.target.value);
      }}
      id="message"
      rows={rows == undefined || rows == null ? 2 : rows}
      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-200 rounded-lg border border-gray-300 focus:ring-npt_colors-30 focus:border-npt_colors-30 "
      placeholder="Write your answer here..."
    ></textarea>
  );
};

export default TextArea;
