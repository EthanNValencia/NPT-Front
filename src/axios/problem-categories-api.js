import axios from "axios";

const apiUrl = "http://localhost:8085/api/v1/problem-area";



export function getProblemCategories(setLoading, setProblemCategories) {
    axios.get(apiUrl + "/get-categories")
    .then((response) => {
        setLoading(false);
        setProblemCategories(response.data);
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
      setLoading(false);
    });
}