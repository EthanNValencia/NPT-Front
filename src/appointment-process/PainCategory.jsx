import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/context";
import { getProblemCategories } from "../axios/problem-categories-api";

function PainCategory() {
  const [checkboxes, setCheckboxes] = useState([]);
  const userContext = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [problemCategories, setProblemCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    async function getAnsweredFAQs() {
      getProblemCategories(setLoading, setProblemCategories);
    }
    getAnsweredFAQs();
  }, []);

  const handleCheckboxChange = (event) => {
    // I don't know why this was such a pain the ass. Maybe I am just stupid today.
    const { name, checked } = event.target;

    if (checkboxes.find((item) => item.key === name)) {
      setCheckboxes(
        checkboxes.map((value) => {
          if (value.key === name) {
            value.selected = !value.selected;
          }
          return value;
        })
      );
    } else {
      setCheckboxes([...checkboxes, { key: name, selected: checked }]); // Do this if array doesn't contain the key.
      return;
    }
    setCheckboxes(checkboxes.filter((value) => value.selected === true));
  };

  function goBack() {
    navigate("/request-name");
  }

  function onContinue() {
    userContext.setPainCategoryArray(checkboxes);
    console.log(checkboxes);
    // navigate("/pairing");
  }

  return (
    <div>
      <h1 className="text-xl text-center">
        {userContext.user.firstName} what are you interested in?
      </h1>
      <div className="grid grid-flow-row grid-cols-2">
        {problemCategories.map((category) => {
          return (
            <label key={category.id}>
              <input
                type="checkbox"
                name={category.problemArea}
                checked={category.checked}
                onChange={handleCheckboxChange}
              />
              {category.problemArea}
            </label>
          );
        })}
      </div>
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
