using HospitalManagementAPI.Models.DTOs;

namespace HospitalManagementAPI.Interfaces
{
    public interface ITokenService
    {
        public string GenerateToken(UserDTO user);
    }
}
