using System;
using System.Collections.Generic;
using System.Text;

namespace es.efor.OnBoarding.Business.DTO.UsersDTOs
{
    public class UserDTO
    {
        /// <summary>
        /// Identificador del usuario
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// Nombre del usuario
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// Apellidos del usuario
        /// </summary>
        public string Surnames { get; set; }

        /// <summary>
        /// Campo Usuario del usuario
        /// </summary>
        public string Username { get; set; }

        /// <summary>
        /// Clave del usuario
        /// </summary>
        public string Password { get; set; }

        /// <summary>
        /// Correo del usuario
        /// </summary>
        public string Email { get; set; }

        /// <summary>
        /// Campo activo del usuario
        /// </summary>
        public bool Active { get; set; }

        /// <summary>
        /// Rol del usuario
        /// </summary>
        public int RoleId { get; set; }
    }
}
