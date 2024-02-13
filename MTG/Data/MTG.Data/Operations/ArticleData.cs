using Microsoft.EntityFrameworkCore;
using MTG.Data.Operations.Interface;
using MTG.Entities.Database;

namespace MTG.Data.Operations;

public class ArticleData(ApplicationDbContext dbContext) : IArticleData
{
    public async Task<Article> Add(Article article)
    {
        await dbContext.Article.AddAsync(article);
        await dbContext.SaveChangesAsync();
        return article;
    }

    public async Task<Article?> Delete(string code)
    {
        var entity = await dbContext.Article.FirstOrDefaultAsync(i => i.Code == code);
        if (entity != null)
        {
            await Task.Run(() => {
                dbContext.Article.Remove(entity);
            });
            await dbContext.SaveChangesAsync();
        }
        return entity;
    }

    public async Task<IEnumerable<Article>?> GetAll()
    {
        return await dbContext.Article.ToListAsync();
    }

    public async Task<Article?> GetById(string code)
    {
        return await dbContext.Article.Include(i => i.ClientArticles)
                                      .ThenInclude(i => i.Client)
                                      .Include(i => i.ArticleStores)
                                      .ThenInclude(i => i.Store)
                                      .FirstOrDefaultAsync(i => i.Code == code);
    }

    public async Task<Article?> Update(Article article)
    {
        var entity = await GetById(article.Code);
        if (entity != null)
        {
            entity.Description = article.Description;
            entity.Image = article.Image;
            entity.Price = article.Price;
            entity.Stock = article.Stock;
            entity.ClientArticles.Clear();
            foreach (var item in article.ClientArticles)
            {
                entity.ClientArticles.Add(item);
            }
            foreach (var item in article.ArticleStores)
            {
                entity.ArticleStores.Add(item);
            }
            await Task.Run(() =>
            {
                dbContext.Entry(entity).State = EntityState.Modified;
            });
            await dbContext.SaveChangesAsync();
        }
        return entity;
    }
}
