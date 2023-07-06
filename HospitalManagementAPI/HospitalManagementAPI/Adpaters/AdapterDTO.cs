﻿using HospitalManagementAPI.Interfaces;
using HospitalManagementAPI.Models.DTOs;
using HospitalManagementAPI.Models;
using System.Security.Cryptography;
using System.Text;

namespace HospitalManagementAPI.Adpaters
{
    public class AdapterDTO : IAdapterDTO
    {
        private readonly ITokenService _tokenService;
        private readonly IRepo<User, int> _userRepo;

        public AdapterDTO(ITokenService tokenService, IRepo<User, int> userRepo)
        {
            _tokenService = tokenService;
            _userRepo = userRepo;
        }

        public User? DoctorIntoUser(DoctorDTO doctorDTO)
        {
            if (doctorDTO.Users == null)
                doctorDTO.Users = new User();

            var hmac = new HMACSHA512();
            doctorDTO.Users.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(doctorDTO.Password ?? "1234"));
            doctorDTO.Users.PasswordKey = hmac.Key;
            doctorDTO.Users.Role = "Doctor";
            doctorDTO.Users.DoctorStatus = "Not Approve";
            return doctorDTO.Users;
        }

        public User? PatientIntoUser(PatientDTO patientDTO)
        {
            if (patientDTO.Users == null)
                patientDTO.Users = new User();

            var hmac = new HMACSHA512();
            patientDTO.Users.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(patientDTO.Password ?? "1234"));
            patientDTO.Users.PasswordKey = hmac.Key;
            patientDTO.Users.Role = "Patient";
            return patientDTO.Users;
        }

        public async Task<UserDTO?> DoctorIntoUserDTO(DoctorDTO doctor)
        {
            UserDTO user = new UserDTO();
            user.UserId = doctor.DoctorId;
            var myUser = await _userRepo.Get(user.UserId);
            if (myUser == null) return null;
            user.Role = myUser.Role;
            user.Email = myUser.Email;
            user.Password = doctor.Password;
            user.Token = _tokenService.GenerateToken(user);
            return user;
        }

        public async Task<UserDTO?> PatientIntoUserDTO(PatientDTO patient)
        {
            UserDTO user = new UserDTO();
            user.UserId = patient.PatientId;
            var myUser = await _userRepo.Get(user.UserId);
            if (myUser == null) return null;
            user.Role = myUser.Role;
            user.Email = myUser.Email;
            user.Password = patient.Password;
            user.Token = _tokenService.GenerateToken(user);
            return user;
        }

        public UserDTO? UserIntoUserDTO(User user)
        {
            UserDTO? userDTO = new UserDTO();
            userDTO.Email = user.Email;
            userDTO.UserId = user.UserId;
            userDTO.Role = user.Role;
            userDTO.Status = user.DoctorStatus;
            userDTO.Token = _tokenService.GenerateToken(userDTO);
            return userDTO;
        }
    }
}
