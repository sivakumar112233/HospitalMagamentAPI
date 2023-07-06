using System.ComponentModel.DataAnnotations;

namespace HospitalManagementAPI.Models.DTOs
{
    public class PasswordDTO
    {
        public int UserID { get; set; }
        [Required]
        [RegularExpression("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@#$%^&+=!]).{8,}$")]
        public string? NewPassword { get; set; }
    }
}
