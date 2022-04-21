using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace es.efor.OnBoarding.Business.DTO.RefereesDTOs
{
    public class RefereeFilterDTO
    {
        /// <summary>
        /// Identificador del arbitro
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// Nombre del arbitro 
        /// </summary>       
        [MaxLength(50, ErrorMessage = "API.ERROR.TEAM.NAME.MAXLENGTH")]
        public string Name { get; set; }
    }
}
