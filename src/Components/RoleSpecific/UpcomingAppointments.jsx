import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from "../AuthContext";

const UpcomingAppointments = () => {
  const { token } = useContext(AuthContext);
  const patientId = localStorage.getItem("patient_id");
  const [appointments, setAppointments] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  // Fetch doctor details
  const fetchDoctorName = async (doctorId) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/doctors/${doctorId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.name; 
    } catch (error) {
      console.error(`Error fetching doctor details for doctorId ${doctorId}:`, error.message);
      return 'Unknown'; // Default to 'Unknown' if fetching fails
    }
  };

  // Fetch all appointments and enrich with doctor names
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/appointments`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const currentTime = new Date();
        const upcomingAppointments = response.data.filter((appointment) =>
          appointment.patientId === parseInt(patientId) && new Date(appointment.appointmentDate) > currentTime
        );

        // Fetch doctor names, handle partial errors
        const enrichedAppointments = await Promise.all(
          upcomingAppointments.map(async (appointment) => {
            const doctorName = await fetchDoctorName(appointment.doctorId);
            return { ...appointment, doctorName };
          })
        );

        setAppointments(enrichedAppointments);
      } catch (error) {
        setErrorMessage('Failed to fetch appointments. Some data may be missing.');
        console.error('Error fetching appointments:', error.response ? error.response.data : error.message);
      }
    };

    if (patientId && token) {
      fetchAppointments();
    }
  }, [patientId, token]);

  return (
    <div>
      <h4>Upcoming Appointments</h4>
      <p>Track your latest appointment details.</p>
      {errorMessage && <p className="error">{errorMessage}</p>}
      {appointments.length > 0 ? (
        <ul>
          {appointments.map((appointment) => (
            <li key={appointment.id}>
              <p><strong>Date:</strong> {new Date(appointment.appointmentDate).toLocaleString()}</p>
              <p><strong>Doctor:</strong> {appointment.doctorName || 'Unknown'}</p>
              <p><strong>Status:</strong> {appointment.status}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No upcoming appointments found.</p>
      )}
    </div>
  );
};

export default UpcomingAppointments;
