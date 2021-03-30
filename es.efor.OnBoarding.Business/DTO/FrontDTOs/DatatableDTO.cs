using System;
using System.Collections.Generic;
using System.Text;

namespace es.efor.OnBoarding.Business.DTO.FrontDTOs
{
    public class DatatableDTO<TValue>
    {
        public TValue filters { get; set; }

        public int pageIndex { get; set; }
        public int pageSize { get; set; }
        public string sortName { get; set; }
        public bool sortDescending { get; set; }
    }
}
