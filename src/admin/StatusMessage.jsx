import React from "react";

const StatusMessage = (props) => {
  const { loading, editMode, changeDetected } = props;
  if (loading) {
    return <div>Your changes are being submitted...</div>;
  }
  if (editMode) {
    return (
      <div className="text-yellow-400 font-bold pt-2 animate-pulse">
        Edit mode is on.
      </div>
    );
  }
  if (changeDetected) {
    return (
      <div className="text-yellow-400 font-bold pt-2">
        A change was detected. Do not forget to save.
      </div>
    );
  }
  return (
    <div className="text-green-700 font-bold pt-2">No changes detected.</div>
  );
};

export const pickDivColor = (loading, editMode, changeDetected) => {
  if (loading) {
    return "border-r-8 border-red-400 animate-pulse";
  }
  if (editMode) {
    return "border-r-8 border-yellow-600";
  }
  if (changeDetected) {
    return "border-r-8 border-yellow-600";
  }
  if (!changeDetected) {
    return "border-r-8 border-green-600";
  }
};

export default StatusMessage;
