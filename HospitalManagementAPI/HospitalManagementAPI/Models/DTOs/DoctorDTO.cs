using System.Numerics;

namespace HospitalManagementAPI.Models.DTOs
{
    public class DoctorDTO : Doctor
    {
        public string? Password { get; set; }
    }
}
