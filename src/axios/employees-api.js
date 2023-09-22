import axios from "axios";
import baseurl from "./baseUrl";

const apiUrl = baseurl + "/employees";

// This is the endpoint used to get the employees in the about us. 
export function getEmployees(setLoading, setEmployees) {
  axios.get(apiUrl + "/get-all")
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
  axios.post(apiUrl + "/get-by-problem-areas", requestBody)
  .then((response) => {
    matchedTherapists = response.data;
    setTherapistArray(matchedTherapists);
    console.log(matchedTherapists);
  })
  .catch((error) => {
    console.error('Error creating post:', error);
  });
}