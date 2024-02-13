using MTG.Entities.Database;

namespace MTG.Data.Operations.Interface;

public interface IClientData
{
    Task<Client> Add(Client client);
    Task<Client?> Delete(Guid id);
    Task<IEnumerable<Client>?> GetAll();
    Task<Client?> GetById(Guid id);
    Task<Client?> GetByUsername(string username);
    Task<Client?> Update(Client client);
    Task<bool> ValidateUser(string username, string password);
}
