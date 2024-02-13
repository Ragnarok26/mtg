namespace MTG.Entities.Database;

public class ClientArticle
{
    public virtual Guid ClientId { get; set; } = Guid.NewGuid();
    public virtual string ArticleCode { get; set; } = string.Empty;
    public virtual Client? Client { get; set; } = null!;
    public virtual Article? Article { get; set; } = null!;
    public virtual DateTime Date { get; set; } = DateTime.Now;
}
