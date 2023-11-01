import axios from "axios";

const publicUrl = "http://localhost:8765/npt-service/api/v1/public";
const authUrl = "http://localhost:8765/security-service/api/v1/auth";
const privateUrl = "http://localhost:8765/npt-service/api/v1/auth";
const errorReportingUrl =
  "http://localhost:8765/error-service/api/v1/public/error/";
const faqsUrl = publicUrl + "/faqs/";
const employeeApiUrl = publicUrl + "/employees/";
const specialtyApiUrl = publicUrl + "/services";
const appointmentApiUrl = publicUrl + "/appointment/";
const officeApiUrl = publicUrl + "/office/";

export async function postFaq(message) {
  const requestBody = {
    questionIsAnswered: false,
    question: message,
    answer: null,
  };
  try {
    const response = await axios.post(faqsUrl, requestBody);
    return response.data;
  } catch (error) {
    handleErrorReporting(error);
    console.error("Error creating post:", error);
    throw error;
  }
}

export async function getAnsweredFAQs() {
  try {
    const response = await axios.get(faqsUrl);
    return response.data;
  } catch (error) {
    handleErrorReporting(error);
    console.error("Error creating post:", error);
    throw error;
  }
}

// This is the endpoint used to get the employees in the about us.
export async function getEmployees() {
  try {
    const response = await axios.get(employeeApiUrl);
    return response.data;
  } catch (error) {
    handleErrorReporting(error);
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
    handleErrorReporting(error);
    console.error("Error fetching therapist matches:", error);
    throw error;
  }
}

export async function getServices() {
  try {
    const response = await axios.get(specialtyApiUrl);
    return response.data;
  } catch (error) {
    handleErrorReporting(error);
    console.error("Error fetching data:", error);
    throw error;
  }
}

export async function postAppointment(appointment) {
  const requestBody = {
    ...appointment,
  };
  try {
    const response = await axios.post(appointmentApiUrl, requestBody);
    return response.data;
  } catch (error) {
    handleErrorReporting(error);
    console.error("Error creating post:", error);
    throw error;
  }
}

export async function getOffices() {
  try {
    const response = await axios.get(officeApiUrl);
    return response.data;
  } catch (error) {
    handleErrorReporting(error);
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
    const response = await axios.post(registerUrl, requestBody);
    return response.data.token;
  } catch (error) {
    handleErrorReporting(error);
    console.error("Error fetching data:", error);
    throw error;
  }
}

export async function authenticate(user) {
  const authenticationUrl = authUrl + "/authenticate";
  const requestBody = {
    ...user,
  };
  try {
    const response = await axios.post(authenticationUrl, requestBody);
    return response.data.token;
  } catch (error) {
    handleErrorReporting(error);
    console.error("Error fetching data:", error);
    throw error;
  }
}

export async function validate(token, action) {
  const validationUrl = authUrl + "/validate/" + token;
  const requestBody = {
    ...action,
  };
  try {
    const response = await axios.post(validationUrl, requestBody);
    return response.data;
  } catch (error) {
    handleErrorReporting(error);
    console.error("Error fetching data:", error);
    throw error;
  }
}

export async function validateAction(token, action) {
  const registerUrl = authUrl + "/validate/" + token;
  const requestBody = {
    ...action,
  };
  try {
    const response = await axios.post(registerUrl, requestBody);
    return response.data;
  } catch (error) {
    handleErrorReporting(error);
    console.error("Error fetching data:", error);
    throw error;
  }
}

export async function adminGetEmployees(token) {
  const adminEmployeeUrl = privateUrl + "/employees/";
  try {
    const response = await axios.get(adminEmployeeUrl, token);
    return response.data;
  } catch (error) {
    handleErrorReporting(error);
    console.error("Error fetching data:", error);
    throw error;
  }
}

export async function adminGetUnansweredQuestions(token) {
  const adminFaqUrl = privateUrl + "/faqs/get-all";
  try {
    const response = await axios.get(adminFaqUrl, token);
    return response.data;
  } catch (error) {
    handleErrorReporting(error);
    console.error("Error fetching data:", error);
    throw error;
  }
}

async function handleErrorReporting(error) {
  try {
    await reportError(error);
  } catch (reportingError) {
    console.error(
      "An error occurred while attempting to report the error:",
      reportingError
    );
  }
}

export async function reportError(error) {
  const requestBody = {
    ...error,
  };
  try {
    await axios.post(errorReportingUrl, requestBody);
  } catch (error) {
    console.error("Error reporting error:", error);
    throw error;
  }
}
