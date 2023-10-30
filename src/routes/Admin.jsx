import React from "react";
import { useNavigate } from "react-router-dom";
import NssButton from "../nss/NssButton";

function Admin() {
  const navigate = useNavigate();

  const onGoBack = () => {
    navigate("/options");
  };

  return (
    <div>
      <div>Admin</div>
      <NssButton onClick={onGoBack} label="Back" />
    </div>
  );
}

export default Admin;
