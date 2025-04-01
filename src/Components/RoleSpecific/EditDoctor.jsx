import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import "../../App.css";

const EditDoctor = () => {
  const [formData, setFormData] = useState({
    name: "",
    specialty: "",
    experience: "",
    qualification: "",
    contactNumber: "",
    designation: "Senior Consultant",
  });
  const doctor_id = localStorage.getItem("doctor_id");
  const user_id = localStorage.getItem("user_id");
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);

  const fetchDoctorData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/doctors/${parseInt(doctor_id)}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setFormData({
        name: response?.data?.name || "",
        specialty: response?.data?.specialty || "",
        experience: response?.data?.experience || "",
        qualification: response?.data?.qualification || "",
        contactNumber: response?.data?.contactNumber || "",
        designation: response?.data?.designation || "Senior Consultant",
      });
    } catch (error) {
      console.error("Error fetching doctor data:", error);
    }
  };

  useEffect(() => {
    if (doctor_id && token) {
      fetchDoctorData();
    } else {
      console.error("Doctor ID or token not found in localStorage.");
    }
  }, [doctor_id, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
    }

    if (!formData.experience.toString().trim()) {
      newErrors.experience = "Experience is required.";
    } else if (isNaN(Number(formData.experience))) {
      newErrors.experience = "Experience must be a valid number.";
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

    if (validateForm()) {
      try {
        await axios.put(
          `http://localhost:8080/api/doctors/${doctor_id}`,
          {
            userId: parseInt(user_id),
            name: formData.name,
            specialty: formData.specialty,
            experience: formData.experience,
            qualification: formData.qualification,
            contactNumber: formData.contactNumber,
            designation: formData.designation,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setMessage("Doctor profile updated successfully!");
        navigate("/doctor-dashboard");
      } catch (error) {
        console.error("Error updating doctor profile:", error);
        if (error.response) {
          setMessage(
            `Error: ${error.response.data.message || "Failed to update doctor profile. Please try again."}`
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
        <h2>Edit Doctor Profile</h2>
        {message && <p className="form-message">{message}</p>}

        <div className="form-group">
          <label>Name</label>
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
          <input
            type="text"
            name="specialty"
            value={formData.specialty}
            onChange={handleChange}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label>Experience</label>
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
            <option value="Senior Consultant">Senior Consultant</option>
            <option value="Junior Consultant">Junior Consultant</option>
            <option value="Resident Doctor">Resident Doctor</option>
          </select>
        </div>

        <button type="submit" className="submit-button">
          Edit Profile
        </button>
      </form>
    </div>
  );
};

export default EditDoctor;
