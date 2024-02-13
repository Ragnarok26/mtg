using Microsoft.AspNetCore.Mvc;
using MTG.Business.Logic.Interface;
using MTG.Entities.Database;
using System.Net;

namespace MTG.Server.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ClientController(IClientLogic clientLogic) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> Get()
    {
        try
        {
            return Ok(await clientLogic.GetAll());
        }
        catch (Exception ex)
        {
            return StatusCode((int)HttpStatusCode.InternalServerError, ex);
        }
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById([FromRoute] string id)
    {
        try
        {
            return Ok(await clientLogic.GetById(id));
        }
        catch (Exception ex)
        {
            return StatusCode((int)HttpStatusCode.InternalServerError, ex);
        }
    }

    [HttpPost]
    public async Task<IActionResult> Post([FromBody] Client client)
    {
        try
        {
            return Ok(await clientLogic.Add(client));
        }
        catch (Exception ex)
        {
            return StatusCode((int)HttpStatusCode.InternalServerError, ex);
        }
    }

    [HttpPut]
    public async Task<IActionResult> Put([FromBody] Client client)
    {
        try
        {
            return Ok(await clientLogic.Update(client));
        }
        catch (Exception ex)
        {
            return StatusCode((int)HttpStatusCode.InternalServerError, ex);
        }
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete([FromRoute] string id)
    {
        try
        {
            return Ok(await clientLogic.Delete(id));
        }
        catch (Exception ex)
        {
            return StatusCode((int)HttpStatusCode.InternalServerError, ex);
        }
    }
}
