using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace es.efor.Utilities.General.Helpers
{
    public static class ObjectHelper
    {
        public static TDestination CopyMap<TDestination>(
            this object source,
            JsonSerializerSettings serializerSettings)
        {
            return JsonConvert.DeserializeObject<TDestination>(
                JsonConvert.SerializeObject(source, serializerSettings));
        }
        public static TDestination CopyMap<TDestination>(
            this object source,
            ReferenceLoopHandling loopHandling = ReferenceLoopHandling.Ignore)
            => CopyMap<TDestination>(source, new JsonSerializerSettings()
            {
                ReferenceLoopHandling = loopHandling,
            });
    }
}
