using Microsoft.AspNetCore.Mvc;
using TaskManagerApi.Models;
using TaskManagerApi.Services;

namespace TaskManagerApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TasksController : ControllerBase
{
    private readonly TaskService _service;

    public TasksController(TaskService service)
    {
        _service = service;
    }

    [HttpGet]
    public IActionResult GetAll() => Ok(_service.GetAll());

    [HttpPost]
    public IActionResult Add([FromBody] TaskItem task)
    {
        if (string.IsNullOrWhiteSpace(task.Description))
            return BadRequest("Description required");
        return Ok(_service.Add(task));
    }

    [HttpPut("{id}/toggle")]
    public IActionResult Toggle(int id)
    {
        if (!_service.Toggle(id)) return NotFound();
        return Ok();
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        if (!_service.Delete(id)) return NotFound();
        return Ok();
    }
}
