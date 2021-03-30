using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace es.efor.Utilities.Web.Models.Layout
{
    public class LayoutMenuItem
    {
        public string Label { get; set; }

        public string IconPreffix { get; set; }
        public string IconName { get; set; }

        public IEnumerable<string> RouterLinkCommands { get; set; } = Enumerable.Empty<string>();
        public string RouterLinkActiveCssClass { get; set; } = "active";
        public IEnumerable<LayoutMenuItem> Children { get; set; } = Enumerable.Empty<LayoutMenuItem>();
        public bool HasChildren => Children == null || Children.Any();

        public LayoutMenuItem AddRouterLinkCommand(params string[] commands)
        {
            RouterLinkCommands = RouterLinkCommands.Concat(commands);
            return this;
        }
        public LayoutMenuItem AddChild(params LayoutMenuItem[] items)
        {
            Children = Children.Concat(items);
            return this;
        }
    }
}
