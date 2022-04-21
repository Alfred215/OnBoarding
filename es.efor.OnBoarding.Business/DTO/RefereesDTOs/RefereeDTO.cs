using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace es.efor.OnBoarding.Business.DTO.RefereesDTOs
{
    public class RefereeDTO
    {
        /// <summary>
        /// Identificador del equipo
        /// </summary>
        [Required(ErrorMessage = "API.ERROR.TEAM.ID.REQUIRED")]
        public int Id { get; set; }

        /// <summary>
        /// Nombre del equipo  
        /// </summary>       
        [Required(ErrorMessage = "API.ERROR.TEAM.NAME.REQUIRED")]
        [MaxLength(50, ErrorMessage = "API.ERROR.TEAM.NAME.MAXLENGTH")]
        public string Name { get; set; }
    }
}
