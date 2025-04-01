import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../AuthContext";

const ListMedicalRecords = ({ allowAdd, allowUpdate, allowDelete }) => {
  const { token } = useContext(AuthContext);
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [newRecord, setNewRecord] = useState({
    recordDate: "",
    diagnosis: "",
    treatmentPlan: "",
    notes: "",
    patientId: "",
  });
  const [currentRecord, setCurrentRecord] = useState(null); // For updating a record
  const [showUpdateModal, setShowUpdateModal] = useState(false); // Toggle update modal
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchMedicalRecords = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/medical-records", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMedicalRecords(response.data);
      } catch (error) {
        setErrorMessage("Failed to fetch medical records. Please try again.");
        console.error(
          "Error fetching medical records:",
          error.response ? error.response.data : error.message
        );
      }
    };

    if (token) {
      fetchMedicalRecords();
    }
  }, [token]);

  const validateForm = (data) => {
    const newErrors = {};

    if (!data.recordDate) {
      newErrors.recordDate = "Record date is required.";
    }

    if (!data.diagnosis.trim()) {
      newErrors.diagnosis = "Diagnosis is required.";
    }

    if (!data.treatmentPlan.trim()) {
      newErrors.treatmentPlan = "Treatment plan is required.";
    }

    if (!data.patientId || isNaN(data.patientId) || data.patientId <= 0) {
      newErrors.patientId = "Valid Patient ID is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const addMedicalRecord = async () => {
    if (!validateForm(newRecord)) return;

    try {
      const response = await axios.post(
        "http://localhost:8080/api/medical-records",
        newRecord,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setMedicalRecords((prevRecords) => [...prevRecords, response.data]);
      setNewRecord({
        recordDate: "",
        diagnosis: "",
        treatmentPlan: "",
        notes: "",
        patientId: "",
      });
      alert("Medical record added successfully!");
    } catch (error) {
      console.error("Error adding medical record:", error);
      alert("Failed to add medical record. Please try again.");
    }
  };

  const updateMedicalRecord = async () => {
    if (!currentRecord || !validateForm(currentRecord)) return;

    try {
      const response = await axios.put(
        `http://localhost:8080/api/medical-records/${currentRecord.id}`,
        currentRecord,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMedicalRecords((prevRecords) =>
        prevRecords.map((record) =>
          record.id === currentRecord.id ? response.data : record
        )
      );
      setShowUpdateModal(false);
      alert("Medical record updated successfully!");
    } catch (error) {
      console.error("Error updating medical record:", error);
      alert("Failed to update medical record. Please try again.");
    }
  };

  const deleteMedicalRecord = async (id) => {
    if (!allowDelete) return;

    try {
      await axios.delete(`http://localhost:8080/api/medical-records/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMedicalRecords((prevRecords) =>
        prevRecords.filter((record) => record.id !== id)
      );
      alert("Medical record deleted successfully!");
    } catch (error) {
      console.error("Error deleting medical record:", error);
      alert("Failed to delete medical record. Please try again.");
    }
  };

  return (
    <div className="list-container">
      <h3 className="modal-title">Medical Records</h3>
      {errorMessage && <p className="form-error">{errorMessage}</p>}
      {medicalRecords.length > 0 ? (
        <table className="list-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Record Date</th>
              <th>Diagnosis</th>
              <th>Treatment Plan</th>
              <th>Notes</th>
              <th>Patient ID</th>
              {(allowUpdate || allowDelete) && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {medicalRecords.map((record) => (
              <tr key={record.id}>
                <td>{record.id}</td>
                <td>{record.recordDate}</td>
                <td>{record.diagnosis}</td>
                <td>{record.treatmentPlan}</td>
                <td>{record.notes || "N/A"}</td>
                <td>{record.patientId}</td>
                {(allowUpdate || allowDelete) && (
                  <td className="list-actions">
                    {allowUpdate && (
                      <button
                        className="btn-update"
                        onClick={() => {
                          setCurrentRecord(record);
                          setShowUpdateModal(true);
                        }}
                      >
                        Update
                      </button>
                    )}
                    {allowDelete && (
                      <button
                        className="btn-delete"
                        onClick={() => deleteMedicalRecord(record.id)}
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
        <p className="list-empty">No medical records found.</p>
      )}

      {allowAdd && (
        <div className="appointment-form">
          <h4 className="modal-title">Add New Medical Record</h4>
          <div className="form-group">
            <label>Record Date</label>
            <input
              type="date"
              value={newRecord.recordDate}
              onChange={(e) =>
                setNewRecord({ ...newRecord, recordDate: e.target.value })
              }
              className="form-input"
            />
            {errors.recordDate && <p className="form-error">{errors.recordDate}</p>}
          </div>
          <div className="form-group">
            <label>Diagnosis</label>
            <input
              type="text"
              value={newRecord.diagnosis}
              onChange={(e) =>
                setNewRecord({ ...newRecord, diagnosis: e.target.value })
              }
              className="form-input"
            />
            {errors.diagnosis && <p className="form-error">{errors.diagnosis}</p>}
          </div>
          <div className="form-group">
            <label>Treatment Plan</label>
            <input
              type="text"
              value={newRecord.treatmentPlan}
              onChange={(e) =>
                setNewRecord({ ...newRecord, treatmentPlan: e.target.value })
              }
              className="form-input"
            />
            {errors.treatmentPlan && <p className="form-error">{errors.treatmentPlan}</p>}
          </div>
          <div className="form-group">
            <label>Notes</label>
            <textarea
              value={newRecord.notes}
              onChange={(e) =>
                setNewRecord({ ...newRecord, notes: e.target.value })
              }
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label>Patient ID</label>
            <input
              type="number"
              value={newRecord.patientId}
              onChange={(e) =>
                setNewRecord({ ...newRecord, patientId: e.target.value })
              }
              className="form-input"
            />
            {errors.patientId && <p className="form-error">{errors.patientId}</p>}
          </div>
          <button className="btn-primary" onClick={addMedicalRecord}>
            Add Record
          </button>
        </div>
      )}

      {showUpdateModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h4 className="modal-title">Update Medical Record</h4>
            <div className="form-group">
              <label>Record Date</label>
              <input
                type="date"
                value={currentRecord.recordDate}
                onChange={(e) =>
                  setCurrentRecord({ ...currentRecord, recordDate: e.target.value })
                }
                className="form-input"
              />
              {errors.recordDate && <p className="form-error">{errors.recordDate}</p>}
            </div>
            <div className="form-group">
              <label>Diagnosis</label>
              <input
                type="text"
                value={currentRecord.diagnosis}
                onChange={(e) =>
                  setCurrentRecord({ ...currentRecord, diagnosis: e.target.value })
                }
                className="form-input"
              />
              {errors.diagnosis && <p className="form-error">{errors.diagnosis}</p>}
            </div>
            <div className="form-group">
              <label>Treatment Plan</label>
              <input
                type="text"
                value={currentRecord.treatmentPlan}
                onChange={(e) =>
                  setCurrentRecord({ ...currentRecord, treatmentPlan: e.target.value })
                }
                className="form-input"
              />
              {errors.treatmentPlan && <p className="form-error">{errors.treatmentPlan}</p>}
            </div>
            <div className="form-group">
              <label>Notes</label>
              <textarea
                value={currentRecord.notes}
                onChange={(e) =>
                  setCurrentRecord({ ...currentRecord, notes: e.target.value })
                }
                className="form-input"
              />
            </div>
            <div className="form-actions">
              <button className="btn-primary" onClick={updateMedicalRecord}>
                Update Record
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

export default ListMedicalRecords;
