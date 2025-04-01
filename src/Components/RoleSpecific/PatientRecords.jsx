import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../AuthContext"; // Ensure your AuthContext is set up correctly
import { useParams } from "react-router-dom"; // To get the patient ID from the URL

const PatientRecords = () => {
  const [patientRecords, setPatientRecords] = useState([]);
  const [loading, setLoading] = useState(true); // For loading state
  const [error, setError] = useState(null); // For handling errors
  const { token } = useContext(AuthContext);
  const { patientId } = useParams(); // Get the patient ID from the URL

  // Fetch the patient records from the backend
  const fetchPatientRecords = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/medical_records?patientId=${patientId}`, // Use the query parameter to filter by patient ID
        {
          headers: {
            Authorization: `Bearer ${token}`, // Use the token in Authorization header
          },
        }
      );
      setPatientRecords(response?.data || []); // Set the fetched patient records
      setLoading(false); // Stop loading after data is fetched
    } catch (error) {
      console.error("Error fetching patient records:", error);
      setError("Failed to fetch patient records."); // Set error message
      setLoading(false); // Stop loading even if there's an error
    }
  };

  useEffect(() => {
    if (patientId && token) {
      fetchPatientRecords();
    } else {
      setError("Patient ID or token not found.");
      setLoading(false);
    }
  }, [patientId, token]);

  if (loading) {
    return <p>Loading...</p>; // Show loading message while data is being fetched
  }

  return (
    <div className="patient-records-container">
      <h2>Patient Records</h2>
      {error ? (
        <p>{error}</p> // Show error message if there's an issue fetching data
      ) : patientRecords.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Record ID</th>
              <th>Patient ID</th>
              <th>Record Date</th>
              <th>Diagnosis</th>
              <th>Treatment Plan</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {patientRecords.map((record) => (
              <tr key={record.id}>
                <td>{record.id}</td>
                <td>{record.patientId}</td>
                <td>{record.recordDate}</td>
                <td>{record.diagnosis}</td>
                <td>{record.treatmentPlan}</td>
                <td>{record.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No records found for this patient.</p> // Show if no records are found
      )}
    </div>
  );
};

export default PatientRecords;
