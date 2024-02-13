namespace MTG.Entities.Database;

public class Store
{
    public virtual Guid Id { get; set; } = Guid.NewGuid();
    public virtual string Branch { get; set; } = string.Empty;
    public virtual string Address { get; set; } = string.Empty;
    public virtual ICollection<ArticleStore> ArticleStores { get; set; } = new List<ArticleStore>();
}
