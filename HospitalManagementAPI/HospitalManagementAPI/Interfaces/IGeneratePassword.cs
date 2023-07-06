using HospitalManagementAPI.Models;
using System.Numerics;

namespace HospitalManagementAPI.Interfaces
{
    public interface IGeneratePassword
    {
        public string? DoctorPasword(Doctor doctor);
        public string? PatientPassword(Patient patient);
    }
}
