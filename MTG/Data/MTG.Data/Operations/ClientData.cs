using Microsoft.EntityFrameworkCore;
using MTG.Data.Operations.Interface;
using MTG.Entities.Database;

namespace MTG.Data.Operations;

public class ClientData(ApplicationDbContext dbContext) : IClientData
{
    public async Task<Client> Add(Client client)
    {
        await dbContext.Client.AddAsync(client);
        await dbContext.SaveChangesAsync();
        return client;
    }

    public async Task<Client?> Delete(Guid id)
    {
        var entity = await dbContext.Client.FirstOrDefaultAsync(i => i.Id == id);
        if (entity != null)
        {
            await Task.Run(() => {
                dbContext.Client.Remove(entity);
            });
            await dbContext.SaveChangesAsync();
        }
        return entity;
    }

    public async Task<IEnumerable<Client>?> GetAll()
    {
        return await dbContext.Client.ToListAsync();
    }

    public async Task<Client?> GetById(Guid id)
    {
        return await dbContext.Client.Include(i => i.ClientArticles)
                                     .ThenInclude(i => i.Article)
                                     .ThenInclude(i => i.ArticleStores)
                                     .ThenInclude(i => i.Store)
                                     .FirstOrDefaultAsync(i => i.Id == id);
    }

    public async Task<Client?> GetByUsername(string username)
    {
        return await dbContext.Client.Include(i => i.ClientArticles)
                                     .ThenInclude(i => i.Article)
                                     .ThenInclude(i => i.ArticleStores)
                                     .ThenInclude(i => i.Store)
                                     .FirstOrDefaultAsync(u => u.Username == username!);
    }

    public async Task<Client?> Update(Client client)
    {
        var entity = await GetById(client.Id);
        if (entity != null)
        {
            entity.Address = client.Address;
            entity.Name = client.Name;
            entity.LastName = client.LastName;
            entity.ClientArticles.Clear();
            foreach (var item in client.ClientArticles)
            {
                entity.ClientArticles.Add(item);
            }
            await Task.Run(() =>
            {
                dbContext.Entry(entity).State = EntityState.Modified;
            });
            await dbContext.SaveChangesAsync();
        }
        return entity;
    }

    public async Task<bool> ValidateUser(string username, string password)
    {
        return await dbContext.Client.AnyAsync(u => u.Username == username && u.Password == password);
    }
}
