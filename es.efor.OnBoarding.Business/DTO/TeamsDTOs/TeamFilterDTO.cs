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
    public class TeamFilterDTO
    {
        /// <summary>
        /// Identificador del equipo
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// Nombre del equipo  
        /// </summary>       
        [MaxLength(50, ErrorMessage = "API.ERROR.TEAM.NAME.MAXLENGTH")]
        public string Name { get; set; }

        /// <summary>
        /// Liga
        /// </summary>
        [MaxLength(50, ErrorMessage = "API.ERROR.TEAM.LEAGUE.MAXLENGTH")]
        public string League { get; set; }

        /// <summary>
        /// Activo
        /// </summary>
        public bool Active { get; set; }

        /// <summary>
        /// Listado de jugadores
        /// </summary>
        public List<PlayerDTO> Players { get; set; }
    }
}
