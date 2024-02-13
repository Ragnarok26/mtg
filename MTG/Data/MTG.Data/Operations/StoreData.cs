using Microsoft.EntityFrameworkCore;
using MTG.Data.Operations.Interface;
using MTG.Entities.Database;

namespace MTG.Data.Operations;

public class StoreData(ApplicationDbContext dbContext) : IStoreData
{
    public async Task<Store> Add(Store store)
    {
        await dbContext.Store.AddAsync(store);
        await dbContext.SaveChangesAsync();
        return store;
    }

    public async Task<Store?> Delete(Guid id)
    {
        var entity = await dbContext.Store.FirstOrDefaultAsync(i => i.Id == id);
        if (entity != null)
        {
            await Task.Run(() => {
                dbContext.Store.Remove(entity);
            });
            await dbContext.SaveChangesAsync();
        }
        return entity;
    }

    public async Task<IEnumerable<Store>?> GetAll()
    {
        return await dbContext.Store.ToListAsync();
    }

    public async Task<Store?> GetById(Guid id)
    {
        return await dbContext.Store.Include(i => i.ArticleStores)
                                    .ThenInclude(i => i.Article)
                                    .ThenInclude(i => i.ClientArticles)
                                    .ThenInclude(i => i.Client)
                                    .FirstOrDefaultAsync(i => i.Id == id);
    }

    public async Task<Store?> Update(Store store)
    {
        var entity = await GetById(store.Id);
        if (entity != null)
        {
            entity.Address = store.Address;
            entity.Branch = store.Branch;
            entity.ArticleStores.Clear();
            foreach (var item in store.ArticleStores)
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
