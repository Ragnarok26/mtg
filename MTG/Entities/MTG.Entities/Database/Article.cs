namespace MTG.Entities.Database;

public class Article
{
    public virtual string Code { get; set; } = string.Empty;
    public virtual string Description {  get; set; } = string.Empty;
    public virtual decimal Price { get; set; }
    public virtual string Image { get; set; } = null!;
    public virtual int Stock { get; set; }
    public virtual ICollection<ArticleStore> ArticleStores { get; set; } = new List<ArticleStore>();
    public virtual ICollection<ClientArticle> ClientArticles { get; set; } = new List<ClientArticle>();
}
