import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../AuthContext";
import '../../App.css';
import ListAppointmentDetails from "./ListAppointmentDetails";

const ListUsers = ({ allowAdd, allowUpdate, allowDelete, filterByRole }) => {
  const { token } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        let fetchedUsers = response.data;

        if (filterByRole) {
          fetchedUsers = fetchedUsers.filter((user) => user.role === filterByRole);
        }

        setUsers(fetchedUsers);
      } catch (error) {
        setErrorMessage("Failed to fetch users. Please try again.");
        console.error("Error fetching users:", error.response ? error.response.data : error.message);
      }
    };

    if (token) {
      fetchUsers();
    }
  }, [token, filterByRole]);

  const addUser = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!newUser.username || !newUser.email || !newUser.password || !newUser.role) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/authenticate/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newUser),
      });

      if (response.ok) {
        const message = await response.text();
        alert(message || "User added successfully!");
        setUsers((prevUsers) => [...prevUsers, newUser]);
        setNewUser({ username: "", email: "", password: "", role: "" });
        setShowAddModal(false);
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "Failed to register user. Please try again.");
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please check your connection and try again.");
      console.error("Error adding user:", error);
    }
  };

  const updateUser = async () => {
    if (!currentUser) return;

    try {
      const response = await axios.put(
        `http://localhost:8080/api/users/${currentUser.id}`,
        currentUser,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUsers((prevUsers) =>
        prevUsers.map((user) => (user.id === currentUser.id ? response.data : user))
      );
      setShowUpdateModal(false);
      alert("User updated successfully!");
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Failed to update user. Please try again.");
    }
  };

  const deleteUser = async (id) => {
    if (!allowDelete) return;

    try {
      await axios.delete(`http://localhost:8080/api/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
      alert("User deleted successfully!");
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user. Please try again.");
    }
  };

  return (
    <div className="list-container">
      <h3 className="modal-title">Users</h3>
      {errorMessage && <p className="form-error">{errorMessage}</p>}
      {users.length > 0 ? (
        <table className="list-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
              {(allowUpdate || allowDelete) && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                {(allowUpdate || allowDelete) && (
                  <td className="list-actions">
                    {allowUpdate && (
                      <button
                        className="btn-update"
                        onClick={() => {
                          setCurrentUser(user);
                          setShowUpdateModal(true);
                        }}
                      >
                        Update
                      </button>
                    )}
                    {allowDelete && (
                      <button
                        className="btn-delete"
                        onClick={() => deleteUser(user.id)}
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
        <p className="list-empty">No users found.</p>
      )}

      {allowAdd && (
        <button className="btn-primary" onClick={() => setShowAddModal(true)}>
          Add New User
        </button>
      )}

      {/* Add User Modal */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h4 className="modal-title">Add User</h4>
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                value={newUser.username}
                onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                value={newUser.password}
                onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label>Role</label>
              <select
                value={newUser.role}
                onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                className="form-input"
              >
                <option value="" disabled>
                  Select Role
                </option>
                <option value="PATIENT">Patient</option>
                <option value="DOCTOR">Doctor</option>
                <option value="ADMIN">Admin</option>
              </select>
            </div>
            <div className="form-actions">
              <button className="btn-primary" onClick={addUser}>
                Add
              </button>
              <button
                className="btn-secondary"
                onClick={() => setShowAddModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Update User Modal */}
      {showUpdateModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h4 className="modal-title">Update User</h4>
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                value={currentUser.username}
                onChange={(e) =>
                  setCurrentUser({ ...currentUser, username: e.target.value })
                }
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={currentUser.email}
                onChange={(e) =>
                  setCurrentUser({ ...currentUser, email: e.target.value })
                }
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label>Role</label>
              <select
                value={currentUser.role}
                onChange={(e) =>
                  setCurrentUser({ ...currentUser, role: e.target.value })
                }
                className="form-input"
              >
                <option value="">Select Role</option>
                <option value="PATIENT">Patient</option>
                <option value="DOCTOR">Doctor</option>
                <option value="ADMIN">Admin</option>
              </select>
            </div>
            <div className="form-actions">
              <button className="btn-primary" onClick={updateUser}>
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

export default ListUsers;
