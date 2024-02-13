namespace MTG.Entities.Database;

public class ArticleStore
{
    public virtual string ArticleCode { get; set; } = string.Empty;
    public virtual Guid StoreId { get; set; } = Guid.NewGuid();
    public virtual Article? Article { get; set; } = null!;
    public virtual Store? Store { get; set; } = null!;
    public virtual DateTime Date { get; set; } = DateTime.Now;
}
