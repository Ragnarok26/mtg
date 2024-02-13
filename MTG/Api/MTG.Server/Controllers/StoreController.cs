using Microsoft.AspNetCore.Mvc;
using MTG.Business.Logic.Interface;
using MTG.Entities.Database;
using System.Net;

namespace MTG.Server.Controllers;

[Route("api/[controller]")]
[ApiController]
public class StoreController(IStoreLogic storeLogic) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> Get()
    {
        try
        {
            return Ok(await storeLogic.GetAll());
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
            return Ok(await storeLogic.GetById(id));
        }
        catch (Exception ex)
        {
            return StatusCode((int)HttpStatusCode.InternalServerError, ex);
        }
    }

    [HttpPost]
    public async Task<IActionResult> Post([FromBody] Store store)
    {
        try
        {
            return Ok(await storeLogic.Add(store));
        }
        catch (Exception ex)
        {
            return StatusCode((int)HttpStatusCode.InternalServerError, ex);
        }
    }

    [HttpPut]
    public async Task<IActionResult> Put([FromBody] Store store)
    {
        try
        {
            return Ok(await storeLogic.Update(store));
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
            return Ok(await storeLogic.Delete(id));
        }
        catch (Exception ex)
        {
            return StatusCode((int)HttpStatusCode.InternalServerError, ex);
        }
    }
}
