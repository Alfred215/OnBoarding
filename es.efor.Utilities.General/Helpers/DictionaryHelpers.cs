using System.Collections.Generic;

namespace es.efor.Utilities.General
{
    public static class DictionaryExtensions
    {
        public static Dictionary<TKey, TValue> AddFluent<TKey, TValue>(this Dictionary<TKey, TValue> source, TKey key, TValue value)
        {
            source.Add(key, value);
            return source;
        }
        public static TValue GetValueOrDefault<TKey, TValue>(this Dictionary<TKey, TValue> source, TKey key)
            => source.GetValueOrDefault(key, default(TValue));
        public static TValue GetValueOrDefault<TKey, TValue>(this Dictionary<TKey, TValue> source, TKey key, TValue defaultValue)
        {
            if (source.ContainsKey(key) && source[key] != null) return source[key];
            return defaultValue;
        }
    }
}
