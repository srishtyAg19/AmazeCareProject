// Import necessary libraries
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from "../AuthContext";

const BookAppointment = () => {
  const [showForm, setShowForm] = useState(false);
  const { token } = useContext(AuthContext);
  const patientId = localStorage.getItem("patient_id");
  const [formData, setFormData] = useState({
    appointmentDate: '',
    doctorId: '',
    status: 'SCHEDULED', // Default status
    patientId: patientId || '' // Use patientId from localStorage
  });
  const [statusMessage, setStatusMessage] = useState('');
  const [errors, setErrors] = useState({});

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Validate the form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.appointmentDate) {
      newErrors.appointmentDate = 'Date and Time are required';
    }

    if (!formData.doctorId) {
      newErrors.doctorId = "Doctor ID is required";
    } else if (!/^[0-9]+$/.test(formData.doctorId)) {
      newErrors.doctorId = "Doctor ID must be a numeric value";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const requestData = {
        appointmentDate: formData.appointmentDate, // LocalDateTime format
        doctorId: parseInt(formData.doctorId, 10), // Ensure doctorId is sent as an integer
        patientId: parseInt(formData.patientId, 10), // Ensure patientId is sent as an integer
        status: formData.status // Default status
      };

      console.log('Request Data:', requestData); // Log request payload

      // Send the POST request
      const response = await axios.post('http://localhost:8080/api/appointments', requestData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setStatusMessage('Appointment booked successfully!');
      setShowForm(false);
    } catch (error) {
      setStatusMessage('Failed to book appointment. Please check the input data or try again.');
      console.error('Error Response:', error.response ? error.response.data : error.message);
      if (error.response) {
        console.error('Backend Error Details:', error.response.data);
      }
    }
  };

  return (
    <div>
      {/* Button to show the form */}
      <button onClick={() => setShowForm(true)}>Book Appointment</button>

      {/* Form to book appointment */}
      {showForm && (
        <div className="modal-overlay">
          <div className="modal">
            <form onSubmit={handleSubmit} className="appointment-form">
              <h2 className="modal-title">Book Appointment</h2>

              <div className="form-group">
                <label>Patient ID:</label>
                <input
                  className="form-input"
                  type="text"
                  name="patientId"
                  value={formData.patientId}
                  onChange={handleChange}
                  placeholder="Enter your Patient ID"
                  disabled
                />
              </div>

              <div className="form-group">
                <label>Appointment Date and Time:</label>
                <input
                  className="form-input"
                  type="datetime-local"
                  name="appointmentDate"
                  value={formData.appointmentDate}
                  onChange={handleChange}
                  required
                />
                {errors.appointmentDate && <span className="form-error">{errors.appointmentDate}</span>}
              </div>

              <div className="form-group">
                <label>Doctor ID:</label>
                <input
                  className="form-input"
                  type="text"
                  name="doctorId"
                  value={formData.doctorId}
                  onChange={handleChange}
                  placeholder="Enter Doctor's ID"
                  required
                />
                {errors.doctorId && <span className="form-error">{errors.doctorId}</span>}
              </div>

              <div className="form-actions">
                <button className="btn-primary" type="submit">Submit</button>
                <button className="btn-secondary" type="button" onClick={() => setShowForm(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}


      {/* Status message */}
      {statusMessage && <p>{statusMessage}</p>}
    </div>
  );
};

export default BookAppointment;
