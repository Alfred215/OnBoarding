using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;
using System.Linq;
using System.Linq.Dynamic.Core;
using es.efor.Utilities.Linq.Models.Filters;
using es.efor.Utilities.Linq.Models.Sorts;
using System.Reflection;
using Microsoft.EntityFrameworkCore.Query.SqlExpressions;
using Microsoft.EntityFrameworkCore.Query;
using es.efor.Utilities.Linq.Constants;

namespace System.Linq
{
    public static class LinqExtensions
    {

        #region Order BY
        /// <summary>
        /// Orders a query by the given column and wether if it should be ordered with <b>DESC</b>.
        /// <br>
        /// <b>FIELD NAMES SHOULD NOT BE REPEATED.</b>
        /// </summary>
        /// <inheritdoc cref="EforOrderBy{TSource}(IQueryable{TSource}, Dictionary{string, bool})"/>
        public static IOrderedQueryable<TSource> EforOrderBy<TSource>(this IQueryable<TSource> source, IEnumerable<SortCriteria> sortCriterias)
        {
            var criterias = (sortCriterias ?? new SortCriteria[] { })
                .GroupBy(c => c.Field).Select(g => new { K = g.Key, V = (g.First().SortOp == SortOperator.Descending) })
                .ToDictionary(c => c.K, c => c.V);
            return source.EforOrderBy(criterias);
        }
        /// <summary>
        /// Sequentially orders a query by the specified fields.
        /// </summary>
        /// <typeparam name="TSource">The Entity of the query</typeparam>
        /// <param name="source">The original query</param>
        /// <param name="sortNameAndIsDescending">
        /// A collection of fields to order. Cannot be repeated.
        /// "true" will represent a <b>DESC</b> order. "false" will represent a <b>ASC</b> order.
        /// </param>
        /// <returns></returns>
        public static IOrderedQueryable<TSource> EforOrderBy<TSource>(this IQueryable<TSource> source, Dictionary<string, bool> sortNameAndIsDescending)
        {
            sortNameAndIsDescending = (sortNameAndIsDescending ?? new Dictionary<string, bool>())
                .Where(s => !string.IsNullOrWhiteSpace(s.Key)).ToDictionary(d => d.Key, d => d.Value);

            if (!sortNameAndIsDescending.Any()) sortNameAndIsDescending.Add("d_created", false);


            var first = sortNameAndIsDescending.First();
            var others = sortNameAndIsDescending.Skip(1);
            var sourceOrdered = source.OrderBy(first.Key + " " + (first.Value ? QueryConstants.ORDER_DESC : QueryConstants.ORDER_ASC));
            foreach (var o in others)
            {
                sourceOrdered = sourceOrdered.ThenBy(o.Key + " " + (o.Value ? QueryConstants.ORDER_DESC : QueryConstants.ORDER_ASC));
            }

            return sourceOrdered;
        }
        /// <summary>
        /// Orders a query by the given column and wether if it should be ordered with <b>DESC</b>.
        /// </summary>
        /// <param name="sortName">Name of the field o order the query by.</param>
        /// <param name="sortDescending">Wether the field should be ordered with <b>DESC</b></param>
        /// <inheritdoc cref="EforOrderBy{TSource}(IQueryable{TSource}, Dictionary{string, bool})"/>
        public static IOrderedQueryable<TSource> EforOrderBy<TSource>(this IQueryable<TSource> source, string sortName, bool sortDescending)
        {
            if (string.IsNullOrEmpty(sortName)) sortName = "d_created";
            return source.OrderBy(sortName + " " + (sortDescending ? QueryConstants.ORDER_DESC : QueryConstants.ORDER_ASC));
        }

        /// <summary>
        /// <inheritdoc cref="EforOrderBy{TSource}(IQueryable{TSource}, Dictionary{string, bool})"/>
        /// <br></br>
        /// <b>FIELD NAMES SHOULD NOT BE REPEATED.</b>
        /// </summary>
        /// <param name="sortCriterias">A collection of the order criteria that a query should follow</param>
        /// <inheritdoc cref="EforOrderBy{TSource}(IQueryable{TSource}, Dictionary{string, bool})"/>
        public static IOrderedQueryable<TSource> EforThenBy<TSource>(this IOrderedQueryable<TSource> source, IEnumerable<SortCriteria> sortCriterias)
        {
            var criterias = (sortCriterias ?? new SortCriteria[] { })
                .GroupBy(c => c.Field).Select(g => new { K = g.Key, V = (g.First().SortOp == SortOperator.Descending) })
                .ToDictionary(c => c.K, c => c.V);
            return source.EforThenBy(criterias);
        }
        /// <summary>
        /// Completes the given <paramref name="source"/> query's order sequency by subsequential fields
        /// </summary>
        /// <inheritdoc cref="EforOrderBy{TSource}(IQueryable{TSource}, Dictionary{string, bool})"/>
        public static IOrderedQueryable<TSource> EforThenBy<TSource>(this IOrderedQueryable<TSource> source, Dictionary<string, bool> sortNameAndIsDescending)
        {
            sortNameAndIsDescending = (sortNameAndIsDescending ?? new Dictionary<string, bool>())
                   .Where(s => !string.IsNullOrWhiteSpace(s.Key)).ToDictionary(d => d.Key, d => d.Value);

            if (!sortNameAndIsDescending.Any()) sortNameAndIsDescending.Add("d_created", false);

            foreach (var o in sortNameAndIsDescending)
            {
                source = source.ThenBy(o.Key + " " + (o.Value ? QueryConstants.ORDER_DESC : QueryConstants.ORDER_ASC));
            }

            return source;
        }
        /// <inheritdoc cref="EforThenBy{TSource}(IOrderedQueryable{TSource}, Dictionary{string, bool})"/>
        /// <param name="sortName">The field to order</param>
        /// <param name="sortDescending">Wether if the field should be ordered by using <b>DESC</b></param>
        public static IOrderedQueryable<TSource> EforThenBy<TSource>(this IOrderedQueryable<TSource> source, string sortName, bool sortDescending)
        {
            if (string.IsNullOrEmpty(sortName)) sortName = "d_created";
            return source.ThenBy(sortName + " " + (sortDescending ? QueryConstants.ORDER_DESC : QueryConstants.ORDER_ASC));
        }
        #endregion

