import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div>
      <div>
        <h1>Welcome to Our Healthcare Platform</h1>
        <p>Some text about your platform.</p>
      </div>
      <div>
        <Link to="/register">Register</Link>
        <Link to="/login">Login</Link>
      </div>
    </div>
  );
};

export default LandingPage;
