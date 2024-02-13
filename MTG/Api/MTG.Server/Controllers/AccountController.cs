using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MTG.Business.Logic.Interface;
using MTG.Entities.Database;

namespace MTG.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController(IClientLogic clientLogic) : ControllerBase
    {
        [AllowAnonymous]
        [HttpPost("Login")]
        public async Task<IActionResult> Post([FromBody] Client data)
        {
            try
            {
                return Ok(await clientLogic.Login(data));
            }
            catch
            {
                return StatusCode(401);
            }
        }
    }
}
