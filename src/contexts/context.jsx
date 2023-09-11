import React, { useContext, useState } from "react";
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
  const [painCategories, setPainCategories] = useState({
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
    otherOptions: false,
  });

  function setName(firstName, lastName) {
    setUser({
      firstName: firstName,
      lastName: lastName,
    });
  }

  function setPainCategoryArray(checkboxes) {
    setPainCategories({
      ...checkboxes,
    });
  }

  return (
    <UserContext.Provider
      value={{ user, setName, painCategories, setPainCategoryArray }}
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
