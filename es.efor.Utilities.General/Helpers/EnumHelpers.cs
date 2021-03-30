using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Reflection;

namespace es.efor.Utilities.General
{
    public static class EnumHelper
    {
        public static string GetDescription(this Enum value)
        {
            var type = value.GetType();
            var typeValue = type.GetMember(value.ToString());
            var descriptionAttribute = typeValue.FirstOrDefault()?.GetCustomAttribute<DescriptionAttribute>(false);

            if (descriptionAttribute == null) return null;
            return descriptionAttribute.Description;
        }

        public static Array GetEnumValues(Type enumType)
        {
            if (!enumType.IsEnum) throw new InvalidCastException($"[{enumType.FullName}] cannot be casted to enum. Therefore, cannot be used in the method.");
            var vals = Enum.GetValues(enumType);
            return vals;
        }
        public static IEnumerable<T> GetEnumValues<T>()
            where T : Enum
        {
            var vals = Enum.GetValues(typeof(T));
            return GetEnumValues(typeof(T)).Cast<T>();
        }

        public static IEnumerable<Enum> GetMembers(this Enum @enum)
        {
            var typeOfEnum = @enum.GetType();
            var vals = Enum.GetValues(typeOfEnum);

            var members = new List<Enum>();
            return members.Where(m => @enum.HasFlag(m));
        }
    }
}
