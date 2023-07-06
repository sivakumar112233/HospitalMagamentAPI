import { useState, useEffect } from 'react';
import './Doctor.css';

function Doctor(props) {
  const [doctor, setDoctor] = useState(props.path);
  const [user, setUser] = useState({
    userId: 0,
    email: '',
    password: '',
    role: '',
    token: '',
    status: '',
  });
  const [Id, setId] = useState({
    userID: 0,
  });
  const [status, setStatus] = useState('');

  useEffect(() => {
    let ignore = false;

    if (!ignore) fetchUser();
    return () => {
      ignore = true;
    };
  }, []);

  var fetchUser = () => {
    Id.userID = doctor.doctorId;
    console.log(Id);
    fetch('http://localhost:7143/api/GetUser', {
      method: 'POST',
      headers: {
        accept: 'text/plain',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
      body: JSON.stringify({ ...Id }),
    })
      .then(async (data) => {
        if (data.status === 200) {
          const myUser = await data.json();
          console.log(myUser);
          setStatus(myUser.doctorState);
        }
      })
      .catch((err) => {
        console.log(err.error);
      });
  };

  var changeStatus = (newStatus) => {
    setUser((prevUser) => ({
      ...prevUser,
      userId: doctor.doctorId,
      status: newStatus,
    }));

    fetch('http://localhost:7143/api/ChangeStatus', {
      method: 'POST',
      headers: {
        accept: 'text/plain',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
      body: JSON.stringify({ ...user, user: {} }),
    })
      .then(async (res) => {
        if (res.status === 200) {
          const userDTO = await res.json();
          setStatus(userDTO.status);
        }
      })
      .catch((err) => {
        console.log(err.error);
      });
  };

  return (
    <div className="doctor">
      <table className="doctor-table">
        <tbody>
          <tr>
            <td>Name</td>
            <td>{doctor.name}</td>
          </tr>
          <tr>
            <td>Phone</td>
            <td>{doctor.phone}</td>
          </tr>
          <tr>
            <td>Age</td>
            <td>{doctor.age}</td>
          </tr>
          <tr>
            <td>Specilization</td>
            <td>{doctor.specialization}</td>
          </tr>
          <tr>
            <td>Qualification</td>
            <td>{doctor.qualification}</td>
          </tr>
          <tr>
            <td>Experience</td>
            <td>{doctor.yearsOfExperience}</td>
          </tr>
          <tr>
            <td>Status</td>
            <td>{status}</td>
          </tr>
          {status === 'Not Approve' ? (
            <tr>
              <td>
                <button
                  value="Approved"
                  onClick={() => changeStatus('Approved')}
                  className="btn btn-success button"
                >
                  Approve
                </button>
              </td>
              <td>
                <button
                  value="Denied"
                  onClick={() => changeStatus('Denied')}
                  className="btn btn-danger button"
                >
                  Deny
                </button>
              </td>
            </tr>
          ) : status === 'Approved' ? (
            <tr>
              <td>
                <button
                  value="Approved"
                  disabled
                  className="btn btn-success button"
                >
                  Approve
                </button>
              </td>
              <td>
                <button
                  value="Denied"
                  onClick={() => changeStatus('Denied')}
                  className="btn btn-danger button"
                >
                  Deny
                </button>
              </td>
            </tr>
          ) : (
            <tr>
              <td>
                <button
                  value="Approved"
                  onClick={() => changeStatus('Approved')}
                  className="btn btn-success button"
                >
                  Approve
                </button>
              </td>
              <td>
                <button
                  value="Denied"
                  disabled
                  className="btn btn-danger button"
                >
                  Deny
                </button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Doctor;
