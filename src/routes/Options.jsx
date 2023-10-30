import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/context";
import NssButton from "../nss/NssButton";

function Options() {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  const onClickAdmin = async () => {
    try {
      await authContext.validateAdminRoute();
      if (authContext.auth) {
        navigate("/admin");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  };

  const onClickNpt = async () => {
    try {
      await authContext.validateUserRoute();
      if (authContext.auth) {
        navigate("/");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  };

  const onLogout = () => {
    navigate("/login");
  };

  return (
    <div className="flex justify-center gap-2 py-2">
      <NssButton onClick={onClickAdmin} label="Admin" />
      <NssButton onClick={onClickNpt} label="NPT" />
      <NssButton onClick={onLogout} label="Logout" />
    </div>
  );
}

export default Options;
