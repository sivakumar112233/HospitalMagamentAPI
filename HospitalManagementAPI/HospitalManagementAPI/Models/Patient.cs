using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace HospitalManagementAPI.Models
{
    public class Patient
    {
        public Patient()
        {
            Name = string.Empty;
            Gender = "Unknown";
        }
        [Key, DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int PatientId { get; set; }
        [ForeignKey("PatientId")]
        public User? Users { get; set; }

        public string? Name { get; set; }
        public DateTime DateOfBirth { get; set; }
        public int Age { get; set; }



        public string? Gender { get; set; }
        public string? Phone { get; set; }
        public string? Address { get; set; }

        public string? EContactName { get; set; }
        public string? EContactNumber { get; set; }

    }
}
