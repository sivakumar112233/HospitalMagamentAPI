import React, { useEffect, useState } from 'react';
import './DoctorDashboard.css';
const DoctorDashboard = () => {
  const [doctor, setDoctor] = useState(null);
  const [isUpdated, setIsUpdated] = useState(false);
  const [name, setName] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [experience, setExperience] = useState('');
  const [phone, setPhone] = useState('');

  const fetchDoctor = async () => {
    try {
      console.log('Fetching doctor data...');
      // Retrieve the user ID from localStorage
      const userId = localStorage.getItem('userId');

      // Retrieve the token from localStorage
      const token = localStorage.getItem('token');

      // Make the POST request with the user ID and token
      const response = await fetch('http://localhost:7143/api/GetDoctor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ userId })
      });

      if (response.ok) {
        const doctorData = await response.json();
        console.log('Doctor data:', doctorData);
        setDoctor(doctorData);
        setName(doctorData.name);
        setSpecialization(doctorData.specialization);
        setExperience(doctorData.experience);
        setPhone(doctorData.phone);
      } else {
        throw new Error('Failed to fetch doctor data');
      }
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };

  useEffect(() => {
    fetchDoctor();
  }, []);

  const handleUpdateProfile = async () => {
    try {
      // Retrieve the token from localStorage
      const token = localStorage.getItem('token');

      // Make the PUT request with the updated doctor object and token
      const response = await fetch('http://localhost:7143/api/UpdateDoctorDetails', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ ...doctor, name, specialization, experience, phone })
      });

      if (response.ok) {
        // Handle successful update
        console.log('Doctor profile updated successfully.');
        setIsUpdated(true);
      } else {
        throw new Error('Failed to update doctor profile');
      }
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };

  if (!doctor) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h2>Doctor Dashboard</h2>
      <h3>Welcome, {doctor.name}</h3>
      <div className="form-container">
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />

        <label htmlFor="specialization">Specialization:</label>
        <input type="text" id="specialization" value={specialization} onChange={(e) => setSpecialization(e.target.value)} />

        <label htmlFor="Experience">Experience:</label>
        <input type="text" id="experience" value={experience} onChange={(e) => setExperience(e.target.value)} />

        <label htmlFor="phone">Phone:</label>
        <input type="text" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
      </div>

      <button onClick={handleUpdateProfile}>Update Profile</button>
      {isUpdated && <div className="update-notification">Profile updated successfully!</div>}
    </div>
  );
};

export default DoctorDashboard;

