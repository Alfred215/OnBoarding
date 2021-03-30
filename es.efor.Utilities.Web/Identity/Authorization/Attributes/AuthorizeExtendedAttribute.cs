using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System.Linq;

namespace es.efor.Utilities.Web.Identity.Authorization.Attributes
{
    /// <summary>
    /// Extiende <see cref="AuthorizeAttribute"/> para habilitar nuevas características:
    /// <para>- Si el usuario cumple con al menos una de las políticas asignadas, se le permite el acceso.</para>
    /// </summary>
    public class AuthorizeExtendedAttribute : AuthorizeAttribute, IAuthorizationFilter
    {
        public string[] Policies { get; set; }

        public void OnAuthorization(AuthorizationFilterContext context)
        {
            var user = context.HttpContext.User;

            if (!user.Identity.IsAuthenticated)
            {
                return;
            }

            if ((Policies ?? new string[] { }).Any())
            {
                var isAuthorized = false;
                var authorizationService = (IAuthorizationService)context.HttpContext.RequestServices.GetService(typeof(IAuthorizationService));
                foreach (var p in Policies)
                {
                    isAuthorized = authorizationService.AuthorizeAsync(user, p).GetAwaiter().GetResult().Succeeded;
                    if (isAuthorized) break;
                }
                if (!isAuthorized)
                {
                    context.Result = new StatusCodeResult((int)System.Net.HttpStatusCode.Forbidden);
                    return;
                }
            }
        }
    }
}
