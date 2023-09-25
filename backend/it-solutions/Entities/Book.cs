using System.ComponentModel.DataAnnotations;

namespace it_solutions.Entities;

public class BaseEntity
{
    public int Id { get; set; }
}

public class Book : BaseEntity
{
    public string Title { get; set; } = null!;
    public string Description { get; set; } = null!;
    public DateTime PublicationDate { get; set; }

    [Range(1, int.MaxValue)]
    public int PagesCount { get; set; }
}
