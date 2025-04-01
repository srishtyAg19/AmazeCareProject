import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../AuthContext";
import ListUsers from "./ListUsers";
import ListDoctors from "./ListDoctors";
import ListAppointments from "./ListAppointments";
import ListAppointmentDetails from "./ListAppointmentDetails";
import ListPatients from "./ListPatients";
import ListMedicalRecords from "./ListMedicalRecords";
import { Link } from "react-router-dom";
import '../../App.css';

const AdminDashboard = () => {
  const { token } = useContext(AuthContext);

  const [showUsers, setShowUsers] = useState(false);
  const [showAdmins, setShowAdmins] = useState(false);
  const [showPatients, setShowPatients] = useState(false);
  const [showDoctors, setShowDoctors] = useState(false);
  const [showAppointments, setShowAppointments] = useState(false);
  const [showAppointmentDetails, setShowAppointmentDetails] = useState(false);
  const [showMedicalRecords, setShowMedicalRecords] = useState(false);

  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showAddPatientModal, setShowAddPatientModal] = useState(false);
  const [showAddDoctorModal, setShowAddDoctorModal] = useState(false);

  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
  });

  const [patientDetails, setPatientDetails] = useState({
    fullName: "",
    email: "",
    gender: "",
    dateOfBirth: "",
    contactNumber: "",
  });

  const [doctorDetails, setDoctorDetails] = useState({
    name: "",
    specialty: "",
    experience: "",
    qualification: "",
    designation: "",
    contactNumber: "",
  });

  // Handle adding a new user
  const handleAddUser = async (e) => {
    e.preventDefault();
    console.log("Submitting user details:", userDetails);

    if (!userDetails.username || !userDetails.email || !userDetails.password || !userDetails.role) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/api/users",
        userDetails,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        alert("User added successfully!");
        setShowAddUserModal(false);
        setUserDetails({ username: "", email: "", password: "", role: "" });
      } else {
        alert("Failed to add user. Please try again.");
      }
    } catch (error) {
      console.error("Error adding user:", error.response?.data || error.message);
      alert("An error occurred while adding the user.");
    }
  };

  // Handle adding a new patient
  const handleAddPatient = async (e) => {
    e.preventDefault();
    console.log("Submitting patient details:", patientDetails);

    if (!patientDetails.fullName || !patientDetails.email || !patientDetails.gender || !patientDetails.contactNumber) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/api/patients",
        patientDetails,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        alert("Patient added successfully!");
        setShowAddPatientModal(false);
        setPatientDetails({
          fullName: "",
          email: "",
          gender: "",
          dateOfBirth: "",
          contactNumber: "",
        });
      } else {
        alert("Failed to add patient. Please try again.");
      }
    } catch (error) {
      console.error("Error adding patient:", error.response?.data || error.message);
      alert("An error occurred while adding the patient.");
    }
  };

  // Handle adding a new doctor
  const handleAddDoctor = async (e) => {
    e.preventDefault();
    console.log("Submitting doctor details:", doctorDetails);

    if (!doctorDetails.name || !doctorDetails.specialty || !doctorDetails.contactNumber) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/api/doctors",
        doctorDetails,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        alert("Doctor added successfully!");
        setShowAddDoctorModal(false);
        setDoctorDetails({
          name: "",
          specialty: "",
          experience: "",
          qualification: "",
          designation: "",
          contactNumber: "",
        });
      } else {
        alert("Failed to add doctor. Please try again.");
      }
    } catch (error) {
      console.error("Error adding doctor:", error.response?.data || error.message);
      alert("An error occurred while adding the doctor.");
    }
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="dashboard-logo">
          <h1>AmazeCare</h1>
        </div>
        <h3>Admin Dashboard</h3>
      </header>

      <aside className="dashboard-sidebar">
        <ul>
          <li>
            <button
              className="sidebar-button"
              onClick={() => setShowUsers(!showUsers)}
            >
              {showUsers ? "Hide Users" : "Users"}
            </button>
          </li>
          <li>
            <button
              className="sidebar-button"
              onClick={() => setShowAdmins(!showAdmins)}
            >
              {showAdmins ? "Hide Admins" : "Admins"}
            </button>
          </li>
          <li>
            <button
              className="sidebar-button"
              onClick={() => setShowPatients(!showPatients)}
            >
              {showPatients ? "Hide Patients" : "Patients"}
            </button>
          </li>
          <li>
            <button
              className="sidebar-button"
              onClick={() => setShowDoctors(!showDoctors)}
            >
              {showDoctors ? "Hide Doctors" : "Doctors"}
            </button>
          </li>
          <li>
            <button
              className="sidebar-button"
              onClick={() => setShowAppointments(!showAppointments)}
            >
              {showAppointments ? "Hide Appointments" : "Appointments"}
            </button>
          </li>
          <li>
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
          <li>
            <button
              className="sidebar-button"
              onClick={() => setShowMedicalRecords(!showMedicalRecords)}
            >
              {showMedicalRecords ? "Hide Medical Records" : "Medical Records"}
            </button>
          </li>
          <li>
            <Link to="/">
              <button className="logout-button">Logout</button>
            </Link>
          </li>
        </ul>
      </aside>


      <main className="dashboard-main">
        <section className="welcome-section">
          <h2>Welcome, Admin</h2>
          <p>Manage the system efficiently. Here's your quick overview.</p>
        </section>

        <section className="quick-actions">
          <h3>Quick Actions</h3>
          <div className="action-cards">
            <div className="action-card">
              <h4>Add User</h4>
              <p>Create a new user account.</p>
              <button onClick={() => setShowAddUserModal(true)}>Add User</button>
            </div>
            <div className="action-card">
              <h4>Add Patient</h4>
              <p>Register a new patient.</p>
              <button onClick={() => setShowAddPatientModal(true)}>Add Patient</button>
            </div>
            <div className="action-card">
              <h4>Add Doctor</h4>
              <p>Register a new doctor.</p>
              <button onClick={() => setShowAddDoctorModal(true)}>Add Doctor</button>
            </div>
          </div>
        </section>

        {showUsers && (
          <section className="users-section">
            <h3>Manage Users</h3>
            <ListUsers allowAdd={true} allowUpdate={true} allowDelete={true} />
          </section>
        )}

        {showAdmins && (
          <section className="admins-section">
            <h3>Manage Admins</h3>
            <ListUsers
              allowAdd={false}
              allowUpdate={false}
              allowDelete={false}
              filterByRole="ADMIN"
            />
          </section>
        )}

        {showPatients && (
          <section className="patients-section">
            <h3>Manage Patients</h3>
            <ListPatients allowAdd={true} allowUpdate={true} allowDelete={true} />
          </section>
        )}

        {showDoctors && (
          <section className="doctors-section">
            <h3>Manage Doctors</h3>
            <ListDoctors allowAdd={true} allowUpdate={true} allowDelete={true} />
          </section>
        )}

        {showAppointments && (
          <section className="appointments-section">
            <h3>Manage Appointments</h3>
            <ListAppointments allowAdd={true} allowUpdate={true} allowDelete={true} />
          </section>
        )}

        {showAppointmentDetails && (
          <section className="appointment-details-section">
            <h3>Manage Appointment Details</h3>
            <ListAppointmentDetails allowAdd={true} allowUpdate={true} allowDelete={true} />
          </section>
        )}

        {showMedicalRecords && (
          <section className="medicalrecords-section">
            <h3>Manage Medical Records</h3>
            <ListMedicalRecords allowAdd={true} allowUpdate={true} allowDelete={true} />
          </section>
        )}
      </main>

      {showAddUserModal && (
        <div className="modal-overlay">
          <div className="modal">
            <form onSubmit={handleAddUser} className="modal-form">
              <h3>Add User</h3>
              <label>
                Username:
                <input
                  type="text"
                  value={userDetails.username}
                  onChange={(e) => setUserDetails({ ...userDetails, username: e.target.value })}
                  required
                />
              </label>
              <label>
                Email:
                <input
                  type="email"
                  value={userDetails.email}
                  onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
                  required
                />
              </label>
              <label>
                Password:
                <input
                  type="password"
                  value={userDetails.password}
                  onChange={(e) => setUserDetails({ ...userDetails, password: e.target.value })}
                  required
                />
              </label>
              <label>
                Role:
                <select
                  value={userDetails.role}
                  onChange={(e) => setUserDetails({ ...userDetails, role: e.target.value })}
                  required
                >
                  <option value="" disabled>Select Role</option>
                  <option value="ADMIN">Admin</option>
                  <option value="PATIENT">Patient</option>
                  <option value="DOCTOR">Doctor</option>
                </select>
              </label>
              <button type="submit">Submit</button>
              <button type="button" onClick={() => setShowAddUserModal(false)}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}

      {showAddPatientModal && (
        <div className="modal-overlay">
          <div className="modal">
            <form onSubmit={handleAddPatient} className="modal-form">
              <h3>Add Patient</h3>
              <label>
                Full Name:
                <input
                  type="text"
                  value={patientDetails.fullName}
                  onChange={(e) => setPatientDetails({ ...patientDetails, fullName: e.target.value })}
                  required
                />
              </label>
              <label>
                Email:
                <input
                  type="email"
                  value={patientDetails.email}
                  onChange={(e) => setPatientDetails({ ...patientDetails, email: e.target.value })}
                  required
                />
              </label>
              <label>
                Gender:
                <select
                  value={patientDetails.gender}
                  onChange={(e) => setPatientDetails({ ...patientDetails, gender: e.target.value })}
                  required
                >
                  <option value="" disabled>Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </label>
              <label>
                Contact Number:
                <input
                  type="text"
                  value={patientDetails.contactNumber}
                  onChange={(e) => setPatientDetails({ ...patientDetails, contactNumber: e.target.value })}
                  required
                />
              </label>
              <button type="submit">Submit</button>
              <button type="button" onClick={() => setShowAddPatientModal(false)}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}

      {showAddDoctorModal && (
        <div className="modal-overlay">
          <div className="modal">
            <form onSubmit={handleAddDoctor} className="modal-form">
              <h3>Add Doctor</h3>
              <label>
                Name:
                <input
                  type="text"
                  value={doctorDetails.name}
                  onChange={(e) => setDoctorDetails({ ...doctorDetails, name: e.target.value })}
                  required
                />
              </label>
              <label>
                Specialty:
                <input
                  type="text"
                  value={doctorDetails.specialty}
                  onChange={(e) => setDoctorDetails({ ...doctorDetails, specialty: e.target.value })}
                  required
                />
              </label>
              <label>
                Contact Number:
                <input
                  type="text"
                  value={doctorDetails.contactNumber}
                  onChange={(e) => setDoctorDetails({ ...doctorDetails, contactNumber: e.target.value })}
                  required
                />
              </label>
              <button type="submit">Submit</button>
              <button type="button" onClick={() => setShowAddDoctorModal(false)}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
