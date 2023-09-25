using System.Net;
using it_solutions.Enums;

namespace it_solutions.Exceptions.Abstract;

public abstract class RequestException : Exception
{
    public ErrorType ErrorType { get; }
    public HttpStatusCode StatusCode { get; }

    public RequestException(string message, ErrorType errorType, HttpStatusCode statusCode) : base(message)
    {
        ErrorType = errorType;
        StatusCode = statusCode;
    }
}