import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ isAuthenticated, handleLogout, userRole }) => {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    handleLogout();
    navigate('/login');
  };

  return (
    <nav>
      <div className="logo navbar "id="log">
        <Link to="/">kkDOCTORS</Link>
      </div>
      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About Us</Link>
        </li>
        <li>
          <Link to="/contact">Contact Us</Link>
        </li>
        {isAuthenticated && (
          <>
            {userRole === 'Admin' && (
              <li>
                <Link to="/admindashboard">Admin Dashboard</Link>
              </li>
            )}
            {userRole === 'Doctor' && (
              <li>
                <Link to="/doctordashboard">Doctor Dashboard</Link>
              </li>
            )}
            {userRole === 'Patient' && (
              <li>
                <Link to="/patientdashboard">Patient Dashboard</Link>
              </li>
            )}
            <li>
              <button onClick={handleLogoutClick}>Logout</button>
            </li>
          </>
        )}
        {!isAuthenticated && (
          <>
           
            <li>
              <Link to="/login">Login</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
