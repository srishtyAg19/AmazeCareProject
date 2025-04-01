import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import "../../App.css"; // Assuming you have this CSS file for styles

const DoctorProfile = () => {
  const [formData, setFormData] = useState({
    name: "",
    specialty: "",
    experience: "",
    qualification: "",
    contactNumber: "",
    designation: "Senior Consultant", // Default designation
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { token } = useContext(AuthContext); // Access token from AuthContext

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Full Name is required.";
    }

    if (!formData.specialty.trim()) {
      newErrors.specialty = "Specialty is required.";
    }

    if (!formData.experience.trim()) {
      newErrors.experience = "Experience is required.";
    } else if (isNaN(formData.experience) || parseInt(formData.experience) <= 0) {
      newErrors.experience = "Experience must be a positive number.";
    }

    if (!formData.qualification.trim()) {
      newErrors.qualification = "Qualification is required.";
    }

    if (!formData.contactNumber.trim()) {
      newErrors.contactNumber = "Contact Number is required.";
    } else if (!/^\d{10}$/.test(formData.contactNumber)) {
      newErrors.contactNumber = "Contact Number must be a 10-digit number.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user_id = localStorage.getItem("user_id");
    if (validateForm()) {
      try {
        const response = await axios.post(
          "http://localhost:8080/api/doctors",
          {
            userId: parseInt(user_id),
            name: formData.name,
            specialty: formData.specialty,
            experience: parseInt(formData.experience),
            qualification: formData.qualification,
            contactNumber: formData.contactNumber,
            designation: formData.designation, // Ensure designation is sent
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        localStorage.setItem("doctor_id", response?.data?.id);
        setMessage("Doctor profile created successfully!");
        navigate("/doctor-dashboard"); // Redirect to doctor dashboard after success
      } catch (error) {
        console.error("Error creating doctor profile:", error);
        if (error.response) {
          setMessage(
            `Error: ${error.response.data.message || "Failed to create doctor profile. Please try again."}`
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
        <h2>Create Doctor Profile</h2>
        {message && <p className="form-message">{message}</p>}

        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="form-input"
          />
          {errors.name && <p className="form-error">{errors.name}</p>}
        </div>

        <div className="form-group">
          <label>Specialty</label>
          <select
            name="specialty"
            value={formData.specialty}
            onChange={handleChange}
            className="form-input"
          >
            <option value="">Select Specialty</option>
            <option value="CARDIOLOGY">CARDIOLOGY</option>
            <option value="DERMATOLOGY">DERMATOLOGY</option>
            <option value="ORTHOPEDICS">ORTHOPEDICS</option>
            <option value="NEUROLOGY">NEUROLOGY</option>
            <option value="PEDIATRICS">PEDIATRICS</option>
            <option value="RADIOLOGY">RADIOLOGY</option>
            <option value="ONCOLOGY">ONCOLOGY</option>
            <option value="GYNECOLOGY">GYNECOLOGY</option>
            <option value="UROLOGY">UROLOGY</option>
            <option value="PSYCHIATRY">PSYCHIATRY</option>
          </select>
          {errors.specialty && <p className="form-error">{errors.specialty}</p>}
        </div>

        <div className="form-group">
          <label>Experience (in years)</label>
          <input
            type="text"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            className="form-input"
          />
          {errors.experience && <p className="form-error">{errors.experience}</p>}
        </div>

        <div className="form-group">
          <label>Qualification</label>
          <input
            type="text"
            name="qualification"
            value={formData.qualification}
            onChange={handleChange}
            className="form-input"
          />
          {errors.qualification && <p className="form-error">{errors.qualification}</p>}
        </div>

        <div className="form-group">
          <label>Contact Number</label>
          <input
            type="text"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            className="form-input"
          />
          {errors.contactNumber && <p className="form-error">{errors.contactNumber}</p>}
        </div>

        <div className="form-group">
          <label>Designation</label>
          <select
            name="designation"
            value={formData.designation}
            onChange={handleChange}
            className="form-input"
          >
            <option value="Junior">Junior</option>
            <option value="Senior">Senior</option>
            <option value="Lead">Lead</option>
            <option value="Consultant">Consultant</option>
            <option value="Associate">Associate</option>
          </select>
        </div>

        <button type="submit" className="submit-button">
          Create Profile
        </button>
      </form>
    </div>
  );
};

export default DoctorProfile;
