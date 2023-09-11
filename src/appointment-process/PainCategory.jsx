import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/context";

function PainCategory() {
  const [checkboxes, setCheckboxes] = useState({
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
  const userContext = useContext(UserContext);
  const navigate = useNavigate();

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setCheckboxes({
      ...checkboxes,
      [name]: checked,
    });
  };

  function goBack() {
    navigate("/request-name");
  }

  function onContinue() {
    userContext.setPainCategoryArray(checkboxes);
    navigate("/pairing");
  }

  return (
    <div>
      <h1 className="text-xl text-center">
        {userContext.user.firstName} where is the pain that you are
        experiencing?
      </h1>
      <div className="grid grid-flow-row grid-cols-2">
        <label>
          <input
            type="checkbox"
            name="headAndNeck"
            checked={checkboxes.headAndNeck}
            onChange={handleCheckboxChange}
          />
          Head & Neck
        </label>

        <label>
          <input
            type="checkbox"
            name="shoulders"
            checked={checkboxes.shoulders}
            onChange={handleCheckboxChange}
          />
          Shoulders
        </label>

        <label>
          <input
            type="checkbox"
            name="elbows"
            checked={checkboxes.elbows}
            onChange={handleCheckboxChange}
          />
          Elbows
        </label>

        <label>
          <input
            type="checkbox"
            name="wrists"
            checked={checkboxes.wrists}
            onChange={handleCheckboxChange}
          />
          Wrists
        </label>

        <label>
          <input
            type="checkbox"
            name="midBack"
            checked={checkboxes.midBack}
            onChange={handleCheckboxChange}
          />
          Mid-Back
        </label>

        <label>
          <input
            type="checkbox"
            name="lowerBack"
            checked={checkboxes.lowerBack}
            onChange={handleCheckboxChange}
          />
          Lower-Back
        </label>

        <label>
          <input
            type="checkbox"
            name="hip"
            checked={checkboxes.hip}
            onChange={handleCheckboxChange}
          />
          Hip
        </label>

        <label>
          <input
            type="checkbox"
            name="knees"
            checked={checkboxes.knees}
            onChange={handleCheckboxChange}
          />
          Knees
        </label>

        <label>
          <input
            type="checkbox"
            name="footAndAnkle"
            checked={checkboxes.footAndAnkle}
            onChange={handleCheckboxChange}
          />
          Foot & Ankle
        </label>

        <label>
          <input
            type="checkbox"
            name="otherOptions"
            checked={checkboxes.otherOptions}
            onChange={handleCheckboxChange}
          />
          Other Options
        </label>
      </div>

      {checkboxes.otherOptions ? (
        <div className="grid grid-flow-row grid-cols-2">
          <label>
            <input
              type="checkbox"
              name="balance"
              checked={checkboxes.balance}
              onChange={handleCheckboxChange}
            />
            Balance
          </label>

          <label>
            <input
              type="checkbox"
              name="vestibularRehab"
              checked={checkboxes.vestibularRehab}
              onChange={handleCheckboxChange}
            />
            Vestibular Rehab
          </label>

          <label>
            <input
              type="checkbox"
              name="massageTherapy"
              checked={checkboxes.massageTherapy}
              onChange={handleCheckboxChange}
            />
            Massage Therapy
          </label>
        </div>
      ) : (
        <></>
      )}
      <div className="flex gap-20 justify-center items-center">
        <button
          type="button"
          className="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-npt_colors-350 hover:bg-npt_colors-300 transition ease-in-out duration-150 cursor-pointer"
          disabled=""
          onClick={goBack}
        >
          Go Back
        </button>
        <button
          type="button"
          className="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-npt_colors-350 hover:bg-npt_colors-300 transition ease-in-out duration-150 cursor-pointer"
          disabled=""
          onClick={onContinue}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
//  | Massage Therapy

export default PainCategory;

// | Wrists | Mid-Back | Lower-Back | Hip | Knees | Foot & Ankle | Balance | Vestibular Rehab | Massage Therapy

// Head & Neck | Shoulders | Elbows | Wrists | Mid-Back | Lower-Back
// Hip | Knees | Foot & Ankle | Balance | Vestibular Rehab | Massage Therapy
