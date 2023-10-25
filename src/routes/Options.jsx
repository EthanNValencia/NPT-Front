import React from "react";
import { useNavigate } from "react-router-dom";
import { validate } from "../axios/api";
import NssButton from "../nss/NssButton";

function Options() {
  const navigate = useNavigate();

  const onClickAdmin = async () => {
    try {
      const validated = await validate({ role: "ADMIN" });
      if (validated) {
        navigate("/admin");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  };

  const onClickNpt = async () => {
    try {
      const validated = await validate({ role: "USER" });
      if (validated) {
        navigate("/");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  };

  return (
    <div className="flex justify-center gap-2 py-2">
      <NssButton onClick={onClickAdmin} label="Admin" />
      <NssButton onClick={onClickNpt} label="NPT" />
    </div>
  );
}

export default Options;
