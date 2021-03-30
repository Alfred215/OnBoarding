using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Text;

namespace es.efor.Utilities.Web.Identity.Authorization.Policies.Models
{
    public class PolicyModelView
    {
        public string Description { get; set; }
        public string Policy { get; set; }
        public Enum PolicyEnum { get; set; }

        public IEnumerable<Claim> Claims { get; set; }

        public PolicyModelView()
        {
            Claims = new Claim[] { };
        }
    }
}
