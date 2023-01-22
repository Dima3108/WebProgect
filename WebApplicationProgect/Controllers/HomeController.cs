using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using WebApplicationProgect.Models;
using WebApplicationProgect.Data;
namespace WebApplicationProgect.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            ViewData["position"] =(int) -1;
            return View();
        }
        [HttpGet]
        public IActionResult SetPage(int id)
        {
            if (id < 0 || id >= PageNames.PageName.Length)
            {
                return Index();
            }
            ViewData["position"] =(int) id;
            //return View("Контакты");
            return View(PageNames.PageName[id]);
        }
        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
