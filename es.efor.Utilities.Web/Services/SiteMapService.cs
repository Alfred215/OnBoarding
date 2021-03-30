using es.efor.Utilities.Web.Models.SiteMaps;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace es.efor.Utilities.Web.Services
{
    public class SiteMapService
    {
        private IList<SiteMapUrl> Urls { get; set; } = new List<SiteMapUrl>();

        public void AddUrl(SiteMapUrl newUrl)
        {
            Urls.Add(newUrl);
        }
        public void RemoveUrl()
        {
            // ...
        }


        public async Task<string> GenerateSiteMapAsync()
        {
            var sitemap = new SiteMapUrlset();

            sitemap.Urls.AddRange(Urls);

            var asXml = sitemap.ToString();
            
            await Task.CompletedTask.ConfigureAwait(false);

            return asXml;
        }
    }
}
