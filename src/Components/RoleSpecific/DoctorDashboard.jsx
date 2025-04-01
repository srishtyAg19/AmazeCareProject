import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../AuthContext";
import "../../App.css";
import ListMedicalRecords from "./ListMedicalRecords";
import ListAppointmentDetails from "./ListAppointmentDetails";

const DoctorDashboard = () => {
  const { token } = useContext(AuthContext); // To get authentication token
  const doctorId = localStorage.getItem("doctor_id"); // Assuming doctor ID is stored in localStorage
  const doctorName = "Doctor"; // Example doctor name
  const [appointments, setAppointments] = useState([]);
  const [showAppointments, setShowAppointments] = useState(false); // State to toggle appointment view
  const [todayAppointments, setTodayAppointments] = useState([]); // To store today's appointments
  const [errorMessage, setErrorMessage] = useState("");
  const [showMedicalRecords, setShowMedicalRecords] = useState(false); // Toggle medical records visibility
  const [showAppointmentDetails,setShowAppointmentDetails] = useState(false);

  // Fetch patient details (name)
  const fetchPatientName = async (patientId) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/patients/${patientId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data.name; // Assuming the patient object has a "name" field
    } catch (error) {
      console.error(`Error fetching patient details for patientId ${patientId}:`, error.message);
      return "Unknown"; // Default to 'Unknown' if fetching fails
    }
  };

  // Fetch appointments for the doctor
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/appointments", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const currentTime = new Date();
        const todayStart = new Date(currentTime.setHours(0, 0, 0, 0)); // Start of today
        const todayEnd = new Date(currentTime.setHours(23, 59, 59, 999)); // End of today

        const todayAppointments = response.data.filter(
          (appointment) =>
            appointment.doctorId === parseInt(doctorId) &&
            new Date(appointment.appointmentDate) >= todayStart &&
            new Date(appointment.appointmentDate) <= todayEnd
        );

        // Fetch patient names, handle partial errors
        const enrichedAppointments = await Promise.all(
          todayAppointments.map(async (appointment) => {
            const patientName = await fetchPatientName(appointment.patientId);
            return { ...appointment, patientName };
          })
        );

        setTodayAppointments(enrichedAppointments);
      } catch (error) {
        setErrorMessage("Failed to fetch appointments. Some data may be missing.");
        console.error("Error fetching appointments:", error.response ? error.response.data : error.message);
      }
    };

    if (doctorId && token) {
      fetchAppointments();
    }
  }, [doctorId, token]);

  // Toggle appointments visibility
  const toggleAppointments = () => {
    setShowAppointments((prevState) => !prevState);
  };

  // Toggle medical records visibility
  const toggleMedicalRecords = () => {
    setShowMedicalRecords((prevState) => !prevState);
  };

  // Cancel Appointment
  const cancelAppointment = async (appointmentId) => {
    try {
      await axios.put(
        `http://localhost:8080/api/appointments/${appointmentId}/cancel`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTodayAppointments((prevAppointments) =>
        prevAppointments.filter((appointment) => appointment.id !== appointmentId)
      );
      alert("Appointment canceled successfully");
    } catch (error) {
      console.error("Error canceling appointment:", error.message);
      alert("Failed to cancel appointment");
    }
  };

  // Reschedule Appointment
  const rescheduleAppointment = async (appointmentId) => {
    // Navigate to the reschedule form or show a date picker, for now just an alert
    alert(`Reschedule appointment with ID: ${appointmentId}`);
  };

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <div className="dashboard-logo">
          <h1>AmazeCare</h1>
        </div>
        <nav className="dashboard-menu">
          <Link to="/doctor-profile">Profile</Link> {/* Link to doctor's profile page */}
        </nav>
      </header>

      {/* Sidebar */}
      <aside className="dashboard-sidebar">
        <ul>
          {/* Patient Records */}
          <li>
            <Link to="#" onClick={toggleMedicalRecords}><button className="sidebar-button">Patient Records</button></Link>
            </li>
          {/* Doctor Appointments */}
          <li>
            <Link to="/doctor-appointments"><button className="sidebar-button">Doctor Appointments</button></Link>
            </li>
          {/* Update Prescription */}
          <li>
            {/*<Link to="/update-prescription/:appointmentId">Update Prescriptions</Link>*/}
            <button
              className="sidebar-button"
              onClick={() =>
                setShowAppointmentDetails(!showAppointmentDetails)
              }
            >
              {showAppointmentDetails
                ? "Hide Appointment Details"
                : "Appointment Details"}
            </button>
            </li>
          {/* Logout */}
          <li>
            <Link to="/"><button className="sidebar-button">Logout</button></Link>
            </li>
        </ul>
      </aside>

      {showAppointmentDetails && (
          <section className="appointment-details-section">
            <h3>Manage Appointment Details</h3>
            <ListAppointmentDetails allowAdd={true} allowUpdate={true} allowDelete={true} />
          </section>
        )}


      {/* Main Content */}
      <main className="dashboard-main">
        <section className="welcome-section">
          <h2>Welcome, Doctor</h2>
          <p>Manage your appointments and patient records efficiently.</p>
        </section>

        {/* Quick Actions */}
        <section className="quick-actions">
          <h3>Quick Actions</h3>
          <div className="action-cards">
            {/* Create Prescription */}
            <div className="action-card">
              <h4>Create Prescription</h4>
              <p>Prescribe medications for your patients.</p>
              {/* Dynamically generate the URL for create prescription */}
              <Link to={`/create-prescription/${todayAppointments[0]?.id}`}>
                <button>Create</button>
              </Link>
            </div>

            {/* Edit Profile */}
            <div className="action-card">
              <h4>Profile</h4>
              <p>Click the below button to edit your profile.</p>
              <Link to="/edit-doctor">
                <button>View/Edit</button>
              </Link>
            </div>
          </div>
        </section>

        {/* Medical Records Section */}
        {showMedicalRecords && (
          <section className="medicalrecords-section">
            <h3>Patient Medical Records</h3>
            <ListMedicalRecords
              allowAdd={true}
              allowUpdate={true}
              allowDelete={true}
            />
          </section>
        )}

        {/* Notifications Section */}
        <section className="notifications-section">
          <h3>Notifications</h3>
          <ul>
            <li>You have an upcoming appointment with Tanvi on Dec 30, 2024.</li>
            <li>Your Today's Appointments are updated.</li>
            <li>Reminder!!!..Create a Prescription for Tanvi.</li>
          </ul>
        </section>
      </main>
    </div>
  );
};

export default DoctorDashboard;
