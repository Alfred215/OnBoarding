using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using es.efor.Utilities.Swagger.Models;

namespace es.efor.Utilities.Swagger.Middleware
{
    public class SwaggerAuthorizationMiddleware
    {
        private readonly SwaggerConfig _configuration;
        private readonly RequestDelegate _next;

        public SwaggerAuthorizationMiddleware(RequestDelegate next, SwaggerConfig configuration)
        {
            _next = next;
            _configuration = configuration;
        }

        public async Task Invoke(HttpContext context)
        {
            if (context.Request.Path.StartsWithSegments("/swagger"))
            {
                var isAllowed = false;
                if (_configuration.AllowLocalhost && (context.Connection.RemoteIpAddress.Equals(context.Connection.LocalIpAddress) || IPAddress.IsLoopback(context.Connection.RemoteIpAddress)))
                {
                    isAllowed = true;
                }
                else
                {
                    foreach (var r in _configuration.AllowedRoles)
                    {
                        isAllowed = context.User.IsInRole(r);
                        if (isAllowed) break;
                    }
                }
                if (!isAllowed)
                {
                    await context.ChallengeAsync();
                    return;
                }
            }

            await _next.Invoke(context);
        }
    }
}
