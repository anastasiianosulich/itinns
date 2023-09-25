using it_solutions.Data.EntityConfigurations;
using Microsoft.EntityFrameworkCore;

namespace it_solutions.Extensions;

public static class ModelBuilderExtensions
{
    public static void Configure(this ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(BookConfiguration).Assembly);
    }
}