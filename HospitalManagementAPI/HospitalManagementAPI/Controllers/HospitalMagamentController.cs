using HospitalManagementAPI.Interfaces;
using HospitalManagementAPI.Models;
using HospitalManagementAPI.Models.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace HospitalManagementAPI.Controllers
{
    [Route("api/[action]")]
    [ApiController]
    [EnableCors("ReactCors")]
    public class HospitalMagamentController:ControllerBase
    {
        private readonly IManageDoctor _doctorService;
        private readonly IManagePatient _patientService;
        private readonly IManageUser _userService;
        private readonly ILogger<HospitalMagamentController> _logger;

        public HospitalMagamentController(IManageDoctor doctorService,
                                    IManagePatient patientService,
                                    IManageUser userService,
                                    ILogger<HospitalMagamentController> logger)
        {
            _doctorService = doctorService;
            _patientService = patientService;
            _userService = userService;
            _logger = logger;

        }
        [HttpPost]
        [ProducesResponseType(typeof(UserDTO), StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<UserDTO?>> DoctorRegister(DoctorDTO doctorDTO)
        {
            try
            {
                var doctor = await _doctorService.DoctorRegister(doctorDTO);
                if (doctor != null)
                    return Created("Doctor Registered successfully", doctor);

            }
            catch (Exception ex)
            {

                _logger.LogError(ex.Message);

            }

            return BadRequest("unable to register");
        }
        [HttpPost]
        [ProducesResponseType(typeof(UserDTO), StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<UserDTO?>> PatientRegister(PatientDTO patientDTO)
        {
            try
            {
                var patient = await _patientService.PatientRegister(patientDTO);
                if (patient != null)
                    return Created("Patient Registered Successfully", patient);

            }
            catch (Exception ex)
            {

                _logger.LogError(ex.Message);

            }

            return BadRequest("unable to register");
        }
        [HttpPost]
        [ProducesResponseType(typeof(UserDTO), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<UserDTO?>> Login(UserDTO userDTO)
        {
            try
            {
                var user = await _userService.Login(userDTO);
                if (user != null)
                    return Ok(user);

            }
            catch (Exception ex)
            {

                _logger.LogError(ex.Message);
            }
            return BadRequest("login failed");
        }



        [ProducesResponseType(typeof(User), StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<UserDTO?>> ChangeStatus(UserDTO userDTO)
        {
            try
            {
                var user = await _userService.ChangeStatus(userDTO);
                if (user != null)
                    return Ok(user);
                return NotFound("unable to fetch doctor");
            }
            catch (Exception ex)
            {


                _logger.LogError(ex.Message);
            }
            return BadRequest("unable to change");
        }

        [Authorize]
        [HttpPut]
        [ProducesResponseType(typeof(User), StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<UserDTO?>> UpdatePassword(PasswordDTO passwordDTO)
        {
            try
            {
                var user = await _userService.UpdatePassword(passwordDTO);
                if (user != null)
                    return Ok(user);

            }
            catch (Exception ex)
            {

                _logger.LogError(ex.Message);
            }
            return BadRequest("unable to updatepassword");
        }

        [ProducesResponseType(typeof(UserDTO), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [Authorize(Roles = "Doctor")]
        [HttpPut]
        public async Task<ActionResult<UserDTO?>> UpdateDoctorDetails(DoctorDTO doctorDTO)
        {
            try
            {
                var doctor = await _doctorService.UpdateDetails(doctorDTO);
                if (doctor != null)
                    return Ok(doctor);

            }
            catch (Exception ex)
            { _logger.LogError(ex.Message); }
            return BadRequest("unable to update");
        }
        [ProducesResponseType(typeof(User), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [HttpPost]
        [Authorize]
        public async Task<ActionResult<User?>> GetUser(UserIDDTO userIds)
        {
            try
            {
                var user = await _userService.GetUser(userIds);
                if (user != null) return Ok(user);

            }
            catch (Exception ex)
            {

                _logger.LogError(ex.Message);
            }
            return BadRequest("not found");
        }
        [ProducesResponseType(typeof(UserDTO), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [Authorize(Roles = "Patient")]
        [HttpPut]
        public async Task<ActionResult<UserDTO?>> UpdatePatientDetails(PatientDTO patientDTO)
        {
            try
            {
                var patient = await _patientService.UpdatePatient(patientDTO);
                if (patient != null)
                    return Ok(patient);

            }
            catch (Exception ex)
            {

                _logger.LogError(ex.Message);
            }
            return BadRequest("unable to update");
        }




        [HttpGet]
        [Authorize]
        [ProducesResponseType(typeof(List<Doctor>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<List<Doctor>?>> GetAllDoctors()
        {
            try
            {
                var doctors = await _doctorService.GetAllDoctors();
                if (doctors != null)
                    return Ok(doctors);

            }
            catch (Exception ex) { _logger.LogError(ex.Message); }
            return BadRequest("unable to fetch");
        }
        [HttpGet]
        [Authorize]
        [ProducesResponseType(typeof(List<User>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<List<User>?>> GetAllUsers()
        {
            try
            {
                var users = await _userService.GetAllUsers();
                if (users != null)
                    return Ok(users);

            }
            catch (Exception ex)
            {

                _logger.LogError(ex.Message);
            }
            return BadRequest("no users");
        }
        [HttpPost]
        [Authorize(Roles = "Doctor")]
        [ProducesResponseType(typeof(Doctor), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<Doctor?>> GetDoctor(UserIDDTO userIds)
        {
            try
            {
                var doctor = await _doctorService.GetDoctor(userIds);
                if (doctor != null) return Ok(doctor);

            }
            catch (Exception ex) { _logger.LogError(ex.Message); }
            return BadRequest("unable to fetch");
        }

       



        [HttpGet]
        [ProducesResponseType(typeof(List<string>), StatusCodes.Status200OK)] 
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<List<string>?>> Specializations()
        {
            try
            {
                var specializations = await _doctorService.Specializations();
                if (specializations != null)
                    return Ok(specializations);

            }
            catch (Exception ex) { _logger.LogError(ex.Message); }
            return BadRequest("unable to fetch");
        }

        [HttpPost]
        [Authorize(Roles = "Patient")]
        [ProducesResponseType(typeof(Doctor), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<Patient?>> GetPatient(UserIDDTO userIds)
        {
            try
            {

                var patient = await _patientService.GetPatient(userIds);
                if (patient != null)
                    return Ok(patient);

            }
            catch (Exception ex) { _logger.LogError(ex.Message); }
            return BadRequest("no patient");
        }
    }
}
