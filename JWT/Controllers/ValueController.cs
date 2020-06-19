using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using JWT.DataAccess;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace JWT.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [EnableCors("CorsPolicy")]
    public class ValueController : ControllerBase
    {
        private readonly DataAccessValues Data = new DataAccessValues();

        [Authorize]
        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                var result = Data.GetValues().Select(i => i.Value).ToList();

                if (result.Count == 0)
                {
                    return BadRequest();
                }
                else
                {
                    return Ok(result);
                }
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }
    }
}