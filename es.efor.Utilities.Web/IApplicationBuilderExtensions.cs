using es.efor.Utilities.Web.Middleware;
using Microsoft.AspNetCore.Builder;


namespace es.efor.Utilities.Web
{
    public static class IApplicationBuilderExtensions
    {
        public static IApplicationBuilder UseEforAngular(this IApplicationBuilder app)
        {
            app.UseMiddleware<AngularRoutingMiddleware>();

            return app;
        }
        public static IApplicationBuilder UseEforSitemap(this IApplicationBuilder app)
        {
            //app.UseMiddleware<AngularSitemapMiddleware>();

            return app;
        }
    }
}
