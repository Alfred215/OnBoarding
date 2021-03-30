using es.efor.OnBoarding.Business.DTO.AuthDTOs;
using es.efor.OnBoarding.Business.DTO.UsersDTOs;
using es.efor.OnBoarding.Business.Services.UserServices;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace es.efor.OnBoarding.MainGateway.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IUserService _UserService;

        public AuthController(
            IConfiguration configuration,
            IUserService UserService
            )
        {
            _configuration = configuration;
            _UserService = UserService;
        }

        [HttpPost("login")]
        [ProducesResponseType(typeof(LoginResponseDTO), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<IActionResult> Login([FromBody] LoginModelDTO model)
        {
            UserDTO user = await this._UserService.Get(model);
            if (user != null)
            {
                JwtSecurityToken token = GenerateToken(user);

                return Ok(new LoginResponseDTO(new JwtSecurityTokenHandler().WriteToken(token), token.ValidTo));
            }
            return Unauthorized();
        }

        [HttpPost("register")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> Register([FromBody] RegisterModelDTO user)
        {
            UserDTO userExists = await _UserService.Get(user.User);
            if (userExists != null)
            {
                ModelState.AddModelError("User", "API.ERROR.USER.USERNAME.UNAVAILABLE");
                return BadRequest(ModelState);
            }

            bool result = await _UserService.Register(user);
            if (!result)
                return StatusCode(StatusCodes.Status500InternalServerError, "User creation failed! Please check user details and try again.");

            return Ok();
        }

        [HttpPost("@me")]
        [ProducesResponseType(typeof(UserDTO), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [Authorize]
        public async Task<IActionResult> CurrentUser()
        {
            if (int.TryParse(User.FindFirstValue(ClaimTypes.NameIdentifier), out int UserId))
            {
                UserDTO user = await this._UserService.Get(UserId);
                if (user != null)
                {
                    return Ok(user);
                }
            }

            return Unauthorized();
        }

        #region Propiedades privadas
        private JwtSecurityToken GenerateToken(UserDTO user)
        {
            List<Claim> authClaims = new List<Claim>
                {
                    new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                    new Claim(ClaimTypes.Name, user.Username),
                    new Claim(ClaimTypes.Role, ((int)user.RoleId).ToString())
                };

            SymmetricSecurityKey authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));

            JwtSecurityToken token = new JwtSecurityToken(
                issuer: _configuration["JWT:ValidIssuer"],
                expires: DateTime.Now.AddHours(3),
                claims: authClaims,
                signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
                );

            return token;
        }
        #endregion
    }
}
