using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Text;
using es.efor.Utilities.Swagger.Middleware;
using es.efor.Utilities.Swagger.Models;

namespace es.efor.Utilities.Swagger.Extensions
{
    public static class IApplicationBuilderExtensions
    {
        public static IApplicationBuilder UseEforSwagger(this IApplicationBuilder app, IConfiguration configuration)
        {
            var swaggerConfig = new SwaggerConfig();
            configuration.Bind("Swagger", swaggerConfig);

            app.UseMiddleware<SwaggerAuthorizationMiddleware>();
            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                foreach (var e in (swaggerConfig.UI_Endpoints ?? new Dictionary<string, string>())) c.SwaggerEndpoint(e.Value, e.Key);
                //c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
            });

            return app;
        }
    }
}
