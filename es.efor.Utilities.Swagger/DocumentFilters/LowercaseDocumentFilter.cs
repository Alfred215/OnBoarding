using System.Collections.Generic;
using System.Linq;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.Swagger;
using Swashbuckle.AspNetCore.SwaggerGen;

namespace es.efor.Utilities.Swagger.DocumentFilters
{
    /// <summary>
    /// <see https://github.com/domaindrivendev/Swashbuckle/issues/834
    /// </summary>
    public class LowercaseDocumentFilter : IDocumentFilter
    {
        public void Apply(OpenApiDocument swaggerDoc, DocumentFilterContext context)
        {
            var converted = new OpenApiPaths();
            foreach (var p in swaggerDoc.Paths)
            {
                converted.Add(LowercaseEverythingButParameters(p.Key), p.Value);
            }
            swaggerDoc.Paths = converted;
        }

        private static string LowercaseEverythingButParameters(string key)
        {
            return string.Join('/', key.Split('/').Select(x => x.Contains("{") ? x : x.ToLower()));
        }

    }
}
