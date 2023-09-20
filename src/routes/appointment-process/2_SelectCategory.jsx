import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/context";
import { getProblemCategories } from "../../axios/problem-categories-api";

function SelectCategory() {
  const [isCategorySelected, setIsCategorySelected] = useState(true);
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

  /*
{
  "key": "Head & Neck",
  "selected": true
}
  */

  function onContinue() {
    if (checkboxes.length == 0) {
      setIsCategorySelected(false);
      return;
    } else {
      setIsCategorySelected(true);
    }

    const painCategoryArray = checkboxes.map((value) => ({
      problemArea: value.key,
    }));
    userContext.setPainCategoryArray(painCategoryArray);
    console.log(painCategoryArray);
    navigate("/pairing");
  }

  return (
    <div>
      <h1 className="text-xl text-center">
        {userContext.user.firstName} what are you interested in?
      </h1>

      {!isCategorySelected ? (
        <h1 className="text-xl text-center text-red-500">
          Please select a category.
        </h1>
      ) : (
        <></>
      )}

      <div className="flex justify-center items-center p-4 pb-20">
        <div className="grid grid-flow-row grid-cols-2 gap-2">
          {problemCategories.map((category) => {
            return (
              <label key={category.id}>
                <input
                  className=""
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

export default SelectCategory;

// | Wrists | Mid-Back | Lower-Back | Hip | Knees | Foot & Ankle | Balance | Vestibular Rehab | Massage Therapy

// Head & Neck | Shoulders | Elbows | Wrists | Mid-Back | Lower-Back
// Hip | Knees | Foot & Ankle | Balance | Vestibular Rehab | Massage Therapy
