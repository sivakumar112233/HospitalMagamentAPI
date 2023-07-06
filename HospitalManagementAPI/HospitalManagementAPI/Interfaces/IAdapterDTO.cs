using HospitalManagementAPI.Models.DTOs;
using HospitalManagementAPI.Models;

namespace HospitalManagementAPI.Interfaces
{
    public interface IAdapterDTO
    {
        public User? DoctorIntoUser(DoctorDTO doctorDTO);
        public User? PatientIntoUser(PatientDTO patientDTO);
        public Task<UserDTO?> DoctorIntoUserDTO(DoctorDTO doctor);
        public Task<UserDTO?> PatientIntoUserDTO(PatientDTO patient);
        public UserDTO? UserIntoUserDTO(User user);
    }
}
