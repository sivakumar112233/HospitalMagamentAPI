import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';
import Register from './components/Register';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import DoctorDashboard from './components/DoctorDashboard';
import PatientDashboard from './components/PatientDashboard';
import Home from './components/Home';
import Footer from './components/Footer';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState('');

  const handleLogin = (userData) => {
    setIsAuthenticated(true);
    setUserRole(userData.role);
    
    localStorage.setItem('userData', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole('');
   
    localStorage.removeItem('userData');
  };

  return (
    <Router>
      <div>
        <Navbar isAuthenticated={isAuthenticated} handleLogout={handleLogout} userRole={userRole} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login handleLogin={handleLogin} />} />
          <Route
            path="/admindashboard"
            element={isAuthenticated && userRole === 'Admin' ? <AdminDashboard /> : <Navigate to="/login" />}
          />
          <Route
            path="/doctordashboard"
            element={isAuthenticated && userRole === 'Doctor' ? <DoctorDashboard /> : <Navigate to="/login" />}
          />
          <Route
            path="/patientdashboard"
            element={isAuthenticated && userRole === 'Patient' ? <PatientDashboard /> : <Navigate to="/login" />}
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
