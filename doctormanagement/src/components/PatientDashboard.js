import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './PatientDashboard.css';

const PatientDashboard = () => {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [specialty, setSpecialty] = useState('');

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const token = localStorage.getItem('token'); // Get the token from localStorage
      const headers = { Authorization: `Bearer ${token}` }; // Set the authorization header

      const response = await axios.get('http://localhost:7143/api/GetAllDoctors', { headers });
      const doctorData = response.data;
      setDoctors(doctorData);
      setFilteredDoctors(doctorData);
    } catch (error) {
      console.error(error);
   
    }
  };

  const handleFilterDoctors = () => {
    const trimmedSpecialty = specialty.trim().toLowerCase();
  
    if (trimmedSpecialty === 'ear') {
      setFilteredDoctors(doctors);
    } else {
      const filtered = doctors.filter(doctor =>
        doctor.specialization.toLowerCase().includes(trimmedSpecialty)
      );
      setFilteredDoctors(filtered);
    }
  };
  
  

  const handleViewAllDoctors = () => {
    setFilteredDoctors(doctors);
    setSpecialty('');
  };

  return (
    <div>
      <h2>Patient Dashboard</h2>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by specialty"
          value={specialty}
          onChange={e => setSpecialty(e.target.value)}
          className="search-input"
        />
        <button onClick={handleFilterDoctors} className="search-button">Search</button>
        <button onClick={handleViewAllDoctors} className="view-all-button">View All Doctors</button>
      </div>
      <h3>Doctors</h3>
      {filteredDoctors.length === 0 ? (
        <p>No specialties matched the search criteria.</p>
      ) : (
        <table className="centered-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Date of Birth</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Specialization</th>
              <th>Experience</th>
            </tr>
          </thead>
          <tbody>
            {filteredDoctors.map(doctor => (
              <tr key={doctor.doctorId}>
                <td>{doctor.name}</td>
                <td>{doctor.dateOfBirth}</td>
                <td>{doctor.age}</td>
                <td>{doctor.gender}</td>
                <td>{doctor.phone}</td>
                <td>{doctor.address}</td>
                <td>{doctor.specialization}</td>
                <td>{doctor.experience}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
     
    </div>
  );
};

export default PatientDashboard;
