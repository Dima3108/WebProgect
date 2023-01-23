using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using JavaScriptEngineSwitcher.ChakraCore;
using JavaScriptEngineSwitcher.V8;
using JavaScriptEngineSwitcher;
using JavaScriptEngineSwitcher.Extensions.MsDependencyInjection;
using React.AspNet;
using React;
using React.RenderFunctions;
using React.TinyIoC;
using React.Exceptions;
using Microsoft.AspNetCore.HttpOverrides;
namespace WebApplicationProgect
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            services.AddReact();
            services.AddJsEngineSwitcher(options => options.DefaultEngineName = V8JsEngine.EngineName)
                .AddV8();
            services.AddControllersWithViews();
           /* services.Configure<ForwardedHeadersOptions>(options => {

                options.ForwardedHeaders = ForwardedHeaders.XForwardedProto  | ForwardedHeaders.XForwardedFor;
                
            });*/
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseHttpsRedirection();
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                //app.UseForwardedHeaders();
            }
            else
            {
                //app.UseDeveloperExceptionPage();
                 app.UseExceptionHandler("/Home/Error");
                //app.UseForwardedHeaders();
                
            }
            BabelConfig config_ = new BabelConfig();
           
            app.UseReact(config =>
            {
               
              //  config.SetLoadBabel(true);
               // config.SetBabelConfig(config_);
            });
            app.UseStaticFiles();

            app.UseRouting();
            
            app.UseAuthorization();
            //ReactSiteConfiguration.Configuration.AddScript(@"wwwroot\js\tutorial.jsx");
            Console.WriteLine("is startup!");
            Console.WriteLine("use kestrel! no proxy no forward");
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Home}/{action=Index}/{id?}");
            });
        }
    }
}
