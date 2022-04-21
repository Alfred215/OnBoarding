using es.efor.OnBoarding.Infraestructure.Enums.Roles;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace es.efor.OnBoarding.Business.DTO.PlayersDTOs
{
    public class PlayerFilterDTO
    {
        /// <summary>
        /// Identificador del jugador
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// Nombre del jugador
        /// </summary>
        [MaxLength(50, ErrorMessage = "API.ERROR.USER.NAME.MAXLENGTH")]
        public string Name { get; set; }

        /// <summary>
        /// Posicion del jugador
        /// </summary>
        [MaxLength(50, ErrorMessage = "API.ERROR.USER.SURNAME.MAXLENGTH")]
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
