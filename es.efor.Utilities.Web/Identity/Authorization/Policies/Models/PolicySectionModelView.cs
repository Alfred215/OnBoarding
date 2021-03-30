using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Reflection;
using System.Text;

namespace es.efor.Utilities.Web.Identity.Authorization.Policies.Models
{
    public class PolicySectionModelView
    {
        public Type SectionType { get; set; }
        public string Description => SectionType.GetCustomAttribute<DescriptionAttribute>()?.Description ?? SectionType.Name;

        public List<PolicyModelView> Policies { get; set; }

        public PolicySectionModelView()
        {
            Policies = new List<PolicyModelView>();
        }
    }
}
