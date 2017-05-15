using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using MarieCurie.Interview.Assets;
using System.Collections.Generic;
using MarieCurie.Data;
using System.Linq;

namespace MarieCurie.Web.Tests.Services
{
    [TestClass]
    public class HelperServiceTest
    {
        Mock<IHelperServiceRepository> repository;
        List<Interview.Assets.Model.HelperService> helperService;
        HelperService service;

        [TestInitialize]
        public void Initialise()
        {
            helperService = new List<Interview.Assets.Model.HelperService>
            {
                new Interview.Assets.Model.HelperService
                {
                    Id = new Guid(),
                    Title = "Title 1",
                    Description = "Description 1",
                    MondayOpeningHours = new List<int>{0,23},
                    TuesdayOpeningHours = new List<int>{0,23},
                    WednesdayOpeningHours = new List<int>{0,23},
                    ThursdayOpeningHours = new List<int>{0,23},
                    FridayOpeningHours = new List<int>{0,23},
                    SaturdayOpeningHours = new List<int>{0,23},
                    SundayOpeningHours = new List<int>{0,23},
                },
                new Interview.Assets.Model.HelperService
                {
                    Id = new Guid(),
                    Title = "Title 2",
                    Description = "Description 2",
                    MondayOpeningHours = new List<int>{0,11},
                    TuesdayOpeningHours = new List<int>{0,11},
                    WednesdayOpeningHours = new List<int>{0,11},
                    ThursdayOpeningHours = new List<int>{0,11},
                    FridayOpeningHours = new List<int>{0,11},
                    SaturdayOpeningHours = new List<int>{0,11},
                    SundayOpeningHours = new List<int>{0,11},
                },
                 new Interview.Assets.Model.HelperService
                {
                    Id = new Guid(),
                    Title = "Title 3",
                    Description = "Description 3",
                    MondayOpeningHours = new List<int>{0,0},
                    TuesdayOpeningHours = new List<int>{0,0},
                    WednesdayOpeningHours = new List<int>{0,0},
                    ThursdayOpeningHours = new List<int>{0,0},
                    FridayOpeningHours = new List<int>{0,0},
                    SaturdayOpeningHours = new List<int>{0,0},
                    SundayOpeningHours = new List<int>{0,0},
                },
                  new Interview.Assets.Model.HelperService
                {
                    Id = new Guid(),
                    Title = "Title 4",
                    Description = "Description 4",
                    MondayOpeningHours = new List<int>{0,0},
                    TuesdayOpeningHours = new List<int>{0,0},
                    WednesdayOpeningHours = new List<int>{9,17},
                },
            };

            repository = new Mock<IHelperServiceRepository>();
            repository
              .Setup(hs => hs.Get())
              .Returns(helperService);

            service = new HelperService(repository.Object);
        }

        [TestMethod]
        public void CountCorrectReturnedServices()
        {
            var result = service.GetServices();
            Assert.IsNotNull(result);
            Assert.AreEqual(4, result.Count());
        }

        [TestMethod]
        public void CountIncorrectReturnedServices()
        {
            var result = service.GetServices();
            Assert.IsNotNull(result);
            Assert.AreNotEqual(0, result.Count());
        }

        [TestMethod]
        public void GetCorrectReturnedService()
        {
            var result = service.GetServices().FirstOrDefault();
            Assert.IsNotNull(result);
            Assert.AreEqual("Title 1", result.Title);
        }

        [TestMethod]
        public void GetIncorrectReturnedService()
        {
            var result = service.GetServices().FirstOrDefault();
            Assert.IsNotNull(result);
            Assert.AreNotEqual("Title 2", result.Title);
        }

        [TestMethod]
        public void GetOpenService()
        {
            var result = service.GetServices().FirstOrDefault();
            Assert.IsNotNull(result);
            Assert.AreEqual(true, result.IsOpen);
        }

        public void GetOpenServiceClosingTime()
        {
            var result = service.GetServices().FirstOrDefault();
            Assert.IsNotNull(result);
            Assert.IsTrue(result.OpenMessage.Contains("Open today until 11pm"));
        }

        public void GetOpenServiceClosingTimeAm()
        {
            var result = service.GetServices().FirstOrDefault();
            Assert.IsNotNull(result);
            Assert.IsTrue(result.OpenMessage.Contains("am"));
        }

        public void GetOpenServiceClosingTimePm()
        {
            var result = service.GetServices().FirstOrDefault();
            Assert.IsNotNull(result);
            Assert.IsTrue(result.OpenMessage.Contains("pm"));
        }

        [TestMethod]
        public void GetClosedService()
        {
            var result = service.GetServices().Skip(2).Take(1).SingleOrDefault();
            Assert.IsNotNull(result);
            Assert.AreEqual(false, result.IsOpen);
        }

        [TestMethod]
        public void GetClosedServiceAm()
        {
            throw new NotImplementedException();
        }

        [TestMethod]
        public void GetClosedServicePm()
        {
            throw new NotImplementedException();
        }

        [TestMethod]
        public void GetClosedServiceOpenTomorrow()
        {
            throw new NotImplementedException();
        }

        [TestMethod]
        public void GetClosedServiceOpenAfterTomorrow()
        {
            throw new NotImplementedException();
        }
    }


}
