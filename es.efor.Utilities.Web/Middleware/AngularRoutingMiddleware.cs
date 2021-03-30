using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http.Abstractions;

namespace es.efor.Utilities.Web.Middleware
{
    public class AngularRoutingMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly IWebHostEnvironment _env;
        private static string IndexHtml { get; set; }

        public AngularRoutingMiddleware(IWebHostEnvironment env, RequestDelegate next)
        {
            _next = next;
            _env = env;
            if (IndexHtml == null)
            {
                IndexHtml = System.IO.File.ReadAllText(Path.Combine(_env.WebRootPath, "index.html"));
            }
        }

        public async Task Invoke(HttpContext context)
        {
            await _next.Invoke(context);

            if (context.Response.StatusCode == StatusCodes.Status404NotFound)
            {
                if(context.Request.Path.HasValue &&
                    !context.Request.Path.Value.StartsWith("/api", StringComparison.OrdinalIgnoreCase) &&
                    !context.Request.Path.Value.StartsWith("/elmah", StringComparison.OrdinalIgnoreCase) &&
                    !context.Request.Path.Value.StartsWith("/swagger", StringComparison.OrdinalIgnoreCase))
                {
                    var lastSegment = context.Request.Path.Value.Split('/').LastOrDefault();
                    if (lastSegment == null || !lastSegment.Contains('.'))
                    {
                        context.Response.ContentType = "text/html";
                        context.Response.StatusCode = StatusCodes.Status200OK;
                        await context.Response.WriteAsync(IndexHtml);
                        return;
                    }
                }
            }
        }
    }
}
