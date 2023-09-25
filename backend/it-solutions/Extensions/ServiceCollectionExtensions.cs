using it_solutions.Data;
using it_solutions.Interfaces;
using it_solutions.Services;
using Microsoft.EntityFrameworkCore;
using System.Reflection;
using System.Text.Json.Serialization;

namespace Squirrel.Core.BLL.Extensions;

public static class ServiceCollectionExtensions
{
    public static void AddAutoMapper(this IServiceCollection services)
    {
        services.AddAutoMapper(Assembly.GetExecutingAssembly());
    }

    public static void RegisterCustomServices(this IServiceCollection services)
    {
        services.AddControllers()
                .AddJsonOptions(options => options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter()));

        services.AddScoped<IBookService, BookService>();
    }

    public static void AddBookInventoryContext(this IServiceCollection services, IConfiguration configuration)
    {
        var connectionsString = configuration.GetConnectionString("BookInventoryConnectionString");

        services.AddDbContext<BookInventoryDbContext>(options => options.UseSqlServer(connectionsString));
    }
}