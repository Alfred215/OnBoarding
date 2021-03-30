using es.efor.OnBoarding.Infraestructure.Enums.Roles;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace es.efor.OnBoarding.Business.DTO.UsersDTOs
{
    public class UserDTO
    {
        /// <summary>
        /// Identificador del usuario
        /// </summary>
        [Required(ErrorMessage = "API.ERROR.USER.ID.REQUIRED")]
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
        [Required(ErrorMessage = "API.ERROR.USER.USERNAME.REQUIRED")]
        [MaxLength(50, ErrorMessage = "API.ERROR.USER.USERNAME.MAXLENGTH")]
        [MinLength(6, ErrorMessage = "API.ERROR.USER.USERNAME.MINLENGTH")]
        public string Username { get; set; }

        /// <summary>
        /// Clave del usuario
        /// </summary>
        [MaxLength(50, ErrorMessage = "API.ERROR.USER.PASSWORD.MAXLENGTH")]
        [MinLength(6, ErrorMessage = "API.ERROR.USER.PASSWORD.MINLENGTH")]
        public string Password { get; set; }

        /// <summary>
        /// Correo del usuario
        /// </summary>
        [MaxLength(50, ErrorMessage = "API.ERROR.USER.EMAL.MAXLENGTH")]
        [EmailAddress(ErrorMessage = "API.ERROR.USER.EMAL.INVALID")]
        public string Email { get; set; }

        /// <summary>
        /// Campo activo del usuario
        /// </summary>
        public bool Active { get; set; }

        /// <summary>
        /// Rol del usuario
        /// </summary>
        [Required(ErrorMessage = "API.ERROR.USER.ROLE.REQUIRED")]
        [EnumDataType(typeof(RolesEnum), ErrorMessage = "API.ERROR.USER.ROLE.INVALID")]
        public RolesEnum RoleId { get; set; }
    }
}
