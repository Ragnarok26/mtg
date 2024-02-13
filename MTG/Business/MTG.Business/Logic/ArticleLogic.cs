using MTG.Business.Logic.Interface;
using MTG.Data.Operations.Interface;
using MTG.Entities.Database;

namespace MTG.Business.Logic;

public class ArticleLogic(IArticleData articleData) : IArticleLogic
{
    public async Task<Article> Add(Article article)
    {
        return await articleData.Add(article);
    }

    public async Task<Article?> Delete(string code)
    {
        return await articleData.Delete(code);
    }

    public async Task<IEnumerable<Article>?> GetAll()
    {
        return await articleData.GetAll();
    }

    public async Task<Article?> GetById(string code)
    {
        return await articleData.GetById(code);
    }

    public async Task<Article?> Update(Article article)
    {
        return await articleData.Update(article);
    }
}
