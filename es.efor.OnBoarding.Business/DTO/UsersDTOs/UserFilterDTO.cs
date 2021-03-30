using es.efor.OnBoarding.Infraestructure.Enums.Roles;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace es.efor.OnBoarding.Business.DTO.UsersDTOs
{
    public class UserFilterDTO
    {
        /// <summary>
        /// Identificador del usuario
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// Nombre del usuario
        /// </summary>
        [MaxLength(50, ErrorMessage = "API.ERROR.USER.NAME.MAXLENGTH")]
        public string Name { get; set; }

        /// <summary>
        /// Apellidos del usuario
        /// </summary>
        [MaxLength(100, ErrorMessage = "API.ERROR.USER.SURNAME.MAXLENGTH")]
        public string Surnames { get; set; }

        /// <summary>
        /// Campo Usuario del usuario
        /// </summary>
        [MaxLength(50, ErrorMessage = "API.ERROR.USER.USERNAME.MAXLENGTH")]
        public string Username { get; set; }

        /// <summary>
        /// Correo del usuario
        /// </summary>
        [MaxLength(50, ErrorMessage = "API.ERROR.USER.EMAIL.MAXLENGTH")]
        public string Email { get; set; }

        /// <summary>
        /// Campo activo del usuario
        /// </summary>        
        public bool? Active { get; set; }

        /// <summary>
        /// Rol del usuario
        /// </summary>
        [MaxLength(50, ErrorMessage = "API.ERROR.ROLE.NAME.MAXLENGTH")]
        public string RoleName { get; set; }

        /// <summary>
        /// Identificador del rol del usuario
        /// </summary>
        public int RoleId { get; set; }
    }
}
