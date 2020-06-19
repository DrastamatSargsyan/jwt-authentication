using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using JWT.DataAccess;
using JWT.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace JWT.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [EnableCors("CorsPolicy")]
    public class LoginController : ControllerBase
    {
        private IConfiguration _config;
        private readonly DataAccessUsers Data = new DataAccessUsers();

        public LoginController(IConfiguration config)
        {
            _config = config;
        }

        [HttpPost]
        public IActionResult Login(UserModel loginUser)
        {
            try
            {
                IActionResult response = Unauthorized();

                var user = AuthenticateUser(loginUser);

                if (user != null)
                {
                    var tokenStr = GenerateJSONWebToken(user);

                    response = Ok(new { token = tokenStr });
                }

                return response;
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        private UserModel AuthenticateUser(UserModel login)
        {
            try
            {
                var result = Data.Login(login.Username).FirstOrDefault();

                if (result != null && login.Password == result.Password)
                {
                    return result;
                }
                else
                {
                    return null;
                }
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        private string GenerateJSONWebToken(UserModel userinfo)
        {
            try
            {
                var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
                var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

                var claims = new[]
                {
                    new Claim(JwtRegisteredClaimNames.Sub, userinfo.Username),
                    new Claim(JwtRegisteredClaimNames.Email, userinfo.Email),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
                };

                var token = new JwtSecurityToken(
                    issuer: _config["Jwt:Issuer"],
                    audience: _config["Jwt;Issuer"],
                    claims,
                    expires: DateTime.Now.AddMinutes(20),
                    signingCredentials: credentials);

                var encodetoken = new JwtSecurityTokenHandler().WriteToken(token);

                return encodetoken;
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }
    }
}
