import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../AuthContext";
import "../../App.css";

const CreatePrescription = () => {
  const { token } = useContext(AuthContext); // To get authentication token
  const doctorId = localStorage.getItem("doctor_id"); // Assuming doctor ID is stored in localStorage
  const [appointmentId, setAppointmentId] = useState(""); // Appointment ID for the prescription
  const [patientId, setPatientId] = useState(""); // Patient ID to create prescription for
  const [consultingDetails, setConsultingDetails] = useState(""); // Consulting details of the patient
  const [recommendedTests, setRecommendedTests] = useState(""); // Recommended tests for the patient
  const [prescription, setPrescription] = useState(""); // Prescription details
  const [errorMessage, setErrorMessage] = useState("");

  // Using useNavigate from react-router-dom for navigation
  const navigate = useNavigate();

  // Handle form submission for prescription creation
  const handlePrescriptionSubmit = async (e) => {
    e.preventDefault();

    const prescriptionData = {
      appointmentId,
      patientId,
      doctorId,
      consultingDetails,
      recommendedTests,
      prescription,
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/api/appointment-details", // Updated API URL
        prescriptionData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        alert("Prescription created successfully");
        navigate("/doctor-dashboard"); // Navigate to the doctor dashboard after successful creation
      }
    } catch (error) {
      setErrorMessage("Failed to create prescription");
      console.error(
        "Error creating prescription:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <div className="edit-profile-container">
    <main className="edit-profile-form">
      <form onSubmit={handlePrescriptionSubmit}>
        <div className="form-group">
          <h1>Create Prescription</h1>
          <label htmlFor="appointmentId">Appointment ID:</label>
          <input
            className="form-input"
            type="text"
            id="appointmentId"
            value={appointmentId}
            onChange={(e) => setAppointmentId(e.target.value)}
            required
          />
        </div>
  
        <div className="form-group">
          <label htmlFor="patientId">Patient ID:</label>
          <input
            className="form-input"
            type="text"
            id="patientId"
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
            required
          />
        </div>
  
        <div className="form-group">
          <label htmlFor="consultingDetails">Consulting Details:</label>
          <textarea
            className="form-input"
            id="consultingDetails"
            value={consultingDetails}
            onChange={(e) => setConsultingDetails(e.target.value)}
            required
          ></textarea>
        </div>
  
        <div className="form-group">
          <label htmlFor="recommendedTests">Recommended Tests:</label>
          <textarea
            className="form-input"
            id="recommendedTests"
            value={recommendedTests}
            onChange={(e) => setRecommendedTests(e.target.value)}
            required
          ></textarea>
        </div>
  
        <div className="form-group">
          <label htmlFor="prescription">Prescription:</label>
          <textarea
            className="form-input"
            id="prescription"
            value={prescription}
            onChange={(e) => setPrescription(e.target.value)}
            required
          ></textarea>
        </div>
  
        {errorMessage && <p className="form-error">{errorMessage}</p>}
  
        <button className="submit-button" type="submit">
          Create Prescription
        </button>
      </form>
    </main>
  </div>
  
  );
};

export default CreatePrescription;
