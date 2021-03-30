using es.efor.Utilities.General.Helpers;
using es.efor.Utilities.Linq.Models.Filters;
using es.efor.Utilities.Linq.Nav.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace es.efor.Utilities.Linq.Nav.Tools
{
    public class NavConverter<TFilter, TField>
        where TFilter : class
        where TField : struct, IConvertible
    {
        public NavConverter()
        {
            var typeOfTField = typeof(TField);
            if (!typeOfTField.IsEnum)
            {
                throw new ArgumentException($"{nameof(TField)} {typeOfTField.FullName} must be a NAV service filter enum");
            }
        }

        public IEnumerable<TFilter> BuildNavFilter(IEnumerable<FilterCriteria> filter)
        {
            if (filter == null) return Enumerable.Empty<TFilter>();

            var filterList = filter
                .Where(f => !string.IsNullOrEmpty(f.Value))
                .ToList();

            var filterNav = new List<NavFilter<TField>>();
            // Date ranges - get range filters
            var dateRanges = filterList
                .Where(f => f.Format == FilterDBType.DateTime)
                .GroupBy(f => f.Field)
                .Where(f => f.Count() == 2)
                .ToList();
            // Exclude them until cleanned up
            filterList = filterList
                .Except(dateRanges.SelectMany(r => r))
                .ToList();

            // Re-build range filters, in a way NAV can understand them
            foreach (var f in dateRanges)
            {
                var criterias = f.Select(ff => BuildCriteriaConditionDatetime(FilterOperator.Eq, ff.Value));
                filterList.Add(new FilterCriteria()
                {
                    Field = f.Key,
                    Format = FilterDBType.String,
                    Op = FilterOperator.Eq,
                    Value = $"{string.Join("..", criterias)}",
                });
            }
            foreach (var f in filterList)
            {
                var c = BuildCondition(f);
                if (c != null) filterNav.Add(c);
            }
            var converted = ConvertToFilter(filterNav);
            return converted;
        }

        public static IEnumerable<TFilter> ConvertToFilter(IEnumerable<NavFilter<TField>> filter)
        {
            return ObjectHelper.CopyMap<IEnumerable<TFilter>>(filter);
        }

        public static TFilter ConvertToFilter(NavFilter<TField> filter)
        {
            return ObjectHelper.CopyMap<TFilter>(filter);
        }

        public NavFilter<TField> BuildCondition(FilterCriteria filter)
        {
            if (filter == null) return null;
            try
            {
                var f = (TField)Enum.Parse(typeof(TField), filter.Field);
                var c = BuildCriteriaCondition(filter);
                return new NavFilter<TField>
                {
                    Field = f,
                    Criteria = c,
                };
            }
            catch (Exception)
            {
                return null;
            }
        }
        public string BuildCriteriaCondition(FilterCriteria filter)
        {
            return BuildCriteriaCondition(filter.Op, filter.Format, filter.Value);
        }
        public string BuildCriteriaCondition(FilterOperator op, FilterDBType format, string value)
        {
            string criteria = string.Empty;
            switch (format)
            {
                case FilterDBType.Literal:
                case FilterDBType.Guid:
                case FilterDBType.String:
                default:
                    return BuildCriteriaConditionString(op, value);
                case FilterDBType.DateTime: return BuildCriteriaConditionDatetime(op, value);
            }
        }
        public string BuildCriteriaConditionDatetime(FilterOperator op, string value)
        {
            DateTime asDatetime;
            if (!DateTime.TryParseExact(value, "yyyy-MM-ddTHH:mm:ss.ffZ", null, System.Globalization.DateTimeStyles.None, out asDatetime) || !DateTime.TryParseExact(value, "yyyy-MM-ddTHH:mm:ss.fffZ", null, System.Globalization.DateTimeStyles.None, out asDatetime))
            {
                asDatetime = DateTime.Parse(value);
            }
            string criteria = asDatetime.ToString("dd-MM-yyyy"); // Web.config --> dateToStringFormatMDNAV
            switch (op)
            {
                // necesario formatear para fechas
                
                case FilterOperator.Eq:
                default: return criteria;
                case FilterOperator.Ge: return string.Format(">={0}", criteria);
                case FilterOperator.Gt: return string.Format("{0}..", criteria);
                case FilterOperator.Lt: return string.Format("..{0}", criteria);
                case FilterOperator.Le: return string.Format("<={0}", criteria);
                    //case FilterOperator.Nu: 
                    //case FilterOperator.Nn: 
            }
        }
        public string BuildCriteriaConditionString(FilterOperator op, string value)
        {
            switch (op)
            {
                case FilterOperator.Ne: return string.Format("<>{0}", value);
                case FilterOperator.Cn:
                    {
                        if (value != null && value.Contains('|'))
                        {
                            var values = value.Split('|')
                                .Where(v => !string.IsNullOrEmpty(v))
                                .Distinct()
                                .Select(v => $"@*{v}*");
                            return $"{string.Join("|", values)}";
                        }
                        return string.Format("@*{0}*", value);
                    }
                case FilterOperator.Nc: return string.Format("<>*{0}*", value);
                case FilterOperator.Bw: return string.Format("{0}*", value);
                case FilterOperator.Bn: return string.Format("<>{0}*", value);
                case FilterOperator.Ew: return string.Format("*{0}", value);
                case FilterOperator.En: return string.Format("<>*{0}", value);
                //case FilterOperator.In: 
                //case FilterOperator.Ni:
                case FilterOperator.Ge: return string.Format(">={0}", value);
                case FilterOperator.Gt: return string.Format(">{0}", value);
                case FilterOperator.Le: return string.Format("<{0}", value);
                case FilterOperator.Lt: return string.Format("<={0}", value);
                //case FilterOperator.Nu: 
                //case FilterOperator.Nn: 
                case FilterOperator.Eq:
                default:
                    return value;
            }
        }
    }
}
