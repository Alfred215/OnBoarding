using es.efor.OnBoarding.Business.DTO.AuthDTOs;
using es.efor.OnBoarding.Business.DTO.UsersDTOs;
using es.efor.Utilities.General;
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

        /// <summary>
        /// Obtiene un listado de usuarios para la datatable
        /// </summary>
        /// <param name="userFilterDTO"></param>
        /// <param name="pageIndex"></param>
        /// <param name="pageSize"></param>
        /// <param name="sortName"></param>
        /// <param name="sortDescending"></param>
        /// <returns></returns>
        Task<CollectionList<UserGridDTO>> Datatable(UserFilterDTO userFilterDTO,
            int pageIndex, int pageSize, string sortName, bool sortDescending);

        /// <summary>
        /// Edición / Creación del usuario
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        Task<bool> Set(UserDTO user);

        /// <summary>
        /// Borrado físico de un usuario
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Task<bool> Delete(int id);

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
