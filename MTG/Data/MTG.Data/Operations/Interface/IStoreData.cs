using MTG.Entities.Database;

namespace MTG.Data.Operations.Interface;

public interface IStoreData
{
    Task<Store> Add(Store store);
    Task<Store?> Delete(Guid id);
    Task<IEnumerable<Store>?> GetAll();
    Task<Store?> GetById(Guid id);
    Task<Store?> Update(Store store);
}
