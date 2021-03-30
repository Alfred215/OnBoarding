using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;

namespace es.efor.Utilities.Linq.Models.Filters
{
    public class FilterCriteria
    {
        /// <summary>
        /// The field name where the filter will be applied
        /// </summary>
        public string Field { get; set; }
        /// <summary>
        /// The value to be evaluated. Null operators (<see cref="FilterOperator.Nu"/> and similar)
        /// may have this value assignes as null or empty.
        /// </summary>
        public string Value { get; set; }
        /// <summary>
        /// The operation to be evaluated. If it's not a null operator and the value is null
        /// or empty, the filter will be ignored.
        /// </summary>
        public FilterOperator Op { get; set; }
        /// <summary>
        /// The filter of the value.
        /// </summary>
        public FilterDBType Format { get; set; }
    } 
}
