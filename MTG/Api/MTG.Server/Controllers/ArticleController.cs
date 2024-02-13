using Microsoft.AspNetCore.Mvc;
using MTG.Business.Logic.Interface;
using MTG.Entities.Database;
using System.Net;

namespace MTG.Server.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ArticleController(IArticleLogic articleLogic) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> Get()
    {
        try
        {
            return Ok(await articleLogic.GetAll());
        }
        catch (Exception ex)
        {
            return StatusCode((int)HttpStatusCode.InternalServerError, ex);
        }
    }

    [HttpGet("{code}")]
    public async Task<IActionResult> GetById([FromRoute] string code)
    {
        try
        {
            return Ok(await articleLogic.GetById(code));
        }
        catch (Exception ex)
        {
            return StatusCode((int)HttpStatusCode.InternalServerError, ex);
        }
    }

    [HttpPost]
    public async Task<IActionResult> Post([FromBody] Article article)
    {
        try
        {
            return Ok(await articleLogic.Add(article));
        }
        catch (Exception ex)
        {
            return StatusCode((int)HttpStatusCode.InternalServerError, ex);
        }
    }

    [HttpPut]
    public async Task<IActionResult> Put([FromBody] Article article)
    {
        try
        {
            return Ok(await articleLogic.Update(article));
        }
        catch (Exception ex)
        {
            return StatusCode((int)HttpStatusCode.InternalServerError, ex);
        }
    }

    [HttpDelete("{code}")]
    public async Task<IActionResult> Delete([FromRoute] string code)
    {
        try
        {
            return Ok(await articleLogic.Delete(code));
        }
        catch (Exception ex)
        {
            return StatusCode((int)HttpStatusCode.InternalServerError, ex);
        }
    }
}
