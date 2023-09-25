using it_solutions.Exceptions.Abstract;
using it_solutions.Enums;
using System.Net;

namespace it_solutions.Exceptions;

public sealed class EntityNotFoundException : RequestException
{
    public EntityNotFoundException() : base("Entity not found.", ErrorType.EntityNotFound, HttpStatusCode.BadRequest)
    {
    }
}