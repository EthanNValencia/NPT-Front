import React, { useContext } from "react";
import { UserContext } from "../../contexts/context";
import { getServices } from "../../axios/api";


function ContactInformation() {
  const userContext = useContext(UserContext);

  return <div>
    <p>{console.log(JSON.stringify(userContext.appointment))}</p>
  </div>;
}

export default ContactInformation;
