using es.efor.OnBoarding.Business.DTO.AuthDTOs;
using es.efor.OnBoarding.Business.DTO.UsersDTOs;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace es.efor.OnBoarding.Business.Services.UserServices
{
    public interface IUserService
    {
        /// <summary>
        /// Obtiene un usuario a partir de su Id
        /// </summary>
        /// <param name="Id"></param>
        /// <returns></returns>
        Task<UserDTO> Get(int Id);
        /// <summary>
        /// Obtiene un usuario a partir de su nombre de usuario
        /// </summary>
        /// <param name="User"></param>
        /// <returns></returns>
        Task<UserDTO> Get(string User);

        #region Auth
        /// <summary>
        /// Crea un usuario, para pruebas
        /// </summary>
        /// <param name="User"></param>
        /// <returns></returns>
        Task<bool> Register(RegisterModelDTO User);
        /// <summary>
        /// Obtiene un usuario a partir de la información enviada durante el login
        /// </summary>
        /// <param name="Login"></param>
        /// <returns></returns>
        Task<UserDTO> Get(LoginModelDTO Login);
        #endregion
    }
}
