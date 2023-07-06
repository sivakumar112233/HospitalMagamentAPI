using HospitalManagementAPI.Models.DTOs;
using HospitalManagementAPI.Models;

namespace HospitalManagementAPI.Interfaces
{
    public interface IManageUser
    {
        public Task<UserDTO?> Login(UserDTO? userDTO);
        public Task<UserDTO?> ChangeStatus(UserDTO userDTO);
        public Task<User?> UpdatePassword(PasswordDTO passwordDTO);
        public Task<User?> GetUser(UserIDDTO userIds);
        public Task<List<User>?> GetAllUsers();
    }
}
