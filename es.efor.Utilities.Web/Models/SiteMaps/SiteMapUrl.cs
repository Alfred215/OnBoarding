using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Xml.Serialization;

namespace es.efor.Utilities.Web.Models.SiteMaps
{
    public class SiteMapUrl
    {
        [XmlElement("loc")]
        public string Loc { get; set; }
        [XmlIgnore]
        public bool LocSpecified => !string.IsNullOrWhiteSpace(Loc);

        [XmlIgnore]
        public DateTimeOffset? D_Lastmod { get; set; }
        [XmlElement("lastmod")]
        public string Lastmod { get { return GetLastmod(); } set { if (value == null) { D_Lastmod = null; } else { D_Lastmod = DateTimeOffset.Parse(value); } } }
        [XmlIgnore]
        public bool LastmodSpecified => D_Lastmod.HasValue;

        [XmlElement("priority")]
        public decimal? Priority { get; set; }
        [XmlIgnore]
        public bool PrioritySpecified => Priority.HasValue;

        [XmlElement("changefreq")]
        public SiteMapUrlChangefreq? Changefreq { get; set; }
        [XmlIgnore]
        public bool ChangefreqSpecified => Changefreq.HasValue;


        public enum SiteMapUrlChangefreq
        {
            always,
            hourly,
            daily,
            weekly,
            monthly,
            yearly,
            never,
        }


        private string GetLastmod()
        {
            if (!D_Lastmod.HasValue) return null;
            return D_Lastmod.Value.ToString("yyyy-MM-ddTHH:mm:sszzz");
        }
    }
}
