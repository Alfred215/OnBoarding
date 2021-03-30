using System;
using System.Collections.Generic;
using System.Text;

namespace es.efor.Utilities.Linq.Nav.Models
{
    public class NavFilter<TField>
        where TField : struct, IConvertible
    {
        public TField Field { get; set; }
        public string Criteria { get; set; }
        public NavFilter() { }
    }
}
