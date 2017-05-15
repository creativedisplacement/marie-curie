using SimpleInjector;
using SimpleInjector.Integration.Web.Mvc;
using System.Web.Mvc;

namespace MarieCurie.Web.App_Start
{
    public class SimpleInjectorConfig
    {
        public static void Register()
        {
            var container = new Container();

            container.Register<Data.IHelperService, Data.HelperService>(Lifestyle.Transient);
            container.Register<Interview.Assets.IHelperServiceRepository, Interview.Assets.HelperServiceRepository>(Lifestyle.Transient);

            DependencyResolver.SetResolver(new SimpleInjectorDependencyResolver(container));
        }
    }
}