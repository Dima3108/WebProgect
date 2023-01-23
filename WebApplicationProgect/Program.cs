using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Server.Kestrel.Core;
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
                 
#endif
                  /*  webBuilder.UseKestrel(optios => {
                       
                    });
                    webBuilder.ConfigureKestrel(options =>
                    {
                       
                        options.Limits.KeepAliveTimeout = TimeSpan.FromMinutes(3);
                        options.Limits.MaxConcurrentConnections = 100;
                        options.Limits.MaxConcurrentUpgradedConnections = options.Limits.MaxConcurrentConnections;
                        options.Limits.Http2.MaxStreamsPerConnection = 100;
                        options.Limits.RequestHeadersTimeout = TimeSpan.FromMinutes(2);
                        options.Limits.MinRequestBodyDataRate = new MinDataRate(
        bytesPerSecond: 100, gracePeriod: TimeSpan.FromSeconds(10));
                        options.Limits.MinResponseDataRate = new MinDataRate(
                            bytesPerSecond: 100, gracePeriod: TimeSpan.FromSeconds(10));
                        options.Limits.Http2.HeaderTableSize = 4096;
                        options.Limits.Http2.MaxFrameSize = 16_384;
                        options.Limits.Http2.MaxRequestHeaderFieldSize = 8192;
                        options.Limits.Http2.InitialConnectionWindowSize = 131_072;
                        options.Limits.Http2.InitialStreamWindowSize = 98_304;
                       // options.Limits.Http2.KeepAlivePingDelay = TimeSpan.FromSeconds(30);
                       // options.Limits.Http2.KeepAlivePingTimeout = TimeSpan.FromMinutes(1);
                        options.Listen(System.Net.IPAddress.Parse("192.168.1.71"), 81); 
                        
                    });*/
                    webBuilder.UseStartup<Startup>();
                });
    }
}
