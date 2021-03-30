//using es.efor.Utilities.Web.Models.SiteMaps;
//using es.efor.Utilities.Web.Services;
//using Microsoft.AspNetCore.Http;
//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Threading.Tasks;

//namespace es.efor.Utilities.Web.Middleware
//{
//    public class AngularSitemapMiddleware
//    {
//        private readonly RequestDelegate _next;

//        public AngularSitemapMiddleware(RequestDelegate next)
//        {
//            _next = next;
//        }

//        public async Task Invoke(HttpContext context,
//            SiteMapService siteMapService)
//        {
//            var req = context.Request;
//            if (req.Path.StartsWithSegments("/sitemap.xml"))
//            {

//                var asXml = siteMapService.GenerateSiteMapAsync().ConfigureAwait(false);
//                await context.Response.WriteAsync(asXml);
//                return;
//            }

//            await _next.Invoke(context);
//        }
      
//    }
//}