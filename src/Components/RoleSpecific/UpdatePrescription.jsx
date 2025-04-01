import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../AuthContext";
import "../../App.css";

const UpdatePrescription = () => {
  const { token } = useContext(AuthContext);
  const [appointmentId, setAppointmentId] = useState("");
  const [patientId, setPatientId] = useState("");
  const [consultingDetails, setConsultingDetails] = useState("");
  const [recommendedTests, setRecommendedTests] = useState("");
  const [prescription, setPrescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isDetailsFetched, setIsDetailsFetched] = useState(false);
  const navigate = useNavigate();

  // Fetch appointment details
  const fetchAppointmentDetails = async (appointmentId) => {
    if (!appointmentId.trim()) {
      setErrorMessage("Please enter a valid Appointment ID.");
      return;
    }
    setErrorMessage(""); // Clear any previous error
    try {
      const response = await axios.get(
        `http://localhost:8080/api/appointment-details/${appointmentId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const { patientId, consultingDetails, recommendedTests, prescription } =
        response.data;
      setPatientId(patientId);
      setConsultingDetails(consultingDetails || "");
      setRecommendedTests(recommendedTests || "");
      setPrescription(prescription || "");
      setIsDetailsFetched(true);
    } catch (error) {
      setErrorMessage("Failed to fetch appointment details. Please try again.");
      console.error(
        "Error fetching appointment details:",
        error.response ? error.response.data : error.message
      );
      setIsDetailsFetched(false);
    }
  };

  // Handle prescription update submission
  const handlePrescriptionSubmit = async (e) => {
    e.preventDefault();

    if (!isDetailsFetched) {
      setErrorMessage("Please fetch appointment details first.");
      return;
    }

    const prescriptionData = {
      appointmentId,
      patientId,
      consultingDetails,
      recommendedTests,
      prescription,
    };

    try {
      const response = await axios.put(
        `http://localhost:8080/api/appointment-details/${appointmentId}`,
        prescriptionData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        alert("Prescription updated successfully");
        navigate("/doctor-dashboard");
      }
    } catch (error) {
      setErrorMessage("Failed to update prescription. Please try again.");
      console.error(
        "Error updating prescription:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#f0f8ff",
        fontFamily: "Arial, sans-serif",
        color: "#333",
      }}
    >
      <header style={{ marginBottom: "20px" }}>
        <h1 style={{ fontSize: "28px" }}>Update Prescription</h1>
      </header>

      <main
        style={{
          width: "100%",
          maxWidth: "600px",
          padding: "20px",
          backgroundColor: "#ffffff",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <form
          onSubmit={handlePrescriptionSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "15px" }}
        >
          <label htmlFor="appointmentId" style={{ fontWeight: "bold" }}>
            Appointment ID:
          </label>
          <input
            type="text"
            id="appointmentId"
            value={appointmentId}
            onChange={(e) => setAppointmentId(e.target.value)}
            placeholder="Enter Appointment ID"
            required
            style={{
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              fontSize: "16px",
              width: "100%",
            }}
          />
          <button
            type="button"
            onClick={() => fetchAppointmentDetails(appointmentId)}
            style={{
              padding: "10px 20px",
              borderRadius: "5px",
              border: "none",
              backgroundColor: "#007bff",
              color: "#fff",
              cursor: "pointer",
              fontSize: "16px",
            }}
            disabled={!appointmentId.trim()}
          >
            Fetch Appointment Details
          </button>

          {isDetailsFetched && (
            <>
              <label htmlFor="patientId" style={{ fontWeight: "bold" }}>
                Patient ID:
              </label>
              <input
                type="text"
                id="patientId"
                value={patientId}
                disabled
                style={{
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                  fontSize: "16px",
                  width: "100%",
                  backgroundColor: "#e9ecef",
                }}
              />

              <label htmlFor="consultingDetails" style={{ fontWeight: "bold" }}>
                Consulting Details:
              </label>
              <textarea
                id="consultingDetails"
                value={consultingDetails}
                onChange={(e) => setConsultingDetails(e.target.value)}
                placeholder="Update consulting details"
                required
                style={{
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                  fontSize: "16px",
                  width: "100%",
                  minHeight: "100px",
                }}
              ></textarea>

              <label htmlFor="recommendedTests" style={{ fontWeight: "bold" }}>
                Recommended Tests:
              </label>
              <textarea
                id="recommendedTests"
                value={recommendedTests}
                onChange={(e) => setRecommendedTests(e.target.value)}
                placeholder="Update recommended tests"
                required
                style={{
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                  fontSize: "16px",
                  width: "100%",
                  minHeight: "100px",
                }}
              ></textarea>

              <label htmlFor="prescription" style={{ fontWeight: "bold" }}>
                Prescription:
              </label>
              <textarea
                id="prescription"
                value={prescription}
                onChange={(e) => setPrescription(e.target.value)}
                placeholder="Update prescription"
                required
                style={{
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                  fontSize: "16px",
                  width: "100%",
                  minHeight: "100px",
                }}
              ></textarea>
            </>
          )}

          {errorMessage && (
            <p style={{ color: "red", fontSize: "14px" }}>{errorMessage}</p>
          )}

          <button
            type="submit"
            style={{
              padding: "10px 20px",
              borderRadius: "5px",
              border: "none",
              backgroundColor: "#28a745",
              color: "#fff",
              cursor: "pointer",
              fontSize: "16px",
              marginTop: "10px",
            }}
            disabled={!isDetailsFetched}
          >
            Update Prescription
          </button>
        </form>
      </main>
    </div>
  );
};

export default UpdatePrescription;
