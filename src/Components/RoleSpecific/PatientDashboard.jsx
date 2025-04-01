import React, { useState, useEffect, useContext } from "react";
import EditProfile from "./EditProfile";
import "../../App.css";
import { Link, Routes, Route } from "react-router-dom";
import axios from "axios";
import PatientProfile from "./PatientProfile";
import BookAppointment from "./BookAppointment";
import UpcomingAppointments from "./UpcomingAppointments";
import AllAppointments from "./AllAppointments"; // Import the new component
import { AuthContext } from "../AuthContext";
import ListDoctors from "./ListDoctors";
import ListMedicalRecords from "./ListMedicalRecords";
import ListAppointmentDetails from "./ListAppointmentDetails";
import ListAppointments from "./ListAppointments";

const PatientDashboard = () => {
  const [patientName, setPatientName] = useState("");
  const [showAllAppointments, setShowAllAppointments] = useState(false);
  const [showAvailableDoctors, setShowAvailableDoctors] = useState(false); // State to toggle all appointments
  const [showMedicalRecords, setShowMedicalRecords] = useState(false);
  const [showAppointmentDetails, setShowAppointmentDetails] = useState(false);
  const user_id = localStorage.getItem("user_id");
  const patient_id = localStorage.getItem("patient_id");

  const fetchPatientData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/patients/${parseInt(patient_id)}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPatientName(response?.data?.fullName || "Patient");
    } catch (error) {
      console.error("Error fetching patient data:", error);
    }
  };

  const { token } = useContext(AuthContext);

  useEffect(() => {
    if (patient_id && token) {
      fetchPatientData();
    } else {
      console.error("User ID or token not found in localStorage.");
    }
  }, [patient_id, token]);

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <div className="dashboard-logo">
          <h1>AmazeCare</h1>
        </div>
        <h3>Patient Dashboard</h3>
        <nav className="dashboard-menu">
          <Link to="/profile">Profile</Link> {/* Profile link */}
        </nav>
      </header>

      {/* Sidebar */}
      <aside className="dashboard-sidebar">
        <ul>
          <li>
          <button
  className="sidebar-button"
  onClick={() => setShowAllAppointments(!showAllAppointments)}
>
  {showAllAppointments ? "Hide Appointments" : "View All Appointments"}
</button>

<Link to="/edit-profile">
  <button className="sidebar-button">Edit Profile</button>
</Link>

<button
  className="sidebar-button"
  onClick={() => setShowAppointmentDetails(!showAppointmentDetails)}
>
  {showAppointmentDetails ? "Hide Appointment Details" : "View Appointment Details"}
</button>

<button
  className="sidebar-button"
  onClick={() => setShowMedicalRecords(!showMedicalRecords)}
>
  {showMedicalRecords ? "Hide Medical Records" : "View Medical Records"}
</button>

<button
  className="sidebar-button"
  onClick={() => setShowAvailableDoctors(!showAvailableDoctors)}
>
  {showAvailableDoctors ? "Hide Available Doctors" : "Available Doctors"}
</button>

<Link to="/">
  <button className="logout-button">Logout</button>
</Link>

          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="dashboard-main">
        <Routes>
          <Route
            path="/"
            element={
              <section className="welcome-section">
                <h2>Welcome, Patient</h2>
                <p>Your health, simplified and accessible. Here's your quick overview.</p>
              </section>
            }
          />
          <Route path="/profile" element={<PatientProfile />} />
        </Routes>

        {/* Quick Actions */}
        <section className="quick-actions">
          <h3>Quick Actions</h3>
          <div className="action-cards">
            <div className="action-card">
              <h4>Book Appointment</h4>
              <p>Schedule a consultation with your doctor.</p>
              <BookAppointment />
            </div>
            <div className="action-card">
              <UpcomingAppointments />
            </div>
          </div>
        </section>

        {/* All Appointments */}
        {showAllAppointments && (
          <section className="all-appointments">
            <ListAppointments allowAdd={false} allowUpdate={true} allowDelete={true} />
          </section>
        )}
        {/* Available Doctors */}
        {showAvailableDoctors && (
          <section className="available-doctors">
            <ListDoctors allowAdd={false} allowUpdate={false} allowDelete={false} />
          </section>
        )}

        {showMedicalRecords && (
          <section className="medical-records">
            <ListMedicalRecords allowAdd={false} allowUpdate={false} allowDelete={false} />
          </section>
        )}

        {showAppointmentDetails && (
          <ListAppointmentDetails allowAdd={false} allowUpdate={false} allowDelete={false} />
        )}

        <section className="notifications-section">
          <h3>Notifications</h3>
          <ul>
            <li>You have an upcoming appointment on Dec 20, 2024.</li>
            <li>Your lab results from Dec 10, 2024, are now available.</li>
            <li>New prescription added by Dr. Smith.</li>
          </ul>
        </section>
      </main>
    </div>
  );
};

export default PatientDashboard;
