using System.ComponentModel.DataAnnotations;

namespace HospitalManagementAPI.Models
{
    public class User
    {
        [Key]
        public int UserId { get; set; }

        public string? Email { get; set; }

        public string? Role { get; set; }
        public string? DoctorStatus { get; set; }
        public byte[]? PasswordHash { get; set; }
        public byte[]? PasswordKey { get; set; }
    }
}
