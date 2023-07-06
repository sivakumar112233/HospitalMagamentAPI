using HospitalManagementAPI.Interfaces;
using HospitalManagementAPI.Models.DTOs;
using HospitalManagementAPI.Models;

namespace HospitalManagementAPI.Services
{
    public class PatientService : IManagePatient
    {
        private readonly IRepo<Patient, int> _patientRepo;
        private readonly IGeneratePassword _patientPassword;
        private readonly IAdapterDTO _adapterDTO;

        public PatientService(IRepo<Patient, int> patientRepo,
                             IGeneratePassword patientPassword,
                             IAdapterDTO adapterDTO)
        {
            _patientRepo = patientRepo;
            _patientPassword = patientPassword;
            _adapterDTO = adapterDTO;
        }
        public async Task<UserDTO?> PatientRegister(PatientDTO patientDTO)
        {
            var tempPassword = patientDTO.Password;
            if (!IsStrongPassword(tempPassword))
            {
                patientDTO.Password = _patientPassword.PatientPassword(patientDTO);
            }
            patientDTO.Users = _adapterDTO.PatientIntoUser(patientDTO);
            var doctor = await _patientRepo.Add(patientDTO);
            if (doctor == null) return null;
            var userDTO = await _adapterDTO.PatientIntoUserDTO(patientDTO);
            if (userDTO != null) return userDTO;
            return null;
        }
        private bool IsStrongPassword(string? tempPassword)
        {
            if (tempPassword.Length >= 6 &&
                tempPassword.Any(char.IsUpper) &&
                tempPassword.Any(char.IsLower) &&
                tempPassword.Any(char.IsDigit) &&
                tempPassword.Any(IsSpecialCharacter))
                return true;
            return false;
        }
        private bool IsSpecialCharacter(char c)
        {
            // Define the set of special characters
            var specialCharacters = "!@#$%^&*()-_=+[]{}\\|;:'\",.<>/?";
            // Check if the character is in the set of special characters
            return specialCharacters.Contains(c);
        }

        public async Task<Patient?> GetPatient(UserIDDTO userId)
        {
            var patient = await _patientRepo.Get(userId.UserID);
            if (patient != null)
                return patient;
            return null;
        }

        public async Task<UserDTO?> UpdatePatient(PatientDTO patientDTO)
        {
            var patient = await _patientRepo.Get(patientDTO.PatientId);
            if (patient != null)
            {
                patient.Name = patientDTO.Name;
                patient.DateOfBirth = patientDTO.DateOfBirth;
                patient.Address = patientDTO.Address;
                patient.Phone = patientDTO.Phone;
                patient.EContactName = patientDTO.EContactName;
                patient.EContactName = patientDTO.EContactName;
                var myPatient = await _patientRepo.Update(patient);
                if (myPatient != null)
                {
                    var userDTO = await _adapterDTO.PatientIntoUserDTO(patientDTO);
                    if (userDTO != null) return userDTO;

                }
            }
            return null;
        }
    }
}
