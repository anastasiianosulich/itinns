using it_solutions.Entities;
using it_solutions.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace it_solutions.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BooksController : ControllerBase
{
    private readonly IBookService _bookService;

    public BooksController(IBookService bookService)
    {
        _bookService = bookService;
    }

    [HttpPost]
    public async Task<ActionResult<BookDto>> AddProject([FromBody] BookDto bookDto)
    {
        return Ok(await _bookService.AddBookAsync(bookDto));
    }

    [HttpPut("{bookId}")]
    public async Task<ActionResult<BookDto>> UpdateProject(int bookId, BookDto bookDto)
    {
        return Ok(await _bookService.UpdateBookAsync(bookId, bookDto));
    }

    [HttpDelete("{bookId}")]
    public async Task<IActionResult> DeleteProject(int bookId)
    {
        await _bookService.DeleteBookAsync(bookId);
        return NoContent();
    }

    [HttpGet("{bookId}")]
    public async Task<ActionResult<BookDto>> GetProject(int bookId)
    {
        return Ok(await _bookService.GetBookAsync(bookId));
    }

    [HttpGet("all")]
    public async Task<ActionResult<List<BookDto>>> GetAllBooks()
    {
        return Ok(await _bookService.GetAllBooksAsync());
    }

    [HttpGet("byYear")]
    public async Task<ActionResult<List<BooksByYearEntity>>> GetBooksByYear()
    {
        return Ok(await _bookService.GetBooksCountByPublicationYear());
    }
}
