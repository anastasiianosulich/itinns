using it_solutions.Data;
using Microsoft.EntityFrameworkCore;

namespace it_solutions.Extensions;

public static class ApplicationBuilderExtensions
{
    public static void UseBookInventoryContext(this IApplicationBuilder app)
    {
        using var scope = app.ApplicationServices.GetService<IServiceScopeFactory>()?.CreateScope();
        using var context = scope?.ServiceProvider.GetRequiredService<BookInventoryDbContext>();
        context?.Database.Migrate();
    }
}
