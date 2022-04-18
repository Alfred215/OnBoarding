using es.efor.OnBoarding.Infraestructure.Enums.Roles;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace es.efor.OnBoarding.Business.DTO.PlayersDTOs
{
    public class PlayerDTO
    {
        /// <summary>
        /// Identificador del usuario
        /// </summary>
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        /// <summary>
        /// Nombre del usuario
        /// </summary>       
        [MaxLength(50, ErrorMessage = "API.ERROR.PLAYER.NAME.MAXLENGTH")]
        [Required(ErrorMessage = "API.ERROR.PLAYER.NAME.REQUIRED")]
        public string Name { get; set; }

        /// <summary>
        /// Apellidos del usuario
        /// </summary>
        [MaxLength(50, ErrorMessage = "API.ERROR.PLAYER.POSITION.MAXLENGTH")]
        [Required(ErrorMessage = "API.ERROR.PLAYER.POSITION.REQUIRED")]
        public string Position { get; set; }

        /// <summary>
        /// Campo Usuario del usuario
        /// </summary>
        [Required(ErrorMessage = "API.ERROR.PLAYER.NUMBER.REQUIRED")]
        public int Number { get; set; }

        /// <summary>
        /// 
        /// </summary>
        [Required(ErrorMessage = "API.ERROR.PLAYER.TEAMID.REQUIRED")]
        public int TeamId { get; set; }
    }
}

