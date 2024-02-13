using MTG.Entities.Database;
using MTG.Entities.Models;

namespace MTG.Business.Logic.Interface;

public interface IClientLogic
{
    Task<Client> Add(Client client);
    Task<Client?> Delete(string id);
    Task<IEnumerable<Client>?> GetAll();
    Task<Client?> GetById(string id);
    Task<TokenResult> Login(Client data);
    Task<Client?> Update(Client client);
}
