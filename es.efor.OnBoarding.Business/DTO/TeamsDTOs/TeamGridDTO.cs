using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using es.efor.OnBoarding.Infraestructure.Enums.Roles;
using es.efor.OnBoarding.Business.DTO.PlayersDTOs;

namespace es.efor.OnBoarding.Business.DTO.TeamsDTOs
{
    public class TeamGridDTO
    {
        /// <summary>
        /// Identificador del equipo
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// Nombre del equipo  
        /// </summary>       
        public string Name { get; set; }

        /// <summary>
        /// Liga
        /// </summary>
        public string League { get; set; }

        /// <summary>
        /// Activo
        /// </summary>
        public string Active { get; set; }

        /// <summary>
        /// Listado de jugadores
        /// </summary>
        public List<PlayerDTO> Players { get; set; }

    }
}
