using System.Text.RegularExpressions;

namespace es.efor.Utilities.General
{
    public static class StringHelpers
    {
        // Keep updated with slugify.pipe.ts
        private static (string replacement, Regex[] slugRegexes)[] SLUGIFY_REGEX = new (string sluggedResult, Regex[] slugRegex)[]
        {
            ("a", new Regex[] { new Regex(@"/á/g") }),
            ("e", new Regex[] { new Regex(@"/é/g") }),
            ("i", new Regex[] { new Regex(@"/í/g") }),
            ("o", new Regex[] { new Regex(@"/ó/g") }),
            ("u", new Regex[] { new Regex(@"/ú/g") }),
            ("n", new Regex[] { new Regex(@"/ñ/g") }),
            ("c", new Regex[] { new Regex(@"/ç/g") }),
            (" ", new Regex[] { new Regex(@"/[^\w\-]+/g"), new Regex(@"/^-+/, /-+$/") }),
            ("-", new Regex[] { new Regex(@"/\s+/g, /\-\-+/g") }),
        };

        public static string Slugify(string input)
        {
            foreach(var replacement in SLUGIFY_REGEX)
            {
                var regExes = replacement.slugRegexes;
                foreach (var re in regExes) {
                    input = re.Replace(input, replacement.replacement);
                }
            }
            return input;
        }
    }
}
