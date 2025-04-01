import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../AuthContext";

const AllAppointments = () => {
  const { token } = useContext(AuthContext);
  const patientId = localStorage.getItem("patient_id");
  const [appointments, setAppointments] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [rescheduleData, setRescheduleData] = useState({ id: null, newDate: "" });

  // Fetch doctor details
  const fetchDoctorName = async (doctorId) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/doctors/${doctorId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.name; // Assuming the API returns the doctor's name
    } catch (error) {
      console.error(`Error fetching doctor details for doctorId ${doctorId}:`, error.message);
      return "Unknown";
    }
  };

  // Fetch all appointments and enrich with doctor names
  useEffect(() => {
    const fetchAllAppointments = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/appointments`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const patientAppointments = response.data.filter(
          (appointment) => appointment.patientId === parseInt(patientId)
        );

        // Fetch doctor names for each appointment
        const enrichedAppointments = await Promise.all(
          patientAppointments.map(async (appointment) => {
            if (appointment.doctorId) {
              const doctorName = await fetchDoctorName(appointment.doctorId);
              return { ...appointment, doctorName };
            }
            return { ...appointment, doctorName: "Unknown" };
          })
        );

        setAppointments(enrichedAppointments);
      } catch (error) {
        setErrorMessage("Failed to fetch appointments. Please try again.");
        console.error("Error fetching all appointments:", error.response ? error.response.data : error.message);
      }
    };

    if (patientId && token) {
      fetchAllAppointments();
    }
  }, [patientId, token]);

  // Cancel Appointment
  const cancelAppointment = async (id) => {
    try {
      await axios.put(
        `http://localhost:8080/api/appointments/${id}`,
        { status: "CANCELLED" }, // Update the status to "CANCELLED"
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update UI after cancellation
      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment.id === id ? { ...appointment, status: "CANCELLED" } : appointment
        )
      );
      alert("Appointment cancelled successfully.");
    } catch (error) {
      console.error("Error cancelling appointment:", error);
      alert("Failed to cancel the appointment. Please try again.");
    }
  };

  // Reschedule Appointment
  const rescheduleAppointment = async () => {
    if (!rescheduleData.id || !rescheduleData.newDate) {
      alert("Please select a new date and time to reschedule.");
      return;
    }

    try {
      await axios.put(
        `http://localhost:8080/api/appointments/${rescheduleData.id}`,
        { appointmentDate: rescheduleData.newDate },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update UI after rescheduling
      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment.id === rescheduleData.id
            ? { ...appointment, appointmentDate: rescheduleData.newDate }
            : appointment
        )
      );
      alert("Appointment rescheduled successfully.");
      setRescheduleData({ id: null, newDate: "" });
    } catch (error) {
      console.error("Error rescheduling appointment:", error);
      alert("Failed to reschedule the appointment. Please try again.");
    }
  };

  return (
    <div>
      <h3>All Appointments</h3>
      {errorMessage && <p className="error">{errorMessage}</p>}
      {appointments.length > 0 ? (
        <ul>
          {appointments.map((appointment) => (
            <li key={appointment.id}>
              <p><strong>Date:</strong> {new Date(appointment.appointmentDate).toLocaleString()}</p>
              <p><strong>Doctor:</strong> {appointment.doctorName || "Unknown"}</p>
              <p><strong>Status:</strong> {appointment.status}</p>
              <div>
                <button
                  onClick={() => cancelAppointment(appointment.id)}
                  disabled={appointment.status === "CANCELLED"}
                >
                  Cancel
                </button>
                {rescheduleData.id === appointment.id ? (
                  <div>
                    <input
                      type="datetime-local"
                      value={rescheduleData.newDate}
                      onChange={(e) =>
                        setRescheduleData({ ...rescheduleData, newDate: e.target.value })
                      }
                    />
                    <button onClick={rescheduleAppointment}>Confirm</button>
                    <button onClick={() => setRescheduleData({ id: null, newDate: "" })}>
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() =>
                      setRescheduleData({ id: appointment.id, newDate: "" })
                    }
                  >
                    Reschedule
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No appointments found.</p>
      )}
    </div>
  );
};

export default AllAppointments;
