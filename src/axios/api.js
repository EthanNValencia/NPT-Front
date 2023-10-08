import axios from "axios";

const baseUrl = "http://localhost:8765/npt-service/api/v1/public";
// "http://localhost:8765/npt-service/api/v1/public";
// const apiUrl = "http://localhost:8085/api/v1/public/faqs"; // This works
const faqsUrl = baseUrl + "/faqs/";

export async function postFaq(message) {
  const requestBody = {
    questionIsAnswered: false,
    question: null,
    answer: message
  };

  try {
    const response = await axios.post(faqsUrl, requestBody);
    return response.data;
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
}

export async function getAnsweredFAQs() {
  try {
    const response = await axios.get(faqsUrl);
    return response.data;
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
}

const employeeApiUrl = baseUrl + "/employees";

// This is the endpoint used to get the employees in the about us. 
export function getEmployees(setLoading, setEmployees) {
  axios.get(employeeApiUrl + "/get-all")
  .then((response) => {
      setLoading(false);
      console.log(response.data);
      setEmployees(response.data);
  })
  .catch((error) => {
    console.error('Error fetching data:', error);
    setLoading(false);
  });
}

export function findMyTherapists(setTherapistArray, message) {
  // This takes in the json array of interests.
  console.log(message);
  var matchedTherapists;
  const requestBody = message;
  axios.post(employeeApiUrl + "/get-by-problem-areas", requestBody)
  .then((response) => {
    matchedTherapists = response.data;
    setTherapistArray(matchedTherapists);
    console.log(matchedTherapists);
  })
  .catch((error) => {
    console.error('Error creating post:', error);
  });
}

const specialtyApiUrl = baseUrl + "/problem-area";

export function getProblemCategories(setLoading, setProblemCategories) {
    axios.get(specialtyApiUrl + "/get-categories")
    .then((response) => {
        setLoading(false);
        console.log(response.data);
        setProblemCategories(response.data);
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
      setLoading(false);
    });
}