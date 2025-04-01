import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../AuthContext";
import "../../App.css";

const ListDoctors = ({ allowAdd, allowUpdate, allowDelete }) => {
  const { token } = useContext(AuthContext);
  const [doctors, setDoctors] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [newDoctor, setNewDoctor] = useState({
    name: "",
    specialty: "",
    experience: "",
    qualification: "",
    contactNumber: "",
    userId: "",
  });
  const [currentDoctor, setCurrentDoctor] = useState(null); // For updating a doctor
  const [showUpdateModal, setShowUpdateModal] = useState(false); // Toggle update modal
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/doctors", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setDoctors(response.data);
      } catch (error) {
        setErrorMessage("Failed to fetch doctors. Please try again.");
        console.error(
          "Error fetching doctors:",
          error.response ? error.response.data : error.message
        );
      }
    };

    if (token) {
      fetchDoctors();
    }
  }, [token]);

  const validateForm = (data) => {
    const newErrors = {};

    if (!data.name.trim()) {
      newErrors.name = "Name is required.";
    }

    if (!data.specialty.trim()) {
      newErrors.specialty = "Specialty is required.";
    }

    if (!data.experience || isNaN(data.experience) || data.experience <= 0) {
      newErrors.experience = "Valid experience (positive number) is required.";
    }

    if (!data.qualification.trim()) {
      newErrors.qualification = "Qualification is required.";
    }

    if (!data.contactNumber.trim()) {
      newErrors.contactNumber = "Contact number is required.";
    } else if (!/^[0-9]{10}$/.test(data.contactNumber)) {
      newErrors.contactNumber = "Contact must be a 10-digit number.";
    }

    if (!data.userId || isNaN(data.userId) || data.userId <= 0) {
      newErrors.userId = "Valid User ID is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const addDoctor = async () => {
    if (!validateForm(newDoctor)) return;
    try {
      const response = await axios.post(
        "http://localhost:8080/api/doctors",
        {
          name: newDoctor.name,
          specialty: newDoctor.specialty,
          experience: parseInt(newDoctor.experience),
          qualification: newDoctor.qualification,
          contactNumber: newDoctor.contactNumber,
          designation: newDoctor.designation,
          userId: parseInt(newDoctor.userId),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setDoctors((prev) => [...prev, response.data]);
      setNewDoctor({
        name: "",
        specialty: "",
        experience: "",
        qualification: "",
        contactNumber: "",
        designation: "",
        userId: "",
      });
      alert("Doctor added successfully!");
    } catch (error) {
      console.error("Error adding doctor:", error);
      alert("Failed to add doctor. Please try again.");
    }
  };

  const updateDoctor = async () => {
    if (!currentDoctor || !validateForm(currentDoctor)) {
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:8080/api/doctors/${currentDoctor.id}`,
        currentDoctor,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setDoctors((prevDoctors) =>
        prevDoctors.map((doctor) =>
          doctor.id === currentDoctor.id ? response.data : doctor
        )
      );
      setShowUpdateModal(false);
      alert("Doctor updated successfully!");
    } catch (error) {
      console.error("Error updating doctor:", error);
      alert("Failed to update doctor. Please try again.");
    }
  };

  const deleteDoctor = async (id) => {
    if (!allowDelete) return;

    try {
      await axios.delete(`http://localhost:8080/api/doctors/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDoctors((prevDoctors) => prevDoctors.filter((doctor) => doctor.id !== id));
      alert("Doctor deleted successfully!");
    } catch (error) {
      console.error("Error deleting doctor:", error);
      alert("Failed to delete doctor. Please try again.");
    }
  };

  return (
    <div className="list-container">
      <h3 className="modal-title">Doctors</h3>
      {errorMessage && <p className="form-error">{errorMessage}</p>}
      {doctors.length > 0 ? (
        <table className="list-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>User ID</th>
              <th>Name</th>
              <th>Specialty</th>
              <th>Experience</th>
              <th>Qualification</th>
              <th>Contact Number</th>
              {(allowUpdate || allowDelete) && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {doctors.map((doctor) => (
              <tr key={doctor.id}>
                <td>{doctor.id}</td>
                <td>{doctor.userId}</td>
                <td>{doctor.name}</td>
                <td>{doctor.specialty}</td>
                <td>{doctor.experience}</td>
                <td>{doctor.qualification}</td>
                <td>{doctor.contactNumber}</td>
                {(allowUpdate || allowDelete) && (
                  <td className="list-actions">
                    {allowUpdate && (
                      <button
                        className="btn-update"
                        onClick={() => {
                          setCurrentDoctor(doctor);
                          setShowUpdateModal(true);
                        }}
                      >
                        Update
                      </button>
                    )}
                    {allowDelete && (
                      <button
                        className="btn-delete"
                        onClick={() => deleteDoctor(doctor.id)}
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
        <p className="list-empty">No doctors found.</p>
      )}

      {allowAdd && (
        <div className="appointment-form">
          <h4 className="modal-title">Add New Doctor</h4>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              value={newDoctor.name}
              onChange={(e) =>
                setNewDoctor({ ...newDoctor, name: e.target.value })
              }
              className="form-input"
            />
            {errors.name && <p className="form-error">{errors.name}</p>}
          </div>
          <div className="form-group">
            <label>Specialty</label>
            <input
              type="text"
              value={newDoctor.specialty}
              onChange={(e) =>
                setNewDoctor({ ...newDoctor, specialty: e.target.value })
              }
              className="form-input"
            />
            {errors.specialty && <p className="form-error">{errors.specialty}</p>}
          </div>
          <div className="form-group">
            <label>Experience (Years)</label>
            <input
              type="number"
              value={newDoctor.experience}
              onChange={(e) =>
                setNewDoctor({ ...newDoctor, experience: e.target.value })
              }
              className="form-input"
            />
            {errors.experience && <p className="form-error">{errors.experience}</p>}
          </div>
          <div className="form-group">
            <label>Qualification</label>
            <input
              type="text"
              value={newDoctor.qualification}
              onChange={(e) =>
                setNewDoctor({ ...newDoctor, qualification: e.target.value })
              }
              className="form-input"
            />
            {errors.qualification && <p className="form-error">{errors.qualification}</p>}
          </div>
          <div className="form-group">
            <label>Contact Number</label>
            <input
              type="text"
              value={newDoctor.contactNumber}
              onChange={(e) =>
                setNewDoctor({ ...newDoctor, contactNumber: e.target.value })
              }
              className="form-input"
            />
            {errors.contactNumber && <p className="form-error">{errors.contactNumber}</p>}
          </div>
          <div className="form-group">
            <label>User ID</label>
            <input
              type="number"
              value={newDoctor.userId}
              onChange={(e) =>
                setNewDoctor({ ...newDoctor, userId: e.target.value })
              }
              className="form-input"
            />
            {errors.userId && <p className="form-error">{errors.userId}</p>}
          </div>
          <button className="btn-primary" onClick={addDoctor}>
            Add Doctor
          </button>
        </div>
      )}

      {showUpdateModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h4 className="modal-title">Update Doctor</h4>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                value={currentDoctor.name}
                onChange={(e) =>
                  setCurrentDoctor({ ...currentDoctor, name: e.target.value })
                }
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label>Specialty</label>
              <input
                type="text"
                value={currentDoctor.specialty}
                onChange={(e) =>
                  setCurrentDoctor({
                    ...currentDoctor,
                    specialty: e.target.value,
                  })
                }
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label>Experience (Years)</label>
              <input
                type="number"
                value={currentDoctor.experience}
                onChange={(e) =>
                  setCurrentDoctor({
                    ...currentDoctor,
                    experience: e.target.value,
                  })
                }
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label>Qualification</label>
              <input
                type="text"
                value={currentDoctor.qualification}
                onChange={(e) =>
                  setCurrentDoctor({
                    ...currentDoctor,
                    qualification: e.target.value,
                  })
                }
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label>Contact Number</label>
              <input
                type="text"
                value={currentDoctor.contactNumber}
                onChange={(e) =>
                  setCurrentDoctor({
                    ...currentDoctor,
                    contactNumber: e.target.value,
                  })
                }
                className="form-input"
              />
            </div>
            <div className="form-actions">
              <button className="btn-primary" onClick={updateDoctor}>
                Update
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

export default ListDoctors;
