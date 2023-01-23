using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplicationProgect
{
    public class Program
    {
        public static void Main(string[] args)
        {
           var builder= CreateHostBuilder(args);
           
                builder.Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
#if !DEBUG
                    webBuilder.UseUrls(new string[] { "http://192.168.1.71:81" });
#endif
                    webBuilder.UseStartup<Startup>();
                });
    }
}
