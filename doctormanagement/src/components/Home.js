import React, { useState } from 'react';
import homeImage from '../Images/home.jpg';
import axios from 'axios';
import './Home.css';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [showPatientPopup, setShowPatientPopup] = useState(false);
  const [showDoctorPopup, setShowDoctorPopup] = useState(false);

  const togglePatientPopup = () => {
    setShowPatientPopup(!showPatientPopup);
  };

  const toggleDoctorPopup = () => {
    setShowDoctorPopup(!showDoctorPopup);
  };

  const navigate = useNavigate();

  const [patientFormData, setPatientFormData] = useState({
    patientId: 0,
    users: {
      userId: 0,
      email: '',
      role: '',
      doctorStatus: '',
      passwordHash: '',
      passwordKey: ''
    },
    name: '',
    dateOfBirth: '',
    gender: '',
    phone: '',
    address: '',
    emergencyContactName: '',
    emergencyContactNumber: '',
    registrationDate: '',
    password: ''
  });

  const [doctorFormData, setDoctorFormData] = useState({
    DoctorId: 0,
    users: {
      userId: 0,
      email: '',
      role: ''
    },
    name: '',
    dateOfBirth: '',
    gender: '',
    phone: '',
    address: '',
    specialization: '',
    experience: '',
    registrationDate: '',
    password: ''
  });

  const handlePatientFormChange = (e) => {
    setPatientFormData({
      ...patientFormData,
      [e.target.name]: e.target.value
    });
  };

  const handleDoctorFormChange = (e) => {
    setDoctorFormData({
      ...doctorFormData,
      [e.target.name]: e.target.value
    });
  };

  const handlePatientFormSubmit = (e) => {
    e.preventDefault();

    axios
      .post('http://localhost:7143/api/PatientRegister', patientFormData)
      .then((response) => {
        console.log(response.data);
        navigate('/patientDashboard');
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  const handleDoctorFormSubmit = (e) => {
    e.preventDefault();

    axios
      .post('http://localhost:7143/api/DoctorRegister', doctorFormData)


      .then((response) => {
        console.log(response.data);
        navigate('/doctorDashboard');
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  return (
    <div>
      <h2 >Home</h2>
      <div className="image-container">
        <img src={homeImage} alt="Home" className="home-image" />
        <div className="button-container">
          <button className="popup-button patient-button" onClick={togglePatientPopup}>
            Register as Patient
          </button>
          &nbsp;
          <button className="popup-button doctor-button" onClick={toggleDoctorPopup}>
            Register as Doctor
          </button>
        </div>
      </div>

      {showPatientPopup && (
        <div className="popup">
          <div className="popup-content patient-popup">
            <h3>Patient Registration</h3>
            <form onSubmit={handlePatientFormSubmit}>
              <input
                type="text"
                name="name"
                value={patientFormData.name}
                onChange={handlePatientFormChange}
                placeholder="Name"
                required
              />
              <br />
              <input
                type="text"
                name="users.email"
                value={doctorFormData.users.email}
                onChange={handleDoctorFormChange}
                placeholder="Email"
              />

              <br />
              <input
                type="date"
                name="dateOfBirth"
                value={patientFormData.dateOfBirth}
                onChange={handlePatientFormChange}
                placeholder="Date of Birth"
                required
              />
              <br />
              <input
                type="text"
                name="gender"
                value={patientFormData.gender}
                onChange={handlePatientFormChange}
                placeholder="Gender"
                required
              />
              <br />
              <input
                type="text"
                name="phone"
                value={patientFormData.phone}
                onChange={handlePatientFormChange}
                placeholder="Phone"
                required
              />
              <br />
              <input
                type="text"
                name="address"
                value={patientFormData.address}
                onChange={handlePatientFormChange}
                placeholder="Address"
                required
              />
              <br />
              <input
                type="text"
                name="emergencyContactName"
                value={patientFormData.emergencyContactName}
                onChange={handlePatientFormChange}
                placeholder="Emergency Contact Name"
                required
              />
              <br />
              <input
                type="text"
                name="emergencyContactNumber"
                value={patientFormData.emergencyContactNumber}
                onChange={handlePatientFormChange}
                placeholder="Emergency Contact Number"
                required
              />
              <br />
              <input
                type="date"
                name="registrationDate"
                value={patientFormData.registrationDate}
                onChange={handlePatientFormChange}
                placeholder="Registration Date"
                required
              />
              <br />
           
              <br />
              <button type="submit">Register</button>
            </form>
            <button className="close-button" onClick={togglePatientPopup}>
              Close
            </button>
          </div>
        </div>
      )}

      {showDoctorPopup && (
        <div className="popup">
          <div className="popup-content doctor-popup">
            <h3>Doctor Registration</h3>
            <form onSubmit={handleDoctorFormSubmit}>
              <input
                type="text"
                name="name"
                value={doctorFormData.name}
                onChange={handleDoctorFormChange}
                placeholder="Name"
                required
              />
              <br />
              <input
                type="text"
                name="doctorEmail"
                value={doctorFormData.users.email}
                onChange={handleDoctorFormChange}
                placeholder="Email"
              />
              <br />
              <input
                type="date"
                name="dateOfBirth"
                value={doctorFormData.dateOfBirth}
                onChange={handleDoctorFormChange}
                placeholder="Date of Birth"
                required
              />
              <br />
              <input
                type="text"
                name="gender"
                value={doctorFormData.gender}
                onChange={handleDoctorFormChange}
                placeholder="Gender"
                required
              />
              <br />
              <input
                type="text"
                name="phone"
                value={doctorFormData.phone}
                onChange={handleDoctorFormChange}
                placeholder="Phone"
                required
              />
              <br />
              <input
                type="text"
                name="address"
                value={doctorFormData.address}
                onChange={handleDoctorFormChange}
                placeholder="Address"
                required
              />
              <br />
              <input
                type="text"
                name="specialization"
                value={doctorFormData.specialization}
                onChange={handleDoctorFormChange}
                placeholder="Specialization"
                required
              />
              <br />
              <input
                type="text"
                name="experience"
                value={doctorFormData.experience}
                onChange={handleDoctorFormChange}
                placeholder="Experience"
                required
              />
              <br />
              <input
                type="date"
                name="registrationDate"
                value={doctorFormData.registrationDate}
                onChange={handleDoctorFormChange}
                placeholder="Registration Date"
                required
              />
              <br />
              
              <br />
              <button type="submit">Register</button>
            </form>
            <button className="close-button" onClick={toggleDoctorPopup}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
