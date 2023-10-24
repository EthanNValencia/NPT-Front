import axios from "axios";

const publicUrl = "http://localhost:8765/npt-service/api/v1/public";
const authUrl = "http://localhost:8765/security-service/api/v1/auth";
const faqsUrl = publicUrl + "/faqs/";

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

const employeeApiUrl = publicUrl + "/employees/";

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

const specialtyApiUrl = publicUrl + "/problem-area";

export async function getServices() {
  try {
    const response = await axios.get(specialtyApiUrl + "/get-categories");
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

const appointmentApiUrl = publicUrl + "/appointment/";

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

const officeApiUrl = publicUrl + "/office/";

export async function getOffices() {
  try {
    const response = await axios.get(officeApiUrl);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export async function register(user, type) {
  const registerUrl = authUrl + "/register/" + type;

  const requestBody = {
    ...user,
  };

  try {
    const response = await axios.get(registerUrl, requestBody);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}
