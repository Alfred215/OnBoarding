using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace es.efor.Utilities.Database.Models
{
    public class LabelAndValue<Tvalue>
    {
        public string Label { get; set; }
        public Tvalue Value { get; set; }
        public object Data { get; set; }

        public LabelAndValue() { }

        public LabelAndValue(string label, Tvalue value, object data = null)
        {
            this.Label = label;
            this.Value = value;
            this.Data = data;
        }
    }
}
