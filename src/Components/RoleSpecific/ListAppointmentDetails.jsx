import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../AuthContext";
import "../../App.css";

const ListAppointmentDetails = ({ allowAdd, allowUpdate, allowDelete }) => {
  const { token } = useContext(AuthContext);
  const [appointmentDetails, setAppointmentDetails] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [newDetail, setNewDetail] = useState({
    appointmentId: "",
    patientId: "",
    doctorId: "",
    consultingDetails: "",
    recommendedTests: "",
    prescription: "",
  });
  const [currentDetail, setCurrentDetail] = useState(null); // For updating details
  const [showUpdateModal, setShowUpdateModal] = useState(false); // Toggle update modal
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/appointment-details", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAppointmentDetails(response.data);
      } catch (error) {
        setErrorMessage("Failed to fetch appointment details. Please try again.");
        console.error(
          "Error fetching appointment details:",
          error.response ? error.response.data : error.message
        );
      }
    };

    if (token) {
      fetchDetails();
    }
  }, [token]);

  const validateForm = (data) => {
    const newErrors = {};

    if (!data.appointmentId || isNaN(data.appointmentId) || data.appointmentId <= 0) {
      newErrors.appointmentId = "Valid Appointment ID is required.";
    }

    if (!data.patientId || isNaN(data.patientId) || data.patientId <= 0) {
      newErrors.patientId = "Valid Patient ID is required.";
    }

    if (!data.doctorId || isNaN(data.doctorId) || data.doctorId <= 0) {
      newErrors.doctorId = "Valid Doctor ID is required.";
    }

    if (!data.consultingDetails.trim()) {
      newErrors.consultingDetails = "Consulting Details are required.";
    }

    if (!data.prescription.trim()) {
      newErrors.prescription = "Prescription is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const addAppointmentDetail = async () => {
    if (!validateForm(newDetail)) return;

    try {
      const response = await axios.post(
        "http://localhost:8080/api/appointment-details",
        newDetail,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setAppointmentDetails((prevDetails) => [...prevDetails, response.data]);
      setNewDetail({
        appointmentId: "",
        patientId: "",
        doctorId: "",
        consultingDetails: "",
        recommendedTests: "",
        prescription: "",
      });
      alert("Appointment detail added successfully!");
    } catch (error) {
      console.error("Error adding appointment detail:", error);
      alert("Failed to add appointment detail. Please try again.");
    }
  };

  const updateAppointmentDetail = async () => {
    if (!currentDetail || !validateForm(currentDetail)) return;

    try {
      const response = await axios.put(
        `http://localhost:8080/api/appointment-details/${currentDetail.id}`,
        currentDetail,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAppointmentDetails((prevDetails) =>
        prevDetails.map((detail) => (detail.id === currentDetail.id ? response.data : detail))
      );
      setShowUpdateModal(false);
      alert("Appointment detail updated successfully!");
    } catch (error) {
      console.error("Error updating appointment detail:", error);
      alert("Failed to update appointment detail. Please try again.");
    }
  };

  const deleteAppointmentDetail = async (id) => {
    if (!allowDelete) return;

    try {
      await axios.delete(`http://localhost:8080/api/appointment-details/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAppointmentDetails((prevDetails) =>
        prevDetails.filter((detail) => detail.id !== id)
      );
      alert("Appointment detail deleted successfully!");
    } catch (error) {
      console.error("Error deleting appointment detail:", error);
      alert("Failed to delete appointment detail. Please try again.");
    }
  };

  return (
    <div className="list-container">
      <h3 className="modal-title">Appointment Details</h3>
      {errorMessage && <p className="form-error">{errorMessage}</p>}
      {appointmentDetails.length > 0 ? (
        <table className="list-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Appointment ID</th>
              <th>Patient ID</th>
              <th>Doctor ID</th>
              <th>Consulting Details</th>
              <th>Recommended Tests</th>
              <th>Prescription</th>
              {(allowUpdate || allowDelete) && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {appointmentDetails.map((detail) => (
              <tr key={detail.id}>
                <td>{detail.id}</td>
                <td>{detail.appointmentId}</td>
                <td>{detail.patientId}</td>
                <td>{detail.doctorId}</td>
                <td>{detail.consultingDetails}</td>
                <td>{detail.recommendedTests || "N/A"}</td>
                <td>{detail.prescription}</td>
                {(allowUpdate || allowDelete) && (
                  <td className="list-actions">
                    {allowUpdate && (
                      <button
                        className="btn-update"
                        onClick={() => {
                          setCurrentDetail(detail);
                          setShowUpdateModal(true);
                        }}
                      >
                        Update
                      </button>
                    )}
                    {allowDelete && (
                      <button
                        className="btn-delete"
                        onClick={() => deleteAppointmentDetail(detail.id)}
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
        <p className="list-empty">No appointment details found.</p>
      )}

      {allowAdd && (
        <div className="appointment-form">
          <h4 className="modal-title">Add New Appointment Detail</h4>
          <div className="form-group">
            <label>Appointment ID</label>
            <input
              type="number"
              value={newDetail.appointmentId}
              onChange={(e) => setNewDetail({ ...newDetail, appointmentId: e.target.value })}
              className="form-input"
            />
            {errors.appointmentId && <p className="form-error">{errors.appointmentId}</p>}
          </div>
          <div className="form-group">
            <label>Patient ID</label>
            <input
              type="number"
              value={newDetail.patientId}
              onChange={(e) => setNewDetail({ ...newDetail, patientId: e.target.value })}
              className="form-input"
            />
            {errors.patientId && <p className="form-error">{errors.patientId}</p>}
          </div>
          <div className="form-group">
            <label>Doctor ID</label>
            <input
              type="number"
              value={newDetail.doctorId}
              onChange={(e) => setNewDetail({ ...newDetail, doctorId: e.target.value })}
              className="form-input"
            />
            {errors.doctorId && <p className="form-error">{errors.doctorId}</p>}
          </div>
          <div className="form-group">
            <label>Consulting Details</label>
            <input
              type="text"
              value={newDetail.consultingDetails}
              onChange={(e) => setNewDetail({ ...newDetail, consultingDetails: e.target.value })}
              className="form-input"
            />
            {errors.consultingDetails && <p className="form-error">{errors.consultingDetails}</p>}
          </div>
          <div className="form-group">
            <label>Recommended Tests</label>
            <input
              type="text"
              value={newDetail.recommendedTests}
              onChange={(e) => setNewDetail({ ...newDetail, recommendedTests: e.target.value })}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label>Prescription</label>
            <input
              type="text"
              value={newDetail.prescription}
              onChange={(e) => setNewDetail({ ...newDetail, prescription: e.target.value })}
              className="form-input"
            />
            {errors.prescription && <p className="form-error">{errors.prescription}</p>}
          </div>
          <button className="btn-primary" onClick={addAppointmentDetail}>
            Add Detail
          </button>
        </div>
      )}

      {showUpdateModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h4 className="modal-title">Update Appointment Detail</h4>
            <div className="form-group">
              <label>Consulting Details</label>
              <input
                type="text"
                value={currentDetail.consultingDetails}
                onChange={(e) =>
                  setCurrentDetail({ ...currentDetail, consultingDetails: e.target.value })
                }
                className="form-input"
              />
              {errors.consultingDetails && <p className="form-error">{errors.consultingDetails}</p>}
            </div>
            <div className="form-group">
              <label>Recommended Tests</label>
              <input
                type="text"
                value={currentDetail.recommendedTests}
                onChange={(e) =>
                  setCurrentDetail({ ...currentDetail, recommendedTests: e.target.value })
                }
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label>Prescription</label>
              <input
                type="text"
                value={currentDetail.prescription}
                onChange={(e) =>
                  setCurrentDetail({ ...currentDetail, prescription: e.target.value })
                }
                className="form-input"
              />
              {errors.prescription && <p className="form-error">{errors.prescription}</p>}
            </div>
            <div className="form-actions">
              <button className="btn-primary" onClick={updateAppointmentDetail}>
                Update Detail
              </button>
              <button
                className="btn-secondary"
                onClick={() => setShowUpdateModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListAppointmentDetails;
