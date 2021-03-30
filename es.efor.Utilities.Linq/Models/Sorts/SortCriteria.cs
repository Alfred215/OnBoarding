using System;
using System.Collections.Generic;
using System.Text;

namespace es.efor.Utilities.Linq.Models.Sorts
{
    public class SortCriteria
    {
        public string Field { get; set; }
        public SortOperator SortOp { get; set; } = SortOperator.Ascending;

        public SortCriteria() { }
    }
}
