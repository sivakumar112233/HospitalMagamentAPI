using HospitalManagementAPI.Models.DTOs;
using HospitalManagementAPI.Models;
using System.Numerics;

namespace HospitalManagementAPI.Interfaces
{
    public interface IManageDoctor
    {
        public Task<UserDTO?> DoctorRegister(DoctorDTO doctorDTO);
        public Task<UserDTO?> UpdateDetails(DoctorDTO doctorDTO);
        public Task<List<Doctor>?> GetAllDoctors();
        public Task<Doctor?> GetDoctor(UserIDDTO userIds);
        public Task<List<Doctor>?> DoctorFilters(Status status);
        public Task<List<string>?> Specializations();
    }
}
