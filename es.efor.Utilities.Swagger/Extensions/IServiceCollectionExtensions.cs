using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;
using System;
using System.IO;
using es.efor.Utilities.Swagger.DocumentFilters;
using System.Linq;

namespace es.efor.Utilities.Swagger.Extensions
{
    public static class IServiceCollectionExtensions
    {
        public static IServiceCollection AddEforSwagger<TProgram>(this IServiceCollection services, IConfiguration configuration)
        {
            var swaggerConfig = new Models.SwaggerConfig();
            configuration.Bind("Swagger", swaggerConfig);
            services.AddSingleton(swaggerConfig);

            services.AddSwaggerGen(c =>
            {
                var openApiInfo = new OpenApiInfo { 
                    Title = swaggerConfig.Title,
                    Version = swaggerConfig.Version
                };
                c.SwaggerDoc(swaggerConfig.Version, openApiInfo);

                var xmlFile = $"{typeof(TProgram).Assembly.GetName().Name}.xml";
                var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
                c.IncludeXmlComments(xmlPath);
                c.DocumentFilter<LowercaseDocumentFilter>();

                c.ResolveConflictingActions(apiDescriptions =>
                {
                    // If the path is the same, prioritize the one where "FromBody" is being used.
                    // This is used to avoid method overloads where, for example, FromBody and FromForm
                    // is expected to be used
                    apiDescriptions.OrderByDescending(d => d.ParameterDescriptions.All(pd => pd.Source == Microsoft.AspNetCore.Mvc.ModelBinding.BindingSource.Body));
                    return apiDescriptions.First();
                });
            }).AddSwaggerGenNewtonsoftSupport();

            return services;
        }
    }
}
