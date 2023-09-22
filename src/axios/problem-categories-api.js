import axios from "axios";
import baseurl from "./baseUrl";

const apiUrl = baseurl + "/problem-area";

export function getProblemCategories(setLoading, setProblemCategories) {
    axios.get(apiUrl + "/get-categories")
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