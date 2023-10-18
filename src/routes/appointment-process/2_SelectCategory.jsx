import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/context";
import { getServices } from "../../axios/api";
import ContinueBack from "../../components/ContinueBack";
import ServicesRadioButtons from "../../components/ServicesRadioButtons";

function SelectCategory() {
  const userContext = useContext(UserContext);
  const [serviceSelected, setServiceSelected] = useState(true);
  const [continueIsEnabled, setContinueIsEnabled] = useState(false);
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [selected, setSelected] = useState({"id": 1, "name": undefined});

  useEffect(() => {
    async function fetchServices() {
      try {
        const response = await getServices();
        setServices(response);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchServices();
  }, []);

  useEffect(() => {
    if (selected.name == undefined) {
      setContinueIsEnabled(false);
    } else {
      setContinueIsEnabled(true);
    }
  }, [selected])

  function goBack() {
    navigate("/request-name");
  }

  function onContinue() {
    if (selected.name == undefined) {
      setServiceSelected(false);
      return;
    } else {
      setServiceSelected(true);
    }
    userContext.setSelectedService(selected);
    userContext.setAppointmentServiceName(selected.name);
    navigate("/pairing");
  }

  return (
    <div>
    <div>
      <h1 className="text-xl text-center">
        {userContext.user.firstName} what are you interested in?
      </h1>
      {!serviceSelected ? (
        <h1 className="text-xl text-center text-red-500">
          Please select a category.
        </h1>
      ) : (
        <></>
      )}
      <ServicesRadioButtons services={services} selected={selected} setSelected={setSelected} />
    </div>

    <ContinueBack goBack={goBack} onContinue={onContinue} continueIsEnabled={continueIsEnabled}/>
    </div>
  );
}
//  | Massage Therapy

export default SelectCategory;

// | Wrists | Mid-Back | Lower-Back | Hip | Knees | Foot & Ankle | Balance | Vestibular Rehab | Massage Therapy

// Head & Neck | Shoulders | Elbows | Wrists | Mid-Back | Lower-Back
// Hip | Knees | Foot & Ankle | Balance | Vestibular Rehab | Massage Therapy


/*

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

  function handleChange(service) {

  }

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
  if (checkboxes.length == 0) {
    setIsCategorySelected(false);
    return;
  } else {
    setIsCategorySelected(true);
  }

  const painCategoryArray = checkboxes.map((value) => ({
    name: value.key,
  }));
  userContext.setPainCategoryArray(painCategoryArray);
  console.log(painCategoryArray);
  navigate("/pairing");
}

return (
  <div>
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
                name={category.name}
                checked={category.checked}
                onChange={handleCheckboxChange}
              />
              {category.name}
            </label>
          );
        })}
      </div>
    </div>
  </div>
  <ServicesRadioButtons services={problemCategories} handleChange={handleChange}/>

  <ContinueBack goBack={goBack} onContinue={onContinue}/>
  </div>
);
}

*/