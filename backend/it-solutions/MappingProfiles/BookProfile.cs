using AutoMapper;
using it_solutions.Entities;

namespace Squirrel.Core.BLL.MappingProfiles;

public sealed class BookProfile : Profile
{
    public BookProfile()
    {
        CreateMap<Book, BookDto>()!.ReverseMap();
    }
}