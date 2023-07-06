import React, { useState, useEffect } from "react";
import Doctor from "./Doctor";
import "./AdminDashboard.css"; // Import the CSS file

function AdminDashboard() {
  const [doctors, setDoctors] = useState([]);
  const [error, setError] = useState(null);
  const [enteredStatus, setEnteredStatus] = useState({
    doctorState: "",
  });
  const [buttonClicked, setButtonClicked] = useState(false);

  const [user, setUser] = useState({
    userId: 0,
    email: "",
    password: "",
    role: localStorage.getItem("role"),
    token: "",
  });

  useEffect(() => {
    let ignore = false;

    if (!ignore) getAllDoctors();
    return () => {
      ignore = true;
    };
  }, []);

  const getAllDoctors = async () => {
    try {
      const response = await fetch("http://localhost:7143/api/GetAllDoctors", {
        method: "GET",
        headers: {
          accept: "text/plain",
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      if (response.status === 200) {
        const data = await response.json();
        setDoctors(data);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleApproval = (index) => {
    const updatedDoctors = [...doctors];
    updatedDoctors[index].approved = true;
    setDoctors(updatedDoctors);
    setButtonClicked(true);
  };

  const handleDecline = (index) => {
    const updatedDoctors = [...doctors];
    updatedDoctors[index].approved = false;
    setDoctors(updatedDoctors);
    setButtonClicked(true);
  };

  return (
    <div >
      <div className="GetAll">
        {doctors.map((doctor, index) => (
          <Doctor key={index} path={doctor}>
            <div>
              {!doctor.approved && (
                <div>
                  <button onClick={() => handleApproval(index)}>Approve</button>
                  <button onClick={() => handleDecline(index)}>Decline</button>
                </div>
              )}
            </div>
          </Doctor>
        ))}
      </div>
    </div>
  );
}

export default AdminDashboard;
