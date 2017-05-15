using MarieCurie.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MarieCurie.Web.Controllers
{
    public class HomeController : Controller
    {
        private readonly IHelperService helperService;

        public HomeController(IHelperService helperService)
        {
            this.helperService = helperService;
        }
        public ActionResult Index()
        {
            var helperServices = helperService.GetServices();
            return View(helperServices);
        }
    }
}