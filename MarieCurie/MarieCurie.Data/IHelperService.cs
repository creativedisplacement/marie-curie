using System.Collections.Generic;

namespace MarieCurie.Data
{
    public interface IHelperService
    {
        IEnumerable<Models.HelperService> GetServices();
    }
}
