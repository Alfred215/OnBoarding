using System;
using System.Collections.Generic;
using System.Text;

namespace es.efor.OnBoarding.Business.DTO.PlayersDTOs
{
    public class PlayerGridDTO
    {
        /// <summary>
        /// Identificador del jugador
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// Nombre del jugador
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// Posicion del jugador
        /// </summary>
        public string Position { get; set; }

        /// <summary>
        /// Numero del jugador
        /// </summary>
        public int Number { get; set; }

        /// <summary>
        /// Id del equipo
        /// </summary>
        public int TeamId { get; set; }

        public string TeamName { get; set; }
    }
}
