using HospitalManagementAPI.Models;
using HospitalManagementAPI.Interfaces;

namespace HospitalManagementAPI.Services
{
    public class PasswordService : IGeneratePassword
    {
        public string? DoctorPasword(Doctor doctor)
        {
            string? password;
            password = doctor.Name.Substring(0, 4);
            password += doctor.DateOfBirth.Day;
            password += doctor.DateOfBirth.Month;
            return password;
        }

        public string? PatientPassword(Patient patient)
        {
            string? password;
            password = patient.Name.Substring(0, 4);
            password += patient.DateOfBirth.Day;
            password += patient.DateOfBirth.Month;
            return password;
        }
    }
}
