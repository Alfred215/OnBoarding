using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace es.efor.Utilities.Linq.Models.Filters
{
    public class FilterDefinition
    {
        /// <summary>
        /// <see cref="FilterCriteria"/> whose <see cref="FilterCriteria.Op"/> is inside this array may have their value null.
        /// Others will be ignored by <see cref="GetFilterExpression(IEnumerable{FilterCriteria}, FilterConditionJoin)"/>
        /// </summary>
        private static readonly IEnumerable<FilterOperator> ValueNullOperators = new FilterOperator[]
        {
            FilterOperator.NoTextOperators, FilterOperator.TextOperators,
            FilterOperator.NullOperators, FilterOperator.Nu, FilterOperator.Nn,
        };

        /// <summary>
        /// Build a filter expression string for the given filters and joins them with the condition's character.
        /// </summary>
        /// <param name="filters">The filters that will be applied.
        /// <see cref="FilterCriteria"/> with their <see cref="FilterCriteria.Value"/> null or empty
        /// and their <see cref="FilterCriteria.Op"/> not being a null operator will be ignored.
        /// </param>
        /// <param name="conditionJoin">Wether the filter should be mutually exclusive (<see cref="FilterConditionJoin.And"/>) or not (<see cref="FilterConditionJoin.Or"/>)</param>
        public static string GetFilterExpression(IEnumerable<FilterCriteria> filters, FilterConditionJoin conditionJoin = FilterConditionJoin.And)
        {
            string filterExpression = string.Empty;
            if (filters != null)
            {
                StringBuilder filterExpressionBuilder = new StringBuilder();
                string conditionJoinString = conditionJoin.ToString();
                foreach (FilterCriteria f in filters.Where(p => !string.IsNullOrEmpty(p.Value) || ValueNullOperators.Contains(p.Op)))
                {
                    filterExpressionBuilder.Append(GetFilterExpression(f));
                    filterExpressionBuilder.Append(string.Format(" {0} ", conditionJoinString));
                }
                if (filterExpressionBuilder.Length > 0)
                    filterExpressionBuilder.Remove(filterExpressionBuilder.Length - conditionJoinString.Length - 2, conditionJoinString.Length + 2);
                filterExpression = filterExpressionBuilder.ToString();
            }
            return filterExpression;
        }

        /// <summary>
        /// Build a filter expression string for the given filter
        /// </summary>
        /// <param name="filter">The filter to be evaluated</param>
        public static string GetFilterExpression(FilterCriteria filter)
        {
            return GetFilterLinq(filter.Field, filter.Op, filter.Value, filter.Format);
        }

        /// <summary>
        /// Build a filter expression string for the given criteria
        /// </summary>
        /// <param name="searchingName">The field name to be filtered</param>
        /// <param name="searchingOperator">The operation to be performed</param>
        /// <param name="searchingValue">The value to be compared. Null operators (<see cref="FilterOperator.Nu"/> and similars) may have this value as null or empty.</param>
        /// <param name="format">The value's type.</param>
        /// <returns></returns>
        private static string GetFilterLinq(string searchingName, FilterOperator searchingOperator, string searchingValue, FilterDBType format)
        {
            if (string.IsNullOrEmpty(searchingValue)) return string.Empty;

            string searchingOperatorString = string.Empty;

            if (format == FilterDBType.DateTime)
            {
                DateTimeOffset valueDate;
                try
                {
                    valueDate = DateTimeOffset.ParseExact(searchingValue, "yyyy-MM-ddTHH:mm:ss.fffZ", null);
                }
                catch (Exception)
                {
                    valueDate = DateTimeOffset.ParseExact(searchingValue, "o", null);
                }
                //DateTime valueDate;
                //try
                //{
                //    valueDate = DateTime.ParseExact(searchingValue, "yyyy-MM-ddTHH:mm:ss.fffZ", null);
                //}
                //catch (Exception)
                //{
                //    valueDate = DateTime.ParseExact(searchingValue, "o", null);
                //}
                var valueDateTime = valueDate.TimeOfDay;
                var dayBegin = valueDate.AddHours(-valueDateTime.Hours).AddMinutes(-valueDateTime.Minutes).AddSeconds(-valueDateTime.Seconds).AddMilliseconds(-valueDateTime.Milliseconds);
                //var dayEnd = valueDate.AddHours(23 - valueDateTime.Hours).AddMinutes(59 - valueDateTime.Minutes).AddSeconds(59 - valueDateTime.Seconds).AddMilliseconds(998 - valueDateTime.Milliseconds);
                var nextDayBegin = dayBegin.AddDays(1);
                switch (searchingOperator)
                {
                    case FilterOperator.Eq:
                        // ==
                        return string.Format("({0} {1} \"{2:MM/dd/yyyy}\" && {3} {4} \"{5:MM/dd/yyyy}\")", searchingName, ">=", dayBegin, searchingName, "<", nextDayBegin);
                    case FilterOperator.Ne:
                        // !=
                        return string.Format("({0} {1} \"{2:MM/dd/yyyy}\" && {3} {4} \"{5:MM/dd/yyyy}\")", searchingName, "<", dayBegin, searchingName, ">=", nextDayBegin);
                    case FilterOperator.Lt:
                        // <
                        return string.Format("{0} {1} \"{2:MM/dd/yyyy}\"", searchingName, "<", dayBegin);
                    case FilterOperator.Le:
                        // <=
                        return string.Format("{0} {1} \"{2:MM/dd/yyyy}\"", searchingName, "<=", dayBegin);
                    case FilterOperator.Gt:
                        // >
                        return string.Format("{0} {1} \"{2:MM/dd/yyyy}\"", searchingName, ">", nextDayBegin);
                    case FilterOperator.Ge:
                        // >=
                        return string.Format("{0} {1} \"{2:MM/dd/yyyy}\"", searchingName, ">=", dayBegin);
                    case FilterOperator.Nu: return string.Format("{0} is null", searchingName);
                    case FilterOperator.Nn: return string.Format("{0} is not null", searchingName);
                    default:
                        return string.Format("{0} {1} \"{2:MM/dd/yyyy}\"", searchingName, "=", valueDate);
                }
            }
            else
            {
                //FORMAT DATA. DEPENDING ON TYPE OF DATA
                if (format == FilterDBType.String &&
                    (searchingOperator == FilterOperator.Eq || searchingOperator == FilterOperator.Ne || searchingOperator == FilterOperator.Cn))
                {
                    searchingValue = string.Format("\"{0}\"", searchingValue);
                }
                //FORMAT DATA. DEPENDING ON TYPE OF DATA
                if (format == FilterDBType.Guid &&
                    (searchingOperator != FilterOperator.Nu && searchingOperator != FilterOperator.Nn))
                {
                    var incomingIds = searchingValue.Split(',');
                    searchingValue = string.Join(",", incomingIds.Select(x => "\"" + Guid.Parse(x).ToString() + "\""));
                    searchingName = $"{searchingName}.ToString()";
                }
                switch (searchingOperator)
                {
                    case FilterOperator.Eq: return string.Format("{0} {1} {2}", searchingName, "=", searchingValue);
                    case FilterOperator.Ne: return string.Format("{0} {1} {2}", searchingName, "!=", searchingValue);
                    //case FilterOperator.EqText: return string.Format("{0} {1} \"{2}\"", searchingName, "=", searchingValue);
                    //case FilterOperator.NeText: return string.Format("{0} {1} \"{2}\"", searchingName, "!=", searchingValue);
                    case FilterOperator.Lt: return string.Format("{0} {1} {2}", searchingName, "<", searchingValue);
                    case FilterOperator.Le: return string.Format("{0} {1} {2}", searchingName, "<=", searchingValue);
                    case FilterOperator.Gt: return string.Format("{0} {1} {2}", searchingName, ">", searchingValue);
                    case FilterOperator.Ge: return string.Format("{0} {1} {2}", searchingName, ">=", searchingValue);
                    case FilterOperator.Bw: return string.Format("{0}.StartsWith({1})", searchingName, searchingValue);
                    case FilterOperator.Bn: return string.Format("!{0}.StartsWith({1})", searchingName, searchingValue);
                    case FilterOperator.Ew: return string.Format("{0}.EndsWith({1})", searchingName, searchingValue);
                    case FilterOperator.En: return string.Format("!{0}.EndsWith({1})", searchingName, searchingValue);
                    case FilterOperator.Cn: return string.Format("{0}.Contains({1})", searchingName, searchingValue);
                    case FilterOperator.Nc: return string.Format("!{0}.Contains({1})", searchingName, searchingValue);

                    //case FilterOperator.EqualOrNotEqual: return string.Format("!{0}.Contains(\"{1}\")", searchingName, searchingValue);
                    case FilterOperator.In: return string.Format("({0} {1} ({2}))", searchingName, "in", searchingValue);
                    case FilterOperator.Ni: return string.Format("({0} {1} ({2}))", searchingName, "not in", searchingValue);
                    case FilterOperator.Nu: return string.Format("({0} = null)", searchingName);
                    case FilterOperator.Nn: return string.Format("({0} != null)", searchingName);
                    //case FilterOperator.TextOperators: return string.Format("!{0}.Contains(\"{1}\")", searchingName, searchingValue);
                    //case FilterOperator.NoTextOperators: return string.Format("!{0}.Contains(\"{1}\")", searchingName, searchingValue);
                    //case FilterOperator.NullOperators: return string.Format("!{0}.Contains(\"{1}\")", searchingName, searchingValue);

                    default: return string.Format("{0} {1} \"{2}\"", searchingName, "=", searchingValue);
                }
            }
        }

        /// <inheritdoc cref="GetFilterLinq(string, FilterOperator, string, FilterDBType)"/>
        private static string GetFilter(string searchingName, FilterOperator searchingOperator, string searchingValue)
        {
            return GetFilter(searchingName, searchingOperator.ToString().ToLower(), searchingValue);
        }

        /// <inheritdoc cref="GetFilter(string, FilterOperator, string)"/>
        private static string GetFilter(string searchField, string searchingOperator, string searchValue)
        {
            string querystring = string.Empty;
            switch (searchingOperator)
            {   //equal
                case "eq": querystring = string.Format("{0} = {1}", searchField, searchValue); break;
                //not equal
                case "ne": querystring = string.Format("{0} != {1}", searchField, searchValue); break;
                //less than
                case "lt": querystring = string.Format("{0} < {1}", searchField, searchValue); break;
                //less or equal
                case "le": querystring = string.Format("{0} <= {1}", searchField, searchValue); break;
                //greater or equal
                case "gt": querystring = string.Format("{0} > {1}", searchField, searchValue); break;
                //greater or equal
                case "ge": querystring = string.Format("{0} >= {1}", searchField, searchValue); break;
                // begins with
                case "bw": querystring = string.Format("{0} like '{1}%'", searchField, searchValue); break;
                //does not begin with
                case "bn": querystring = string.Format("{0} not like '{1}%'", searchField, searchValue); break;
                //is in
                case "in": querystring = string.Format("{0} in ({1})", searchField, searchValue); break;
                //is not in
                case "ni": querystring = string.Format("{0} not in ({1})", searchField, searchValue); break;
                //ends with
                case "ew": querystring = string.Format("{0} like '%{1}'", searchField, searchValue); break;
                //does not end with
                case "en": querystring = string.Format("{0} not like '%{1}'", searchField, searchValue); break;
                //contains
                case "cn": querystring = string.Format("{0} like '%{1}%'", searchField, searchValue); break;
                //does not contains
                case "nc": querystring = string.Format("{0} not like '%{1}%'", searchField, searchValue); break;
            }
            if (querystring.Length > 0) return querystring; //Para poder asignar el valor del Campo
            else return string.Empty;
        }

    }
}
