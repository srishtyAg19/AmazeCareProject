import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './Components/Login';
import Registration from './Components/Registration';
import HomePage from './Components/HomePage';
import PatientDashboard from './Components/RoleSpecific/PatientDashboard';
import DoctorDashboard from './Components/RoleSpecific/DoctorDashboard';
import AdminDashboard from './Components/RoleSpecific/AdminDashboard';
import PatientProfile from './Components/RoleSpecific/PatientProfile';
import EditProfile from './Components/RoleSpecific/EditProfile';
import DoctorProfile from './Components/RoleSpecific/DoctorProfile';
import EditDoctor from './Components/RoleSpecific/EditDoctor';
import PatientRecords from './Components/RoleSpecific/PatientRecords';
import CreatePrescription from './Components/RoleSpecific/CreatePrescription'; // Import CreatePrescription component
import DoctorAppointments from './Components/RoleSpecific/DoctorAppointments';
import AboutUs from './Components/About';
import Contact from './Components/contact';
function App() {
  return (
    <div className="App">
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/doctor-profile" element={<DoctorProfile />} />

        {/* Role-Specific Dashboards */}
        <Route path="/patient-dashboard" element={<PatientDashboard />} />
        <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        
        {/* Profile Routes */}
        <Route path="/profile" element={<PatientProfile />} />
        <Route path="/edit-doctor" element={<EditDoctor />} /> {/* Link to EditDoctor */}
        <Route path="/patient-records/:patientId" element={<PatientRecords />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<Contact/>} />
        {/* Prescription Route */}
        <Route path="/create-prescription/:appointmentId" element={<CreatePrescription />} /> {/* Route for creating prescriptions */}

        <Route path="/doctor-appointments" element={<DoctorAppointments />} /> {/* Add the route */}
        {/* Prescription Route */}
        <Route path="/create-prescription/:appointmentId" element={<CreatePrescription />} /> {/* Route for creating prescriptions */}
        {/*<Route path="/update-prescription/:appointmentId" element={<UpdatePrescription/>}/>*/}

      </Routes>
    </div>
  );
}

export default App;