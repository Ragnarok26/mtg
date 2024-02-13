using MTG.Business.Logic.Interface;
using MTG.Data.Operations.Interface;
using MTG.Entities.Database;

namespace MTG.Business.Logic;

public class StoreLogic(IStoreData storeData) : IStoreLogic
{
    public async Task<Store> Add(Store store)
    {
        return await storeData.Add(store);
    }

    public async Task<Store?> Delete(string id)
    {
        return await storeData.Delete(Guid.Parse(id));
    }

    public async Task<IEnumerable<Store>?> GetAll()
    {
        return await storeData.GetAll();
    }

    public async Task<Store?> GetById(string id)
    {
        return await storeData.GetById(Guid.Parse(id));
    }

    public async Task<Store?> Update(Store store)
    {
        return await storeData.Update(store);
    }
}
