using es.efor.OnBoarding.Business.DTO.FrontDTOs;
using es.efor.OnBoarding.Business.DTO.RefereesDTOs;
using es.efor.OnBoarding.Business.Services.RefereeServices;
using es.efor.Utilities.General;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace es.efor.OnBoarding.MainGateway.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RefereeController : ControllerBase
    {
        private readonly IRefereeService _RefereeService;

        public RefereeController(
            IRefereeService refereeService
            )
        {
            _RefereeService = refereeService;
        }

        #region Get
        /// <summary>
        /// Recoger
        /// </summary>
        /// <returns>Rexoger jugador</returns>
        /// <response code="200">La solicitud ha ido correctamente</response>
        [HttpGet("get")]
        [ProducesResponseType(typeof(RefereeDTO), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Get(int id)
        {
            RefereeDTO resp = await _RefereeService.Get(id);

            return Ok(resp);
        }
        #endregion

        #region Create  
        /// <summary>
        /// Crear 
        /// </summary>
        /// <returns>Crear jugador</returns>
        /// <response code="200">La solicitud ha ido correctamente</response>
        [HttpPost("create")]
        [ProducesResponseType(typeof(bool), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Create([FromBody] RefereeDTO referee)
        {
            bool resp;

            resp = await _RefereeService.Set(referee);

            return Ok(resp);
        }
        #endregion

        #region Listado de jugadores
        /// <summary>
        /// Obtiene el listado de jugadores
        /// </summary>
        /// <param name="Filters">filtros de búsqueda</param>
        /// <returns>Listado de jugadores</returns>
        /// <response code="200">La solicitud ha ido correctamente</response>
        [HttpPost("datatable")]
        [ProducesResponseType(typeof(CollectionList<RefereeGridDTO>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> GetDatatableUsersAsync(
            [FromBody] DatatableDTO<RefereeFilterDTO> Filters)
        {
            Filters.filters ??= new RefereeFilterDTO();
            CollectionList<RefereeGridDTO> players = await _RefereeService.Datatable(Filters.filters, Filters.pageIndex, Filters.pageSize, Filters.sortName, Filters.sortDescending);
            return Ok(players);
        }
        #endregion

        #region Save
        /// <summary>
        /// Guarda los datos de un jugador
        /// </summary>
        /// <param name="player">Datos del jugador</param>
        /// <returns>Booleano con el resultado de la solicitud</returns>
        /// <response code="200">La solicitud ha ido correctamente</response>
        /// <response code="400">Los datos del usuario no son correctos</response>
        [HttpPost]
        [ProducesResponseType(typeof(bool), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> SaveUserAsync([FromBody] RefereeDTO referee)
        {
            bool resp = await _RefereeService.Set(referee);
            return Ok(resp);
        }
        #endregion

        #region Delete
        /// <summary>
        /// Elimina un jugador
        /// </summary>
        /// <param name="Id">Id del jugador</param>
        /// <returns>>Booleano con el resultado de la solicitud</returns>
        /// <response code="200">La solicitud ha ido correctamente</response>
        /// <response code="404">No se ha encontrado el usuario</response>   
        [HttpDelete]
        [ProducesResponseType(typeof(bool), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> DeleteUserAsync(int Id)
        {
            RefereeDTO referee = await _RefereeService.Get(Id);

            if (referee != null)
            {
                bool success = await _RefereeService.Delete(Id);
                return Ok(success);
            }

            return NotFound();
        }
        #endregion
    }
}
