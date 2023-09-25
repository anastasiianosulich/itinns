using AutoMapper;
using it_solutions.Data;

namespace it_solutions.Services.Abstract;

public abstract class BaseService
{
    private protected readonly BookInventoryDbContext _context;
    private protected readonly IMapper _mapper;

    public BaseService(BookInventoryDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }
}