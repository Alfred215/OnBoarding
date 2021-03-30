using System.Security.Claims;
using System.Security.Principal;

namespace es.efor.Utilities.Web.Identity
{
    public static class IPrincipalExtensions
    {
        public static string GetClaim(this IPrincipal user, string claimType)
        {
            var claims = ((ClaimsIdentity)user.Identity);
            var claim = claims.FindFirst(claimType);
            return claim?.Value;
        }
        public static string GetClaimUserName(this IPrincipal user)
        {
            return user.GetClaim(ClaimTypes.Name);
        }
        public static string GetClaimId(this IPrincipal user)
        {
            return user.GetClaim(ClaimTypes.NameIdentifier);
        }
        public static string GetClaimGivenName(this IPrincipal user)
        {
            return user.GetClaim(ClaimTypes.GivenName);
        }
    }
}
