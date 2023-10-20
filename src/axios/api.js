import axios from "axios";

const baseUrl = "http://localhost:8765/npt-service/api/v1/public";
const faqsUrl = baseUrl + "/faqs/";

export async function postFaq(message) {
  const requestBody = {
    questionIsAnswered: false,
    question: null,
    answer: message,
  };
  try {
    const response = await axios.post(faqsUrl, requestBody);
    return response.data;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
}

export async function getAnsweredFAQs() {
  try {
    const response = await axios.get(faqsUrl);
    return response.data;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
}

const employeeApiUrl = baseUrl + "/employees/";

// This is the endpoint used to get the employees in the about us.
export async function getEmployees() {
  try {
    const response = await axios.get(employeeApiUrl);
    return response.data;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
}

export async function findMyMatch(services) {
  try {
    const requestBody = services;
    const response = await axios.post(
      employeeApiUrl + "services/",
      requestBody
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching therapist matches:", error);
    throw error;
  }
}

const specialtyApiUrl = baseUrl + "/problem-area";

export async function getServices() {
  try {
    const response = await axios.get(specialtyApiUrl + "/get-categories");
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

const appointmentApiUrl = baseUrl + "/appointment/";

export async function postAppointment(appointment) {
  const requestBody = {
    ...appointment,
  };
  try {
    const response = await axios.post(appointmentApiUrl, requestBody);
    return response.data;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
}

const officeApiUrl = baseUrl + "/office/";

export async function getOffices() {
  try {
    const response = await axios.get(officeApiUrl);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}
