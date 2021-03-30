using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Xml;
using System.Xml.Serialization;

namespace es.efor.Utilities.Web.Models.SiteMaps
{
    [XmlRoot("urlset", Namespace = "https://www.sitemaps.org/schemas/sitemap/0.9")]
    public class SiteMapUrlset
    {
        [XmlElement(ElementName = "url")]
        public List<SiteMapUrl> Urls { get; set; } = new List<SiteMapUrl>();


        public override string ToString()
        {
            XmlSerializerNamespaces ns = new XmlSerializerNamespaces();
            ns.Add("", "");
            ns.Add("", "https://www.sitemaps.org/schemas/sitemap/0.9");

            var serializer = new XmlSerializer(typeof(SiteMapUrlset));

            using var stringWriter = new StringWriter();
            using XmlWriter xmlWriter = XmlWriter.Create(stringWriter);
            serializer.Serialize(xmlWriter, this, ns);

            var xml = stringWriter.ToString();
            return xml;
        }
    }
}
