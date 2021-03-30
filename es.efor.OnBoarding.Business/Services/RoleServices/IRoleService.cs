using es.efor.OnBoarding.Business.DTO.RolesDTOs;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace es.efor.OnBoarding.Business.Services.RoleServices
{
    public interface IRoleService
    {
        /// <summary>
        /// Obtiene la lista de roles de la aplicación
        /// </summary>
        /// <param name="name"></param>
        /// <returns></returns>
        Task<List<RoleDTO>> List(string name);

        /// <summary>
        /// Obtiene un rol por su id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Task<RoleDTO> Get(int id);
    }
}
