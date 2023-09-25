using it_solutions.Extensions;
using it_solutions.Middleware;
using Squirrel.Core.BLL.Extensions;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddBookInventoryContext(builder.Configuration);
builder.Services.AddEndpointsApiExplorer();
builder.Services.RegisterCustomServices();

builder.Services.AddAutoMapper();
builder.Services.AddSwaggerGen();

builder.Services.AddCors();
builder.Services.AddRouting(options => options.LowercaseUrls = true);

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}

app.UseSwagger();
app.UseSwaggerUI();

app.UseMiddleware<GenericExceptionHandler>();

app.UseBookInventoryContext();

app.UseCors(opt => opt
    .AllowAnyHeader()
    .AllowAnyMethod()
    .AllowAnyOrigin());

app.UseRouting();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
