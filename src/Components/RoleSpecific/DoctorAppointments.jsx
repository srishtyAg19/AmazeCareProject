import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AuthContext } from "../AuthContext";
import "../../App.css";
import "../Registration.css";
import { text } from "@fortawesome/fontawesome-svg-core";

const DoctorAppointments = () => {
  const { token } = useContext(AuthContext); // Authentication token
  const doctorId = parseInt(localStorage.getItem("doctor_id")); // Assuming doctor ID is stored in localStorage
  const [appointments, setAppointments] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null); // State for the reschedule calendar
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // Fetch all appointments for the doctor
    const fetchAppointments = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/appointments", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const doctorAppointments = response.data.filter(
          (appointment) => appointment.doctorId === doctorId
        );
        setAppointments(doctorAppointments);
      } catch (error) {
        if (error.response && error.response.status === 403) {
          setErrorMessage("You don't have permission to access these appointments.");
        } else {
          setErrorMessage("Failed to fetch appointments.");
        }
        console.error("Error fetching appointments:", error.response?.data || error.message);
      }
    };

    if (doctorId && token) {
      fetchAppointments();
    }
  }, [doctorId, token]);

  const handleCancelAppointment = async (appointmentId) => {
    try {
      await axios.delete(
        `http://localhost:8080/api/appointments/${appointmentId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setAppointments((prevAppointments) =>
        prevAppointments.filter((appointment) => appointment.id !== appointmentId)
      );
      alert("Appointment canceled successfully");
    } catch (error) {
      if (error.response && error.response.status === 403) {
        alert("You don't have permission to cancel this appointment.");
      } else {
        alert("Failed to cancel appointment");
      }
      console.error("Error canceling appointment:", error.response?.data || error.message);
    }
  };

  const handleReschedule = async (appointmentId, patientId) => {
    if (!selectedDate) {
      alert("Please select a date and time to reschedule.");
      return;
    }

    // Ensure the selected date is in the future
    const currentDate = new Date();
    if (selectedDate <= currentDate) {
      alert("You can only reschedule appointments to a future date and time.");
      return;
    }

    try {
      const formattedDate = selectedDate.toISOString().slice(0, 19); // Format to "YYYY-MM-DDTHH:mm:ss"

      const payload = {
        patientId,
        doctorId,
        appointmentDate: formattedDate,
        status: "CONFIRMED",
      };

      await axios.put(
        `http://localhost:8080/api/appointments/${appointmentId}`,
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment.id === appointmentId
            ? { ...appointment, appointmentDate: selectedDate.toISOString(), status: "CONFIRMED" }
            : appointment
        )
      );
      alert("Appointment rescheduled successfully");
      setSelectedDate(null); // Reset selected date
    } catch (error) {
      if (error.response && error.response.status === 403) {
        alert("You don't have permission to reschedule this appointment.");
      } else {
        alert("Failed to reschedule appointment");
      }
      console.error("Error rescheduling appointment:", error.response?.data || error.message);
    }
  };

  return (
    <div className="appointments-container">
      <h2>Doctor's Appointments</h2>
      {errorMessage && <p className="error">{errorMessage}</p>}

      {appointments.length > 0 ? (
        <ul>
          {appointments.map((appointment) => {
            const isUpcoming = new Date(appointment.appointmentDate) > new Date();
            const isCompleted = appointment.status === "COMPLETED";
            return (
              <li
                key={appointment.id}
                style={{
                  backgroundColor: isUpcoming ? "#d4f8d4" : "#f8d4d4", // Highlight upcoming appointments in green
                  border: "1px solid #ccc",
                  padding: "10px",
                  margin: "10px 0",
                }}
              >
                <p>
                  <strong>Patient ID:</strong> {appointment.patientId}
                </p>
                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(appointment.appointmentDate).toLocaleString()}
                </p>
                <p>
                  <strong>Status:</strong> {appointment.status}
                </p>

                {/* If appointment is completed, show prescription link */}
                {isCompleted && appointment.prescriptionLink && (
                  <p>
                    <strong>Prescription:</strong>{" "}
                    <a href={appointment.prescriptionLink} target="_blank" rel="noopener noreferrer">
                      View Prescription
                    </a>
                  </p>
                )}

                {isUpcoming && (
                  <>
                    <button
                      onClick={() =>
                        handleCancelAppointment(appointment.id)
                      }
                    >
                      Cancel
                    </button>
                    <div>
                      <DatePicker
                        selected={selectedDate}
                        onChange={(date) => setSelectedDate(date)}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        dateFormat="yyyy-MM-dd HH:mm"
                        placeholderText="Select new date and time"
                        minDate={new Date()} // Disable past dates
                      />
                      <button
                        onClick={() =>
                          handleReschedule(appointment.id, appointment.patientId)
                        }
                      >
                        Reschedule
                      </button>
                    </div>
                  </>
                )}
              </li>
            );
          })}
        </ul>
      ) : (
        <p>No appointments available.</p>
      )}
    </div>
  );
};

export default DoctorAppointments;
