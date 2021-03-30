using System;
using System.Collections.Generic;
using System.Text;

namespace es.efor.Utilities.Linq.Models.Filters
{
    public enum FilterDBType
    {
        /// <summary>
        /// The value should be evaluated as-is, without being parsed.
        /// </summary>
        Literal = 0,
        /// <summary>
        /// The value represents a string.
        /// </summary>
        String = 1,
        /// <summary>
        /// The value represents a <see cref="DateTime"/> or <see cref="DateTimeOffset"/>
        /// value. <a href="https://es.wikipedia.org/wiki/ISO_8601">ISO 8601</a> format is expected.
        /// JavaScript's Date's toJSON() method may be used aswell (yyyy-MM-ddTHH:mm:ss.fffZ).
        /// </summary>
        DateTime = 2,
        /// <summary>
        /// The value is expected to be a <see cref="Guid"/>.
        /// </summary>
        Guid = 3
    }
}
