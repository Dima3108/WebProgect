using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplicationProgect.Controllers
{
    public class ChatController : Controller
    {
        [HttpGet]
        public int ReadMessage(string user,string message)
        {
            Console.WriteLine($"user:{user},comment:{message}");
            return 0;
        }
    }
}
