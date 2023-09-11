import React, { useState } from "react";
import About from "../wp-components/About";
import Home from "../wp-components/Home";
import Hours from "../wp-components/Hours";
import Navbar from "../wp-components/Navbar";
import HelpMyPain from "../wp-components/HelpMyPain";
import StartPT from "../wp-components/StartPT";
import PelvicFloor from "../wp-components/PelvicFloor";
import Calendar from "react-calendar";
import NtButton from "../components/NtButton";

function Everything() {
  const [date, setDate] = useState(new Date());

  const calendarOnChange = (date) => {
    setDate(date);
    console.log(date);
  };

  return (
    <div>
      <NtButton inactiveButtonLabel="Begin" />
      <Calendar
        onChange={calendarOnChange}
        value={date}
        defaultValue={new Date()}
      />

      <p className="bg-npt_colors-10">npt_colors-10</p>
      <p className="bg-npt_colors-20">npt_colors-20</p>
      <p className="bg-npt_colors-30">npt_colors-30</p>
      <p className="bg-npt_colors-300">npt_colors-300</p>
      <p className="bg-npt_colors-350">npt_colors-350</p>
      <p className="bg-npt_colors-1">npt_colors-300</p>
      <p className="bg-npt_colors-2">npt_colors-350</p>
      <p className="font-lato">Testing new font!</p>

      <Navbar></Navbar>
      <About></About>
      <Home></Home>
      <Hours></Hours>
      <HelpMyPain></HelpMyPain>
      <StartPT></StartPT>
      <PelvicFloor></PelvicFloor>
    </div>
  );
}

export default Everything;
