using it_solutions.Entities;

namespace it_solutions.Interfaces;

public interface IBookService
{
    Task<BookDto> AddBookAsync(BookDto projectDto);
    Task<BookDto> UpdateBookAsync(int projectId, BookDto projectDto);
    Task DeleteBookAsync(int projectId);
    Task<BookDto> GetBookAsync(int projectId);
    Task<List<BookDto>> GetAllBooksAsync();
    Task<List<BooksByYearEntity>> GetBooksCountByPublicationYear();
}