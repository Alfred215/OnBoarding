using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using es.efor.OnBoarding.Infraestructure.Enums.Roles;
using es.efor.OnBoarding.Business.DTO.PlayersDTOs;

namespace es.efor.OnBoarding.Business.DTO.TeamsDTOs
{
    public class TeamDTO 
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

        /// <summary>
        /// Liga
        /// </summary>
        [Required(ErrorMessage = "API.ERROR.TEAM.LEAGUE.REQUIRED")]
        [MaxLength(50, ErrorMessage = "API.ERROR.TEAM.LEAGUE.MAXLENGTH")]
        public string League { get; set; }

        /// <summary>
        /// Activo
        /// </summary>
        [Required(ErrorMessage = "API.ERROR.TEAM.ACTIVE.REQUIRED")]
        public bool Active { get; set; }
    }
}
