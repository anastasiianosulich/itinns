using it_solutions.Entities;
using it_solutions.Extensions;
using Microsoft.EntityFrameworkCore;

namespace it_solutions.Data;

public class BookInventoryDbContext : DbContext
{
    public BookInventoryDbContext(DbContextOptions options) : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Configure();
    }

    public DbSet<Book> Books { get; set; }
}
