import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/context";
import NssButton from "../nss/NssButton";
import ApiError from "../components/ApiError";
import NssButtonExit from "../nss/NssButtonExit";

function Options() {
  const authContext = useContext(AuthContext);
  const [hasApiError, setHasApiError] = useState(false);

  const navigate = useNavigate();

  const onClickAdmin = async () => {
    try {
      await authContext.validateAdminRoute();
      if (authContext.auth) {
        navigate("/admin");
      }
    } catch (error) {
      setHasApiError(true);
      //console.error("Error fetching data:", error);
      //throw error;
    }
  };

  const onClickNpt = async () => {
    try {
      await authContext.validateUserRoute();
      if (authContext.auth) {
        navigate("/");
      }
    } catch (error) {
      setHasApiError(true);
      //console.error("Error fetching data:", error);
      //throw error;
    }
  };

  const onLogout = () => {
    navigate("/login");
  };

  return (
    <div>
      <div className="flex justify-center gap-2 py-2">
        <NssButton
          onClick={onClickAdmin}
          label="Office-Employee-Service-Appointment Admin"
        />
        <NssButton
          onClick={onClickNpt}
          label="Office-Employee-Service-Appointment Website"
        />
        <NssButtonExit onClick={onLogout} label="Logout" />
      </div>
      {hasApiError ? <ApiError /> : <></>}
    </div>
  );
}

export default Options;
