import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../AuthContext";
import "../../App.css";

const ListAppointments = ({ allowAdd, allowUpdate, allowDelete }) => {
  const { token } = useContext(AuthContext);
  const [appointments, setAppointments] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [newAppointment, setNewAppointment] = useState({
    patientId: "",
    doctorId: "",
    appointmentDate: "",
    status: "SCHEDULED",
  });
  const [currentAppointment, setCurrentAppointment] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/appointments", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAppointments(response.data);
      } catch (error) {
        setErrorMessage("Failed to fetch appointments. Please try again.");
        console.error(
          "Error fetching appointments:",
          error.response ? error.response.data : error.message
        );
      }
    };

    if (token) {
      fetchAppointments();
    }
  }, [token]);

  const validateForm = (data) => {
    const newErrors = {};

    if (!data.patientId || isNaN(data.patientId) || data.patientId <= 0) {
      newErrors.patientId = "Valid Patient ID is required.";
    }

    if (!data.doctorId || isNaN(data.doctorId) || data.doctorId <= 0) {
      newErrors.doctorId = "Valid Doctor ID is required.";
    }

    if (!data.appointmentDate) {
      newErrors.appointmentDate = "Appointment Date and Time are required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const addAppointment = async () => {
    if (!validateForm(newAppointment)) return;

    try {
      const response = await axios.post(
        "http://localhost:8080/api/appointments",
        newAppointment,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setAppointments((prevAppointments) => [...prevAppointments, response.data]);
      setNewAppointment({ patientId: "", doctorId: "", appointmentDate: "", status: "SCHEDULED" });
      alert("Appointment added successfully!");
    } catch (error) {
      console.error("Error adding appointment:", error);
      alert("Failed to add appointment. Please try again.");
    }
  };

  const updateAppointment = async () => {
    if (!currentAppointment || !validateForm(currentAppointment)) {
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:8080/api/appointments/${currentAppointment.id}`,
        currentAppointment,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment.id === currentAppointment.id ? response.data : appointment
        )
      );
      setShowUpdateModal(false);
      alert("Appointment updated successfully!");
    } catch (error) {
      console.error("Error updating appointment:", error);
      alert("Failed to update appointment. Please try again.");
    }
  };

  const deleteAppointment = async (id) => {
    if (!allowDelete) return;

    try {
      await axios.delete(`http://localhost:8080/api/appointments/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAppointments((prevAppointments) => prevAppointments.filter((appointment) => appointment.id !== id));
      alert("Appointment deleted successfully!");
    } catch (error) {
      console.error("Error deleting appointment:", error);
      alert("Failed to delete appointment. Please try again.");
    }
  };

  return (
    <div className="list-container">
      <h3 className="list-header">Appointments</h3>
      {errorMessage && <p className="form-error">{errorMessage}</p>}
      {appointments.length > 0 ? (
        <table className="list-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Patient ID</th>
              <th>Doctor ID</th>
              <th>Date and Time</th>
              <th>Status</th>
              {(allowUpdate || allowDelete) && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment.id} className="list-item">
                <td>{appointment.id}</td>
                <td>{appointment.patientId}</td>
                <td>{appointment.doctorId}</td>
                <td>{appointment.appointmentDate}</td>
                <td>{appointment.status}</td>
                {(allowUpdate || allowDelete) && (
                  <td className="list-actions">
                    {allowUpdate && (
                      <button
                        className="btn-primary"
                        onClick={() => {
                          setCurrentAppointment(appointment);
                          setShowUpdateModal(true);
                        }}
                      >
                        Update
                      </button>
                    )}
                    {allowDelete && (
                      <button
                        className="btn-danger"
                        onClick={() => deleteAppointment(appointment.id)}
                      >
                        Delete
                      </button>
                    )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="list-empty">No appointments found.</p>
      )}

      {allowAdd && (
        <div className="form-group">
          <h4 className="form-title">Add New Appointment</h4>
          <div className="form-group">
            <label>Patient ID</label>
            <input
              type="number"
              value={newAppointment.patientId}
              onChange={(e) => setNewAppointment({ ...newAppointment, patientId: e.target.value })}
              className="form-input"
            />
            {errors.patientId && <p className="form-error">{errors.patientId}</p>}
          </div>
          <div className="form-group">
            <label>Doctor ID</label>
            <input
              type="number"
              value={newAppointment.doctorId}
              onChange={(e) => setNewAppointment({ ...newAppointment, doctorId: e.target.value })}
              className="form-input"
            />
            {errors.doctorId && <p className="form-error">{errors.doctorId}</p>}
          </div>
          <div className="form-group">
            <label>Appointment Date and Time</label>
            <input
              type="datetime-local"
              value={newAppointment.appointmentDate}
              onChange={(e) => setNewAppointment({ ...newAppointment, appointmentDate: e.target.value })}
              className="form-input"
            />
            {errors.appointmentDate && <p className="form-error">{errors.appointmentDate}</p>}
          </div>
          <button className="btn-primary" onClick={addAppointment}>Add Appointment</button>
        </div>
      )}

      {showUpdateModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h4 className="modal-title">Update Appointment</h4>
            <form className="appointment-form" onSubmit={(e) => e.preventDefault()}>
              <div className="form-group">
                <label>Patient ID</label>
                <input
                  type="number"
                  value={currentAppointment.patientId}
                  onChange={(e) =>
                    setCurrentAppointment({ ...currentAppointment, patientId: e.target.value })
                  }
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label>Doctor ID</label>
                <input
                  type="number"
                  value={currentAppointment.doctorId}
                  onChange={(e) =>
                    setCurrentAppointment({ ...currentAppointment, doctorId: e.target.value })
                  }
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label>Appointment Date and Time</label>
                <input
                  type="datetime-local"
                  value={currentAppointment.appointmentDate}
                  onChange={(e) =>
                    setCurrentAppointment({ ...currentAppointment, appointmentDate: e.target.value })
                  }
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label>Status</label>
                <p className="status-text">SCHEDULED</p>
              </div>
              <div className="form-actions">
                <button className="btn-primary" onClick={updateAppointment}>Update</button>
                <button className="btn-secondary" onClick={() => setShowUpdateModal(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListAppointments;
