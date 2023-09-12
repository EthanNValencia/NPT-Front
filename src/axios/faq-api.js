import axios from "axios";

const apiUrl = "http://localhost:8085/api/v1/faqs";

export function submitFAQ(message) {
    var responseMessage;
    const requestBody = {
        "questionIsAnswered": false,
        "question": null,
        "answer": message
      }
    axios.post(apiUrl + "/ask-question", requestBody)
    .then((response) => {
      responseMessage = `Post created with ID: ${response.data.id}`;
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