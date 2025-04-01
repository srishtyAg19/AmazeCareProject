import axios from "axios";

const BASE_URL = "http://localhost:8080/api";

// Create an Axios instance with default settings
const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Utility function for error handling
const handleApiError = (error) => {
  const errorResponse = error.response?.data || {
    message: "An unknown error occurred",
  };
  console.error(`[API] Error: ${errorResponse.message}`);
  throw errorResponse; // Throw the error for further handling
};

// Login API
export const loginUser = async (credentials) => {
  try {
    console.log("[API] loginUser - Request:", credentials);
    const response = await apiClient.post("/authenticate/login", credentials);
    console.log("[API] loginUser - Response:", response.data);
    return response.data; // Return the response data
  } catch (error) {
    handleApiError(error);
  }
};

// Register API
export const registerUser = async (userDetails) => {
  try {
    console.log("[API] registerUser - Request:", userDetails);
    const response = await apiClient.post("/authenticate/register", userDetails);
    console.log("[API] registerUser - Response:", response.data);
    return response.data; // Return the response data
  } catch (error) {
    handleApiError(error);
  }
};

// Fetch Patient Profile API
export const fetchPatientProfile = async (patientId) => {
  try {
    console.log("[API] fetchPatientProfile - Request for ID:", patientId);
    const response = await apiClient.get(`/patients/${patientId}`);
    console.log("[API] fetchPatientProfile - Response:", response.data);
    return response.data; // Return the response data
  } catch (error) {
    handleApiError(error);
  }
};

// Create Patient API
export const createPatient = async (patientData) => {
  try {
    console.log("[API] createPatient - Request:", patientData);
    const response = await apiClient.post(`/patients`, patientData);
    console.log("[API] createPatient - Response:", response.data);
    return response.data; // Return the response data
  } catch (error) {
    handleApiError(error);
  }
};

// Update Patient Profile API
export const updatePatientProfile = async (patientId, profileData) => {
  try {
    console.log("[API] updatePatientProfile - Request for ID:", patientId);
    const response = await apiClient.put(`/patients/${patientId}`, profileData);
    console.log("[API] updatePatientProfile - Response:", response.data);
    return response.data; // Return the response data
  } catch (error) {
    handleApiError(error);
  }
};

// Example for adding Authorization header dynamically if needed
export const setAuthToken = (token) => {
  if (token) {
    apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    console.log("[API] Authorization token set");
  } else {
    delete apiClient.defaults.headers.common["Authorization"];
    console.log("[API] Authorization token removed");
  }
};
