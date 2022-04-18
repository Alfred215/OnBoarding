using es.efor.OnBoarding.Business.DTO.AuthDTOs;
using es.efor.OnBoarding.Business.DTO.PlayersDTOs;
using es.efor.Utilities.General;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace es.efor.OnBoarding.Business.Services.PlayerServices
{
    public interface IPlayerService
    {
        /// <summary>
        /// Obtiene un jugador a partir de su Id
        /// </summary>
        /// <param name="Id"></param>
        /// <returns></returns>
        Task<PlayerDTO> Get(int Id);

        /// <summary>
        /// Obtiene un jugador a partir de su nombre
        /// </summary>
        /// <param name="Player"></param>
        /// <returns></returns>
        Task<PlayerDTO> Get(string Player);

        /// <summary>
        /// Obtiene un listado de jugadores para la datatable
        /// </summary>
        /// <param name="playerFilterDTO"></param>
        /// <param name="pageIndex"></param>
        /// <param name="pageSize"></param>
        /// <param name="sortName"></param>
        /// <param name="sortDescending"></param>
        /// <returns></returns>
        Task<CollectionList<PlayerGridDTO>> Datatable(PlayerFilterDTO playerFilterDTO,
            int pageIndex, int pageSize, string sortName, bool sortDescending);

        /// <summary>
        /// Edición / Creación de jugador
        /// </summary>
        /// <param name="player"></param>
        /// <returns></returns>
        Task<bool> Set(PlayerDTO player);

        /// <summary>
        /// Borrado físico de un jugador
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Task<bool> Delete(int id);
    }
}
