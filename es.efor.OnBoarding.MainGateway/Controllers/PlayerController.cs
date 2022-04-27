using es.efor.OnBoarding.Business.DTO.FrontDTOs;
using es.efor.OnBoarding.Business.DTO.PlayersDTOs;
using es.efor.OnBoarding.Business.Services.PlayerServices;
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
    public class PlayerController : ControllerBase
    {
        private readonly IPlayerService _PlayerService;

        public PlayerController(
            IPlayerService playerService
            )
        {
            _PlayerService = playerService;
        }

        #region Get
        /// <summary>
        /// Recoger
        /// </summary>
        /// <returns>Rexoger jugador</returns>
        /// <response code="200">La solicitud ha ido correctamente</response>
        [HttpGet("get")]
        [ProducesResponseType(typeof(PlayerDTO), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Get(int id )
        {
           PlayerDTO resp = await _PlayerService.Get(id);

            return Ok(resp);
        }
        #endregion

        #region Seleccionar player
        ///<sumary>
        ///Obtine el listado de equipos para poder seleccionar
        /// </sumary>
        [HttpPost("select")]
        [ProducesResponseType(typeof(List<PlayerGridDTO>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> selectTeam(string nombre)
        {
            List<PlayerGridDTO> teams = await _PlayerService.PlayerSelect(nombre);
            return Ok(teams);
        }

        ///<sumary>
        ///Obtine el listado de equipos para poder seleccionar
        /// </sumary>
        [HttpGet("Select")]
        [ProducesResponseType(typeof(List<PlayerGridDTO>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> selectPlayer()
        {
            CollectionList<PlayerGridDTO> players = await _PlayerService.Select();
            return Ok(players);
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
        public async Task<IActionResult> Create([FromBody] PlayerDTO player)
        {
            bool resp;

            resp = await _PlayerService.Set(player);

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
        [ProducesResponseType(typeof(CollectionList<PlayerGridDTO>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> GetDatatableUsersAsync(
            [FromBody] DatatableDTO<PlayerFilterDTO> Filters)            
        {
            Filters.filters ??= new PlayerFilterDTO();
            CollectionList<PlayerGridDTO> players = await _PlayerService.Datatable(Filters.filters, Filters.pageIndex, Filters.pageSize, Filters.sortName, Filters.sortDescending);
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
        public async Task<IActionResult> SaveUserAsync([FromBody] PlayerDTO player)
        {
            bool resp = await _PlayerService.Set(player);
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
            PlayerDTO player = await _PlayerService.Get(Id);

            if (player != null)
            {
                bool success = await _PlayerService.Delete(Id);
                return Ok(success);
            }

            return NotFound();
        }
        #endregion
    }
}
