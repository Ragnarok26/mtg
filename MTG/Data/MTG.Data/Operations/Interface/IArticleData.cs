using MTG.Entities.Database;

namespace MTG.Data.Operations.Interface;

public interface IArticleData
{
    Task<Article> Add(Article article);
    Task<Article?> Delete(string code);
    Task<IEnumerable<Article>?> GetAll();
    Task<Article?> GetById(string code);
    Task<Article?> Update(Article article);
}
