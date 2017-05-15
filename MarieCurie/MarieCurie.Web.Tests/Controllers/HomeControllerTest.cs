using MarieCurie.Data;
using MarieCurie.Web.Controllers;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;

namespace MarieCurie.Web.Tests.Controllers
{
    [TestClass]
    public class HomeControllerTest
    {
        Mock<IHelperService> mockHelperService;
        List<Models.HelperService> helperServices;
        HomeController controller;

        [TestInitialize]
        public void Initialise()
        {
            helperServices = new List<Models.HelperService>
            {
                new Models.HelperService
                {
                    Title = "Title 1",
                    Description = "Description 1",
                    IsOpen = true,
                    OpenMessage = "Open message 1",
                    TelephoneNumber = "Telephone number 1"
                },
                new Models.HelperService
                {
                    Title = "Title 2",
                    Description = "Description 2",
                    IsOpen = true,
                    OpenMessage = "Open message 2",
                    TelephoneNumber = "Telephone number 2"
                },
                new Models.HelperService
                {
                    Title = "Title 3",
                    Description = "Description 3",
                    IsOpen = false,
                    OpenMessage = "Open message 3",
                    TelephoneNumber = "Telephone number 3"
                },
                 new Models.HelperService
                {
                    Title = "Title 4",
                    Description = "Description 4",
                    IsOpen = false,
                    OpenMessage = "Open tomorrow message 4",
                    TelephoneNumber = "Telephone number 4"
                },
            };

            mockHelperService = new Mock<IHelperService>();
            mockHelperService
              .Setup(hs => hs.GetServices())
              .Returns(helperServices);

        }

        [TestMethod]
        public void CorrectNumberOfHelperServicesReturned()
        {
            controller = new HomeController(mockHelperService.Object);

            var result = controller.Index() as ViewResult;
            var model = result.Model as IEnumerable<Models.HelperService>;
            Assert.IsNotNull(model);
            Assert.AreEqual(4, model.Count());
        }

        [TestMethod]
        public void IncorrectNumberOfHelperServicesReturned()
        {
            controller = new HomeController(mockHelperService.Object);

            var result = controller.Index() as ViewResult;
            var model = result.Model as IEnumerable<Models.HelperService>;
            Assert.IsNotNull(model);
            Assert.AreNotEqual(3, model.Count());
        }

        [TestMethod]
        public void NoServiceReturned()
        {
            mockHelperService
              .Setup(hs => hs.GetServices())
              .Returns(new List<Models.HelperService>());

            controller = new HomeController(mockHelperService.Object);

            var result = controller.Index() as ViewResult;
            var model = result.Model as IEnumerable<Models.HelperService>;
            Assert.IsNotNull(model);
            Assert.AreEqual(0, model.Count());
        }

        [TestMethod]
        public void CorrectHelperServiceReturned()
        {
            controller = new HomeController(mockHelperService.Object);

            var result = controller.Index() as ViewResult;
            var model = result.Model as IEnumerable<Models.HelperService>;
            var helperService = model.FirstOrDefault();
            Assert.IsNotNull(helperService);
            Assert.AreEqual("Title 1", helperService.Title);
        }

        [TestMethod]
        public void IncorrectHelperServiceReturned()
        {
            controller = new HomeController(mockHelperService.Object);

            var result = controller.Index() as ViewResult;
            var model = result.Model as IEnumerable<Models.HelperService>;
            var helperService = model.FirstOrDefault();
            Assert.IsNotNull(helperService);
            Assert.AreNotEqual("Title 2", helperService.Title);
        }

        [TestMethod]
        public void HelperServiceIsOpen()
        {
            controller = new HomeController(mockHelperService.Object);

            var result = controller.Index() as ViewResult;
            var model = result.Model as IEnumerable<Models.HelperService>;
            var helperService = model.Take(1).SingleOrDefault();
            Assert.IsNotNull(helperService);
            Assert.AreEqual(true, helperService.IsOpen);
        }

        [TestMethod]
        public void HelperServiceIsClosed()
        {
            controller = new HomeController(mockHelperService.Object);

            var result = controller.Index() as ViewResult;
            var model = result.Model as IEnumerable<Models.HelperService>;
            var helperService = model.Skip(2).Take(1).SingleOrDefault();
            Assert.IsNotNull(helperService);
            Assert.AreEqual(false, helperService.IsOpen);
        }

        [TestMethod]
        public void HelperServiceIsClosedOpensTomorrow()
        {

            controller = new HomeController(mockHelperService.Object);

            var result = controller.Index() as ViewResult;
            var model = result.Model as IEnumerable<Models.HelperService>;
            var helperService = model.Skip(3).Take(1).SingleOrDefault();
            Assert.IsNotNull(helperService);
            Assert.AreEqual("Open tomorrow message 4", helperService.OpenMessage);
        }

        [TestMethod]
        public void HelperServiceIsClosedOpensNotTomorrow()
        {
            controller = new HomeController(mockHelperService.Object);

            var result = controller.Index() as ViewResult;
            var model = result.Model as IEnumerable<Models.HelperService>;
            var helperService = model.Skip(2).Take(1).SingleOrDefault();
            Assert.IsNotNull(helperService);
            Assert.AreEqual("Open message 3", helperService.OpenMessage);
        }

    }
}
