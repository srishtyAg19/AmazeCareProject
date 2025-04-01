import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "./AuthContext";
import "./Registration.css";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!formData.role) {
      setErrorMessage("Please select a role.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/api/authenticate/login", formData);

      const { accessToken, userDto } = response.data; // Assuming the response has 'token' and 'userDto'
      login(accessToken); // Store the token in AuthContext
    console.log(accessToken, "hie");
      localStorage.setItem('user_id', userDto.id);
      // Redirect based on the user's role
      if (userDto.role === "ADMIN") {
        navigate("/admin-dashboard");
      } else if (userDto.role === "PATIENT") {
        navigate("/patient-dashboard");
      } else if (userDto.role === "DOCTOR") {
        navigate("/doctor-dashboard");
      } else {
        setErrorMessage("Invalid role.");
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Login failed. Please try again.";
      setErrorMessage(errorMsg);
    }
  };

  return (
    <div className="registration-container">
      <form className="registration-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <p>Access your healthcare account</p>
  
        {errorMessage && <p className="error-message">{errorMessage}</p>}
  
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter your username"
            required
          />
        </div>
  
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
          />
        </div>
  
        <div className="form-group">
          <label htmlFor="role">Select Role</label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select Role
            </option>
            <option value="PATIENT">Patient</option>
            <option value="DOCTOR">Doctor</option>
            <option value="ADMIN">Admin</option>
          </select>
        </div>
  
        <button type="submit" className="submit-button">
          Login
        </button>
  
        <div className="login-link">
          Don't have an account? <a href="/register">Register</a>
        </div>
      </form>
    </div>
  );
}; 
  export default LoginForm;
  