using MTG.Entities.Database;

namespace MTG.Business.Logic.Interface;

public interface IStoreLogic
{
    Task<Store> Add(Store store);
    Task<Store?> Delete(string id);
    Task<IEnumerable<Store>?> GetAll();
    Task<Store?> GetById(string id);
    Task<Store?> Update(Store store);
}