        #region Where
        /// <summary>
        /// An extension of the fiven <paramref name="source"/> query to be filtered.
        /// </summary>
        /// <typeparam name="TSource">Entity of the query</typeparam>
        /// <param name="source">The original query</param>
        /// <param name="filterArr">An array of <see cref="FilterCriteria"/> that defines how the filtering should be performed.</param>
        /// <param name="valueFilter"></param>
        /// <param name="fieldFilter"></param>
        /// <param name="opFilter"></param>
        /// <returns></returns>
        public static IQueryable<TSource> EforWhere<TSource>(this IQueryable<TSource> source, IEnumerable<FilterCriteria> filterArr = null, string valueFilter = "", string fieldFilter = "Name", FilterOperator opFilter = FilterOperator.Eq)
        {
            if (filterArr != null)
            {
                string filterFormat = FilterDefinition.GetFilterExpression(filterArr);
                if (string.IsNullOrEmpty(filterFormat))
                    return source;
                else
                    return source.Where(filterFormat);
            }
            else if (!string.IsNullOrEmpty(valueFilter))
            {
                string filterFormat = FilterDefinition.GetFilterExpression(
                                           new FilterCriteria { Field = fieldFilter, Op = opFilter, Value = valueFilter });

                if (string.IsNullOrEmpty(filterFormat))
                    return source;
                else
                    return source.Where(filterFormat);
            }
            else
                return source;
        }
        public static IQueryable<TSource> EforWhere<TSource>(this IQueryable<TSource> source, IEnumerable<FilterCriteria> filterArr, FilterConditionJoin joinCondiction)
        {
            filterArr = filterArr ?? new FilterCriteria[] { };
            if (filterArr != null)
            {
                string filterFormat = FilterDefinition.GetFilterExpression(filterArr, joinCondiction);
                if (string.IsNullOrEmpty(filterFormat))
                    return source;
                else
                    return source.Where(filterFormat);
            }
            else
                return source;
        }
        #endregion

        #region Pagination
        public static IQueryable<TSource> EforPaginate<TSource>(this IQueryable<TSource> source, int pageIndex = 0, int pageSize = 20)
        {
            if (pageIndex < 0 || pageSize <= 0) { return source; }

            return source.Skip(pageIndex * pageSize).Take(pageSize);
        }
        #endregion

        #region Query to string
        /// <summary>
        /// NET Core 3.1 - https://stackoverflow.com/a/51583047
        /// <para>
        ///     Dependencies:<br></br>
        ///         Microsoft.EntityFrameworkCore.Query.SqlExpressions,<br></br>
        ///         Microsoft.EntityFrameworkCore.Query
        /// </para>
        /// </summary>
        public static string ToSql<TEntity>(this IQueryable<TEntity> query) where TEntity : class
        {
            var enumerator = query.Provider.Execute<IEnumerable<TEntity>>(query.Expression).GetEnumerator();
            var relationalCommandCache = enumerator.Private("_relationalCommandCache");
            var selectExpression = relationalCommandCache.Private<SelectExpression>("_selectExpression");
            var factory = relationalCommandCache.Private<IQuerySqlGeneratorFactory>("_querySqlGeneratorFactory");

            var sqlGenerator = factory.Create();
            var command = sqlGenerator.GetCommand(selectExpression);

            string sql = command.CommandText;
            return sql;
        }
        private static object Private(this object obj, string privateField) => obj?.GetType().GetField(privateField, BindingFlags.Instance | BindingFlags.NonPublic)?.GetValue(obj);
        private static T Private<T>(this object obj, string privateField) => (T)obj?.GetType().GetField(privateField, BindingFlags.Instance | BindingFlags.NonPublic)?.GetValue(obj);
        #endregion
    }
}
