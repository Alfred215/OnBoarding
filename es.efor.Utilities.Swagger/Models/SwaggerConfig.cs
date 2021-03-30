using System;
using System.Collections.Generic;

namespace es.efor.Utilities.Swagger.Models
{
    public class SwaggerConfig : SwaggerConfig<SwaggerConfig> {
        public SwaggerConfig() : base() { }
    }
    public class SwaggerConfig<TProgram>
    {
        public string UI_Url { get; set; }
        /// <summary>
        /// Key = Name. Value = relative to Host
        /// </summary>
        public Dictionary<string, string> UI_Endpoints { get; set; } = new Dictionary<string, string>();
        public string Version { get; set; }
        public string Title { get; set; }
        public Uri ToS_Uri { get; set; } = null;
        public string Docs_Name { get { return _Docs_Name ?? Title; } set { _Docs_Name = value; } }
        private string _Docs_Name { get; set; }
        public IEnumerable<string> AllowedRoles { get; set; }
        public bool AllowLocalhost { get; set; }
    }
}
