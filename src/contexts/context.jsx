import React, { useContext, useState, useEffect } from "react";
import { createContext } from "react";

export const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export function UserProvider({ children }) {
  const [user, setUser] = useState({
    firstName: null,
    lastName: null,
  });

  const [services, setServices] = useState([]);

  const [selectedEmployee, setSelectedEmployee] = useState([]);

  const [appointment, setAppointment] = useState({
    employeeFirstName: null,
    employeeMiddleName: null,
    employeeLastName: null,
    appointmentFirstName: null,
    appointmentLastName: null,
    appointmentEmail: null,
    appointmentPhoneNumber: null,
    appointmentBeginTime: null,
    appointmentEndTime: null,
    appointmentNotes: null,
    serviceName: null,
  });

  const navigateAppointment = (navigate) => {
    console.log("appointment: " + JSON.stringify(appointment));
    if (
      appointment.appointmentFirstName == null ||
      appointment.appointmentLastName == null
    ) {
      navigate("/request-name");
      return;
    }
    if (appointment.serviceName == null) {
      navigate("/category");
      return;
    }
    if (
      appointment.employeeFirstName == null ||
      appointment.employeeLastName == null ||
      appointment.appointmentBeginTime == null ||
      appointment.appointmentEndTime == null
    ) {
      navigate("/pairing");
      return;
    }
    if (
      appointment.appointmentEmail == null &&
      appointment.appointmentPhoneNumber == null
    ) {
      navigate("/contact-information");
      return;
    }
  };

  function setAppointmentName(firstName, lastName) {
    const updateAppointment = {
      ...appointment,
      appointmentFirstName: firstName,
      appointmentLastName: lastName,
    };
    setAppointment(updateAppointment);
  }

  function setAppointmentServiceName(name) {
    const updateAppointment = { ...appointment, serviceName: name };
    setAppointment(updateAppointment);
  }

  function setEmployeeName(firstName, middleName, lastName) {
    const updateAppointment = {
      ...appointment,
      employeeFirstName: firstName,
      employeeMiddleName: middleName,
      employeeLastName: lastName,
    };
    setAppointment(updateAppointment);
  }

  function setAppointmentTimes(beginTime, endTime) {
    const updateAppointment = {
      ...appointment,
      appointmentBeginTime: beginTime,
      appointmentEndTime: endTime,
    };
    setAppointment(updateAppointment);
  }

  function setAppointmentPhoneAndOrEmail(phone, email) {
    const updateAppointment = {
      ...appointment,
      appointmentEmail: email,
      appointmentPhoneNumber: phone,
    };
    setAppointment(updateAppointment);
  }

  function setNote(note) {
    const updateAppointment = { ...appointment, appointmentNotes: note };
    setAppointment(updateAppointment);
  }

  function filloutAppointment() {}

  function printUserContext() {
    console.log("--- Begin User Context ---");
    console.log("user: " + JSON.stringify(user));
    console.log("services: " + JSON.stringify(services));
    console.log("appointment: " + JSON.stringify(appointment));
    console.log("--- End User Context ---");
  }

  function setUserName(firstName, lastName) {
    setUser({
      firstName: firstName,
      lastName: lastName,
    });
  }

  function setSelectedService(service) {
    const array = []; // Your array
    array.push(service);
    setServices(array);
  }

  return (
    <UserContext.Provider
      value={{
        user,
        setUserName,
        services,
        setSelectedService,
        selectedEmployee,
        setSelectedEmployee,
        setAppointmentName,
        setAppointmentServiceName,
        setEmployeeName,
        setAppointmentTimes,
        printUserContext,
        setAppointmentPhoneAndOrEmail,
        appointment,
        setNote,
        navigateAppointment,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(false);

  return (
    <AuthContext.Provider value={{ auth }}>{children}</AuthContext.Provider>
  );
}

/*
headAndNeck: false,
shoulders: false,
elbows: false,
wrists: false,
midBack: false,
lowerBack: false,
hip: false,
knees: false,
footAndAnkle: false,
balance: false,
vestibularRehab: false,
massageTherapy: false,
*/

export const npt_employees = [
  {
    name: "Melissa M Meiste",
    img: "http://nephewpt.com/wp-content/uploads/2021/07/1-1-300x300.png",
    role_id: "MSPT",
    role: "CEO, Owner, Physical Therapist",
    specialization: [],
    meta: "",
    painCategories: {
      headAndNeck: true,
      shoulders: false,
      elbows: false,
      wrists: false,
      midBack: false,
      lowerBack: true,
      hip: false,
      knees: false,
      footAndAnkle: false,
      balance: false,
      vestibularRehab: false,
      massageTherapy: false,
    },
  },
  {
    name: "Christine Byington",
    img: "http://nephewpt.com/wp-content/uploads/2021/07/6-300x300.png",
    role_id: "PT",
    role: "Lead Physical Therapist",
    specialization: [],
    meta: "Team member since 2016.",
    painCategories: {
      headAndNeck: false,
      shoulders: false,
      elbows: false,
      wrists: false,
      midBack: false,
      lowerBack: true,
      hip: false,
      knees: false,
      footAndAnkle: false,
      balance: false,
      vestibularRehab: false,
      massageTherapy: false,
    },
  },
  {
    name: "Jenna Schra",
    img: "http://nephewpt.com/wp-content/uploads/2021/07/4-300x300.png",
    role_id: "DPT",
    role: "Physical Therapist",
    specialization: [],
    meta: "Team member since 2020.",
    painCategories: {
      headAndNeck: false,
      shoulders: false,
      elbows: false,
      wrists: false,
      midBack: false,
      lowerBack: false,
      hip: false,
      knees: false,
      footAndAnkle: false,
      balance: false,
      vestibularRehab: false,
      massageTherapy: false,
    },
  },
  {
    name: "Naomi Stafford",
    img: "http://nephewpt.com/wp-content/uploads/2021/07/9-300x300.png",
    role_id: "PTA",
    role: "Physical Therapy Assistant",
    specialization: [],
    meta: "Team member since 2018.",
    painCategories: {
      headAndNeck: false,
      shoulders: false,
      elbows: false,
      wrists: false,
      midBack: false,
      lowerBack: false,
      hip: false,
      knees: false,
      footAndAnkle: false,
      balance: false,
      vestibularRehab: false,
      massageTherapy: false,
    },
  },
  {
    name: "Caroline Packard",
    img: "http://nephewpt.com/wp-content/uploads/2021/07/2-300x300.png",
    role_id: "DPT",
    role: "Physical Therapist",
    specialization: [],
    meta: "Team member since 2015.",
    painCategories: {
      headAndNeck: false,
      shoulders: false,
      elbows: false,
      wrists: false,
      midBack: false,
      lowerBack: false,
      hip: false,
      knees: false,
      footAndAnkle: false,
      balance: false,
      vestibularRehab: false,
      massageTherapy: false,
    },
  },
  {
    name: "Joan Kroeze",
    img: "http://nephewpt.com/wp-content/uploads/2021/07/7-300x300.png",
    role_id: "MPT",
    role: "Physical Therapist",
    specialization: [],
    meta: "Team member since 2009.",
    painCategories: {
      headAndNeck: false,
      shoulders: false,
      elbows: false,
      wrists: false,
      midBack: false,
      lowerBack: false,
      hip: false,
      knees: false,
      footAndAnkle: false,
      balance: false,
      vestibularRehab: false,
      massageTherapy: false,
    },
  },
  {
    name: "Brittany Marsh",
    img: "http://nephewpt.com/wp-content/uploads/2021/07/3-300x300.png",
    role_id: "",
    role: "Front Desk Manager",
    specialization: [],
    meta: "Team member since 2020.",
    painCategories: {
      headAndNeck: false,
      shoulders: false,
      elbows: false,
      wrists: false,
      midBack: false,
      lowerBack: false,
      hip: false,
      knees: false,
      footAndAnkle: false,
      balance: false,
      vestibularRehab: false,
      massageTherapy: false,
    },
  },
  {
    name: "Rachel Nephew",
    img: "http://nephewpt.com/wp-content/uploads/2021/07/5-300x300.png",
    role_id: "",
    role: "Marketing, Relationship Development",
    specialization: [],
    meta: "Rejoined Team in 2018.",
    painCategories: {
      headAndNeck: false,
      shoulders: false,
      elbows: false,
      wrists: false,
      midBack: false,
      lowerBack: false,
      hip: false,
      knees: false,
      footAndAnkle: false,
      balance: false,
      vestibularRehab: false,
      massageTherapy: false,
    },
  },
  {
    name: "Amber Johnson",
    img: "http://nephewpt.com/wp-content/uploads/2021/07/8-300x300.png",
    role_id: "MSPT",
    role: "Physical Therapist, PRN",
    specialization: [],
    meta: "Team member since 2018.",
    painCategories: {
      headAndNeck: false,
      shoulders: false,
      elbows: false,
      wrists: false,
      midBack: false,
      lowerBack: false,
      hip: false,
      knees: false,
      footAndAnkle: false,
      balance: false,
      vestibularRehab: false,
      massageTherapy: false,
    },
  },
];
