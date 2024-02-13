using MTG.Entities.Database;

namespace MTG.Business.Logic.Interface;

public interface IArticleLogic
{
    Task<Article> Add(Article article);
    Task<Article?> Delete(string code);
    Task<IEnumerable<Article>?> GetAll();
    Task<Article?> GetById(string code);
    Task<Article?> Update(Article article);
}
