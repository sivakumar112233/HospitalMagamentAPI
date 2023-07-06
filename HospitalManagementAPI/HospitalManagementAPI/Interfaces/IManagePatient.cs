using HospitalManagementAPI.Models.DTOs;
using HospitalManagementAPI.Models;

namespace HospitalManagementAPI.Interfaces
{
    public interface IManagePatient
    {
        public Task<UserDTO?> PatientRegister(PatientDTO patientDTO);
        public Task<Patient?> GetPatient(UserIDDTO userId);
        public Task<UserDTO?> UpdatePatient(PatientDTO patientDTO);
    }
}
