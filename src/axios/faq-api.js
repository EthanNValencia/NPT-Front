import axios from "axios";
import baseurl from "./baseUrl";

// "http://localhost:8765/npt-service/api/v1/public";

const apiUrl = baseurl + "/faqs";

// const apiUrl = "http://localhost:8085/api/v1/public/faqs"; // This works

export function submitFAQ(message) {
    var responseMessage;
    const requestBody = {
        "questionIsAnswered": false,
        "question": null,
        "answer": message
      }
    axios.post(apiUrl + "/ask-question", requestBody)
    .then((response) => {
      responseMessage = `Question created with ID: ${response.data.id}`;
      console.log(responseMessage);
      return responseMessage;
    })
    .catch((error) => {
      console.error('Error creating post:', error);
    });
}

export function getAllAnsweredFAQs(setLoading, setFAQs) {
    axios.get(apiUrl + "/get-answered-questions")
    .then((response) => {
        setLoading(false);
      setFAQs(response.data);
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
      setLoading(false);
    });
}