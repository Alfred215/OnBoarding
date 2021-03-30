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
        [MinLength(6, ErrorMessage = "API.ERROR.USER.USERNAME.MINLENGTH")]
        public string Username { get; set; }

        /// <summary>
        /// Correo del usuario
        /// </summary>
        [MaxLength(50, ErrorMessage = "API.ERROR.USER.PASSWORD.MAXLENGTH")]
        [MinLength(6, ErrorMessage = "API.ERROR.USER.PASSWORD.MINLENGTH")]
        public string Email { get; set; }

        /// <summary>
        /// Campo activo del usuario
        /// </summary>
        [MaxLength(50, ErrorMessage = "API.ERROR.USER.EMAL.MAXLENGTH")]
        public bool? Active { get; set; }

        /// <summary>
        /// Rol del usuario
        /// </summary>
        public string RoleName { get; set; }

        /// <summary>
        /// Identificador del rol del usuario
        /// </summary>
        [EnumDataType(typeof(RolesEnum), ErrorMessage = "API.ERROR.USER.ROLE.INVALID")]
        public RolesEnum RoleId { get; set; }
    }
}
