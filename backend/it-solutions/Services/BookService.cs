using AutoMapper;
using it_solutions.Data;
using it_solutions.Entities;
using it_solutions.Exceptions;
using it_solutions.Interfaces;
using it_solutions.Services.Abstract;
using Microsoft.EntityFrameworkCore;

namespace it_solutions.Services;

public sealed class BookService : BaseService, IBookService
{
    public BookService(BookInventoryDbContext context, IMapper mapper)
        : base(context, mapper)
    {
    }

    public async Task<BookDto> AddBookAsync(BookDto bookDto)
    {
        var bookEntity = _mapper.Map<Book>(bookDto);
        var createdBook = (await _context.Books.AddAsync(bookEntity)).Entity;
        await _context.SaveChangesAsync();

        return _mapper.Map<BookDto>(createdBook);
    }

    public async Task<BookDto> UpdateBookAsync(int bookId, BookDto bookDto)
    {
        var existingBook = await _context.Books.FindAsync(bookId);
        if (existingBook is null)
        {
            throw new EntityNotFoundException();
        }

        _mapper.Map(bookDto, existingBook);
        existingBook.Id = bookId;
        await _context.SaveChangesAsync();

        return _mapper.Map<BookDto>(existingBook)!;
    }

    public async Task DeleteBookAsync(int bookId)
    {
        var book = await _context.Books.FindAsync(bookId);
        if (book is null)
        {
            throw new EntityNotFoundException();
        }

        _context.Books.Remove(book);
        await _context.SaveChangesAsync();
    }

    public async Task<BookDto> GetBookAsync(int bookId)
    {
        var book = await _context.Books.FindAsync(bookId);
        if (book is null)
        {
            throw new EntityNotFoundException();
        }

        return _mapper.Map<BookDto>(book)!;
    }

    public async Task<List<BookDto>> GetAllBooksAsync()
    {
        var books = await _context.Books.ToListAsync();

        return _mapper.Map<List<BookDto>>(books)!;
    }

    public async Task<List<BooksByYearEntity>> GetBooksCountByPublicationYear()
    {
        return await _context.Books.GroupBy(b => b.PublicationDate.Year).OrderBy(g => g.Key).Select(g => new BooksByYearEntity { Year = g.Key, BooksCount = g.Count() }).ToListAsync();
    }
}
