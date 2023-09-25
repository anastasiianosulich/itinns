public sealed class BookDto
{
    public int Id { get; set; } 
    public string Title { get; set; } = null!;
    public string Description { get; set; } = null!;
    public DateTime PublicationDate { get; set; }
    public int PagesCount { get; set; }
}