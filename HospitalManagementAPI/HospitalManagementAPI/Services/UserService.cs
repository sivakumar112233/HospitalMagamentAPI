﻿using HospitalManagementAPI.Interfaces;
using HospitalManagementAPI.Models.DTOs;
using HospitalManagementAPI.Models;
using System.Security.Cryptography;
using System.Text;

namespace HospitalManagementAPI.Services
{
    public class UserService : IManageUser
    {
        private readonly IRepo<User, int> _userRepo;
        private readonly IAdapterDTO _adapter;

        public UserService(IRepo<User, int> userRepo,
                           IAdapterDTO adapter)
        {
            _userRepo = userRepo;
            _adapter = adapter;
        }
        public async Task<UserDTO?> Login(UserDTO? userDTO)
        {
            userDTO = await GetIdByEmail(userDTO);
            if (userDTO == null) return null;
            var userData = await _userRepo.Get(userDTO.UserId);
            if (userData != null)
            {
                var hmac = new HMACSHA512(userData.PasswordKey);
                var userPass = hmac.ComputeHash(Encoding.UTF8.GetBytes(userDTO.Password));
                for (int i = 0; i < userPass.Length; i++)
                {
                    if (userPass[i] != userData.PasswordHash[i])
                        return null;
                }
                var user = _adapter.UserIntoUserDTO(userData);
                if (user != null)
                    return user;
            }
            return null;
        }
        private async Task<UserDTO?> GetIdByEmail(UserDTO? userDTO)
        {
            var users = await _userRepo.GetAll();
            if (users != null)
            {
                var user = users.SingleOrDefault(u => u.Email == userDTO.Email);
                if (user == null) return null;
                userDTO.UserId = user.UserId;
                return userDTO;
            }
            return null;
        }

        public async Task<UserDTO?> ChangeStatus(UserDTO userDTO)
        {
            var user = await _userRepo.Get(userDTO.UserId);
            if (user != null)
            {

                user.DoctorStatus = userDTO.Status;
                var myUser = await _userRepo.Update(user);
                UserDTO? result = _adapter.UserIntoUserDTO(myUser);
                return result;
            }
            return null;
        }

        public async Task<User?> UpdatePassword(PasswordDTO passwordDTO)
        {
            var user = await _userRepo.Get(passwordDTO.UserID);
            if (user != null)
            {
                var hmac = new HMACSHA512();
                user.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(passwordDTO.NewPassword));
                user.PasswordKey = hmac.Key;
                var result = await _userRepo.Update(user);
                if (result != null)
                {
                    return user;
                }
            }
            return null;
        }

        public async Task<User?> GetUser(UserIDDTO userIds)
        {
            var user = await _userRepo.Get(userIds.UserID);
            if (user != null)
                return user;
            return null;
        }

        public async Task<List<User>?> GetAllUsers()
        {
            var users = await _userRepo.GetAll();
            if (users != null)
                return users.ToList();
            return null;
        }
    }
}
