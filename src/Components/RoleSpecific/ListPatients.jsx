import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../AuthContext";

const ListPatients = ({ allowAdd, allowUpdate, allowDelete }) => {
  const { token } = useContext(AuthContext);
  const [patients, setPatients] = useState([]);
  const [newPatient, setNewPatient] = useState({
    userId: "",
    fullName: "",
    email: "",
    gender: "",
    dateOfBirth: "",
    contactNumber: "",
  });
  const [currentPatient, setCurrentPatient] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/patients", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPatients(response.data);
      } catch (error) {
        setErrorMessage("Failed to fetch patients. Please try again.");
        console.error("Error fetching patients:", error.response?.data || error.message);
      }
    };

    if (token) {
      fetchPatients();
    }
  }, [token]);

  const validateForm = (data) => {
    const newErrors = {};

    if (!data.fullName.trim()) {
      newErrors.fullName = "Full Name is required.";
    }

    if (!data.dateOfBirth) {
      newErrors.dateOfBirth = "Date of Birth is required.";
    } else {
      const today = new Date();
      const dob = new Date(data.dateOfBirth);
      if (dob >= today) {
        newErrors.dateOfBirth = "Date of Birth must be in the past.";
      }
    }

    if (!data.gender) {
      newErrors.gender = "Gender is required.";
    }

    if (!data.contactNumber.trim()) {
      newErrors.contactNumber = "Contact is required.";
    } else if (!/^\d{10}$/.test(data.contactNumber)) {
      newErrors.contactNumber = "Contact must be a 10-digit number.";
    }

    if (!data.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(data.email)) {
      newErrors.email = "Invalid email format.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const addPatient = async (e) => {
    e.preventDefault();
    setMessage("");

    if (validateForm(newPatient)) {
      try {
        const response = await axios.post(
          "http://localhost:8080/api/patients",
          {
            userId: parseInt(newPatient.userId),
            fullName: newPatient.fullName,
            email: newPatient.email,
            gender: newPatient.gender.toUpperCase(),
            dateOfBirth: newPatient.dateOfBirth,
            contactNumber: newPatient.contactNumber,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setPatients((prevPatients) => [...prevPatients, response.data]);
        setNewPatient({
          userId: "",
          fullName: "",
          email: "",
          gender: "",
          dateOfBirth: "",
          contactNumber: "",
        });
        setMessage("Patient added successfully!");
      } catch (error) {
        console.error("Error adding patient:", error);
        setMessage("Failed to add patient. Please try again.");
      }
    } else {
      setMessage("Please fix the errors in the form.");
    }
  };

  const updatePatient = async () => {
    if (!currentPatient) return;

    if (validateForm(currentPatient)) {
      try {
        const response = await axios.put(
          `http://localhost:8080/api/patients/${currentPatient.id}`,
          currentPatient,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setPatients((prevPatients) =>
          prevPatients.map((patient) =>
            patient.id === currentPatient.id ? response.data : patient
          )
        );
        setShowUpdateModal(false);
        alert("Patient updated successfully!");
      } catch (error) {
        console.error("Error updating patient:", error);
        alert("Failed to update patient. Please try again.");
      }
    }
  };

  const deletePatient = async (id) => {
    if (!allowDelete) return;

    try {
      await axios.delete(`http://localhost:8080/api/patients/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPatients((prevPatients) => prevPatients.filter((patient) => patient.id !== id));
      alert("Patient deleted successfully!");
    } catch (error) {
      console.error("Error deleting patient:", error);
      alert("Failed to delete patient. Please try again.");
    }
  };

  return (
    <div className="list-container">
      <h3 className="modal-title">Patients</h3>
      {errorMessage && <p className="form-error">{errorMessage}</p>}
      {patients.length > 0 ? (
        <table className="list-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Gender</th>
              <th>Date of Birth</th>
              <th>Contact</th>
              {(allowUpdate || allowDelete) && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => (
              <tr key={patient.id}>
                <td>{patient.id}</td>
                <td>{patient.fullName}</td>
                <td>{patient.email}</td>
                <td>{patient.gender}</td>
                <td>{patient.dateOfBirth}</td>
                <td>{patient.contactNumber}</td>
                {(allowUpdate || allowDelete) && (
                  <td className="list-actions">
                    {allowUpdate && (
                      <button
                        className="btn-update"
                        onClick={() => {
                          setCurrentPatient(patient);
                          setShowUpdateModal(true);
                        }}
                      >
                        Update
                      </button>
                    )}
                    {allowDelete && (
                      <button
                        className="btn-delete"
                        onClick={() => deletePatient(patient.id)}
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
        <p className="list-empty">No patients found.</p>
      )}

      {allowAdd && (
        <div className="appointment-form">
          <h4 className="modal-title">Add New Patient</h4>
          {message && <p className="message">{message}</p>}
          <form onSubmit={addPatient}>
            <div className="form-group">
              <label>User ID</label>
              <input
                type="number"
                name="userId"
                value={newPatient.userId}
                onChange={(e) =>
                  setNewPatient({ ...newPatient, userId: e.target.value })
                }
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="fullName"
                value={newPatient.fullName}
                onChange={(e) =>
                  setNewPatient({ ...newPatient, fullName: e.target.value })
                }
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={newPatient.email}
                onChange={(e) =>
                  setNewPatient({ ...newPatient, email: e.target.value })
                }
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label>Gender</label>
              <select
                name="gender"
                value={newPatient.gender}
                onChange={(e) =>
                  setNewPatient({ ...newPatient, gender: e.target.value })
                }
                className="form-input"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div className="form-group">
              <label>Date of Birth</label>
              <input
                type="date"
                name="dateOfBirth"
                value={newPatient.dateOfBirth}
                onChange={(e) =>
                  setNewPatient({ ...newPatient, dateOfBirth: e.target.value })
                }
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label>Contact Number</label>
              <input
                type="text"
                name="contactNumber"
                value={newPatient.contactNumber}
                onChange={(e) =>
                  setNewPatient({ ...newPatient, contactNumber: e.target.value })
                }
                className="form-input"
              />
            </div>
            <button className="btn-primary" type="submit">
              Add Patient
            </button>
          </form>
        </div>
      )}

      {showUpdateModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h4 className="modal-title">Update Patient</h4>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={currentPatient.fullName}
                  onChange={(e) =>
                    setCurrentPatient({ ...currentPatient, fullName: e.target.value })
                  }
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={currentPatient.email}
                  onChange={(e) =>
                    setCurrentPatient({ ...currentPatient, email: e.target.value })
                  }
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label>Gender</label>
                <select
                  name="gender"
                  value={currentPatient.gender}
                  onChange={(e) =>
                    setCurrentPatient({ ...currentPatient, gender: e.target.value })
                  }
                  className="form-input"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              <div className="form-group">
                <label>Date of Birth</label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={currentPatient.dateOfBirth}
                  onChange={(e) =>
                    setCurrentPatient({ ...currentPatient, dateOfBirth: e.target.value })
                  }
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label>Contact Number</label>
                <input
                  type="text"
                  name="contactNumber"
                  value={currentPatient.contactNumber}
                  onChange={(e) =>
                    setCurrentPatient({
                      ...currentPatient,
                      contactNumber: e.target.value,
                    })
                  }
                  className="form-input"
                />
              </div>
              <div className="form-actions">
                <button className="btn-primary" onClick={updatePatient}>
                  Update
                </button>
                <button
                  className="btn-secondary"
                  onClick={() => setShowUpdateModal(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListPatients;
