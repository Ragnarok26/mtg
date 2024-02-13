namespace MTG.Entities.Database;

public class Client
{
    public virtual Guid Id { get; set; } = Guid.NewGuid();
    public virtual string Name { get; set; } = string.Empty;
    public virtual string LastName { get; set; } = string.Empty;
    public virtual string Address { get; set; } = string.Empty;
    public virtual string Username { get; set; } = string.Empty;
    public virtual string Password { get; set; } = string.Empty;
    public virtual ICollection<ClientArticle> ClientArticles { get; set; } = new List<ClientArticle>();
}
