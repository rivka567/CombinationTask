using Combination.BLL.Interfaces;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class CombinationController : ControllerBase
{
    private readonly ICombinationBL _combinationBL;
    private readonly ILogger<CombinationController> _logger;

    public CombinationController(ICombinationBL combinationBL, ILogger<CombinationController> logger)
    {
        _combinationBL = combinationBL;
        _logger = logger;
    }

    [HttpGet("Start")]
    public IActionResult Start([FromQuery] int n)
    {
        try
        {
            var totalCombinations = _combinationBL.CalcTotalCombinations(n);
            _logger.LogInformation("Total combinations calculated: {totalCombinations}", totalCombinations);
            return Ok(totalCombinations);
        }
        catch (ArgumentException ex)
        {
            _logger.LogWarning(ex, "Invalid input in {service}: n= {n}", n, nameof(Start));
            return StatusCode(400,ex.Message);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An unexpected error occurred in Start.");
            return StatusCode(500, ex.Message);
        }
    }

    [HttpGet("GetNext")]
    public IActionResult GetNext([FromQuery] int index)
    {
        try
        {
            var combination = _combinationBL.GetNextCombination(index);
            _logger.LogInformation("Combination generated for index {index}: {combination}", index, combination);
            return Ok(combination);
        }
        catch (InvalidOperationException ex)
        {
            _logger.LogWarning(ex, "Invalid operation in {service}: index = {index}", index, nameof(GetNext));
            return StatusCode(400,ex.Message);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An unexpected error occurred in {service}.", nameof(GetNext));
            return StatusCode(500, ex.Message);
        }
    }

    [HttpGet("GetAll")]
    public IActionResult GetAll([FromQuery] int pageIndex, [FromQuery] int pageSize)
    {
        try
        {
            var combinations = _combinationBL.GetCombinationsByPage(pageIndex, pageSize);
            _logger.LogInformation("Combinations generated for pageIndex {pageIndex}, pageSize {pageSize}", pageIndex, pageSize);
            return Ok(combinations);
        }
        catch (InvalidOperationException ex)
        {
            _logger.LogWarning(ex, "Invalid operation in {service}: pageIndex = {pageIndex}, pageSize = {pageSize}", pageIndex, pageSize, nameof(GetAll));
            return BadRequest(ex.Message);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An unexpected error occurred in GetAll.");
            return StatusCode(500, ex.Message);
        }
    }
}
