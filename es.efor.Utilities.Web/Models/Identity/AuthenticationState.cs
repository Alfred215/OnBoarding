using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace es.efor.Utilities.Web.Models.Identity
{
    public class AuthenticationState
    {
        public bool IsAnonymous { get; set; }
        public string Username { get; set; }
        public IEnumerable<string> Permissions { get; set; } = Enumerable.Empty<string>();
    }
}
