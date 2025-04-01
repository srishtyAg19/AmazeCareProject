import React from "react";
import { Link } from "react-router-dom";

const Header = ({ isLoggedIn, handleLogout }) => (
  <header className="minimal-header">
    <div className="logo">
      <h1>AmazeCare</h1>
    </div>
    <nav className="menu">
      <Link to="/">Home</Link>
      {!isLoggedIn ? (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      ) : (
        <button onClick={handleLogout}>Logout</button>
      )}
    </nav>
  </header>
);

export default Header;
