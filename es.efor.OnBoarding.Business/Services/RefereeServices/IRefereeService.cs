using es.efor.OnBoarding.Business.DTO.RefereesDTOs;
using es.efor.Utilities.General;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace es.efor.OnBoarding.Business.Services.RefereeServices
{
    public interface IRefereeService
    {
        /// <summary>
        /// Obtiene una equipo a partir de su Id
        /// </summary>
        /// <param name="Id"></param>
        /// <returns></returns>
        Task<RefereeDTO> Get(int Id);

        /// <summary>
        /// Obtiene una equipo a partir de su nombre
        /// </summary>
        /// <param name="Team"></param>
        /// <returns></returns>
        Task<RefereeDTO> Get(string Team);

        Task<List<RefereeDTO>> RefereeSelect(string Team);

        /// <summary>
        /// Obtiene un listado de equipos para la datatable
        /// </summary>
        /// <param name="teamFilterDTO"></param>
        /// <param name="pageIndex"></param>
        /// <param name="pageSize"></param>
        /// <param name="sortName"></param>
        /// <param name="sortDescending"></param>
        /// <returns></returns>
        Task<CollectionList<RefereeGridDTO>> Datatable(RefereeFilterDTO teamFilterDTO,
            int pageIndex, int pageSize, string sortName, bool sortDescending);

        /// <summary>
        /// Edición / Creación de un equipo
        /// </summary>
        /// <param name="team"></param>
        /// <returns></returns>
        Task<bool> Set(RefereeDTO team);

        /// <summary>
        /// Borrado físico de un equipo
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Task<bool> Delete(int id);
    }
}
