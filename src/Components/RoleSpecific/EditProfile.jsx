import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import "../../App.css";

const EditProfile = () => {
  const [formData, setFormData] = useState({
    user_id: "",
    full_name: "",
    email: "",
    gender: "",
    date_of_birth: "",
    contact_number: ""
  });
  const patient_id = localStorage.getItem("patient_id");
  const user_id = localStorage.getItem("user_id");
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);

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
      setFormData({
        user_id: response?.data?.id,
        full_name: response?.data?.fullName,
        email: response?.data?.email,
        gender: response?.data?.gender,
        date_of_birth: response?.data?.dateOfBirth,
        contact_number: response?.data?.contactNumber
      });
    } catch (error) {
      console.error("Error fetching patient data:", error);
    }
  };

  useEffect(() => {
    if (patient_id && token) {
      fetchPatientData();
    } else {
      console.error("User ID or token not found in localStorage.");
    }
  }, [patient_id, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.full_name.trim()) {
      newErrors.full_name = "Full Name is required.";
    }

    if (!formData.date_of_birth) {
      newErrors.date_of_birth = "Date of Birth is required.";
    } else {
      const today = new Date();
      const dob = new Date(formData.date_of_birth);
      if (dob >= today) {
        newErrors.date_of_birth = "Date of Birth must be in the past.";
      }
    }

    if (!formData.gender) {
      newErrors.gender = "Gender is required.";
    }

    if (!formData.contact_number.trim()) {
      newErrors.contact_number = "Contact is required.";
    } else if (!/^\d{10}$/.test(formData.contact_number)) {
      newErrors.contact_number = "Contact must be a 10-digit number.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        await axios.put(
          `http://localhost:8080/api/patients/${patient_id}`,
          {
            userId: parseInt(user_id),
            fullName: formData.full_name,
            email: formData.email,
            gender: formData.gender.toUpperCase(),
            dateOfBirth: formData.date_of_birth,
            contactNumber: formData.contact_number
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setMessage("Patient profile updated successfully!");
        navigate("/patient-dashboard");
      } catch (error) {
        console.error("Error updating patient profile:", error);
        if (error.response) {
          setMessage(
            `Error: ${error.response.data.message || "Failed to update patient profile. Please try again."}`
          );
        } else {
          setMessage("An unexpected error occurred. Please try again.");
        }
      }
    } else {
      setMessage("Please fix the errors in the form.");
    }
  };

  return (
    <div className="edit-profile-container">
      <form className="edit-profile-form" onSubmit={handleSubmit}>
        <h2>Edit Profile</h2>
        {message && <p className="form-message">{message}</p>}

        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            className="form-input"
          />
          {errors.full_name && <p className="form-error">{errors.full_name}</p>}
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-input"
          />
          {errors.email && <p className="form-error">{errors.email}</p>}
        </div>

        <div className="form-group">
          <label>Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="form-input"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          {errors.gender && <p className="form-error">{errors.gender}</p>}
        </div>

        <div className="form-group">
          <label>Date of Birth</label>
          <input
            type="date"
            name="date_of_birth"
            value={formData.date_of_birth}
            onChange={handleChange}
            className="form-input"
          />
          {errors.date_of_birth && <p className="form-error">{errors.date_of_birth}</p>}
        </div>

        <div className="form-group">
          <label>Contact Number</label>
          <input
            type="text"
            name="contact_number"
            value={formData.contact_number}
            onChange={handleChange}
            className="form-input"
          />
          {errors.contact_number && <p className="form-error">{errors.contact_number}</p>}
        </div>

        <button type="submit" className="submit-button">
          Edit Profile
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
