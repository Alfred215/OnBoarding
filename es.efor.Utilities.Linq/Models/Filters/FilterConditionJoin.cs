using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace es.efor.Utilities.Linq.Models.Filters
{
    /// <summary>
    /// Defines how a filter grouping should be performed.
    /// </summary>
    public enum FilterConditionJoin
    {
        /// <summary>
        /// All filters will be evaluated to a boolean result and "true" will be
        /// evaluated if all filters match the query.
        /// </summary>
        And,
        /// <summary>
        /// Any of the filters matching a criteria will result in a "true" evaluation.
        /// </summary>
        Or
    }
}
