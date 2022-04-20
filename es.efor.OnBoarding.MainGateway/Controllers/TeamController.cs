using es.efor.OnBoarding.Business.DTO.TeamsDTOs;
using es.efor.OnBoarding.Business.DTO.FrontDTOs;
using es.efor.OnBoarding.Business.Services;
using es.efor.OnBoarding.Business.Services.TeamServices;
using es.efor.Utilities.General;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace es.efor.OnBoarding.MainGateway.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class TeamController : Controller
    {
        private readonly ITeamService _TeamService;


        public TeamController (ITeamService teamService)
        {
            _TeamService = teamService;
        }

        #region
        /// <summary>
        /// Recoger
        /// </summary>
        /// <returns>Rexoger equipo</returns>
        /// <response code="200">La solicitud ha ido correctamente</response>
        [HttpGet("get")]
        [ProducesResponseType(typeof(bool), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Get(int id)
        {
            TeamDTO resp = await _TeamService.Get(id);

            return Ok(resp);
        }
        #endregion

        #region Create  
        /// <summary>
        /// Crear un equipo
        /// </summary>
        /// <returns>Crear equipo</returns>
        /// <response code="200">La solicitud ha ido correctamente</response>
        [HttpPost("create")]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Create([FromBody] TeamDTO team)
        {
            bool resp;

            resp = await _TeamService.Set(team);

            return Ok(resp);
        }
        #endregion

        #region Listado empresa
        /// <summary>
        /// Obtiene el listado de equipos
        /// </summary>
        /// <param name="Filters">filtros de búsqueda</param>
        /// <returns>Listado de equipos</returns>
        /// <response code="200">La solicitud ha ido correctamente</response>
        [HttpPost("datatable")]
        [ProducesResponseType(typeof(CollectionList<TeamGridDTO>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> GetDatatableCompaniesAsync(
            [FromBody] DatatableDTO<TeamFilterDTO> Filters)
        {
            Filters.filters ??= new TeamFilterDTO();
            CollectionList<TeamGridDTO> companies = await _TeamService.Datatable(Filters.filters, Filters.pageIndex, Filters.pageSize, Filters.sortName, Filters.sortDescending);
            return Ok(companies);
        }
        #endregion

        #region Save
        /// <summary>
        /// Guarda los datos de un equipo
        /// </summary>
        /// <param name="team">Datos de un equipo</param>
        /// <returns>Booleano con el resultado de la solicitud</returns>
        /// <response code="200">La solicitud ha ido correctamente</response>
        /// <response code="400">Los datos del usuario no son correctos</response>
        [HttpPost]
        [ProducesResponseType(typeof(bool), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> SaveCompanyAsync([FromBody] TeamDTO team)
        {

            //Comprobar empresa disponible
            TeamDTO companyExists = await _TeamService.Get(team.Name);
            if (companyExists != null)
            {
                if (companyExists.Id != team.Id)
                {
                    ModelState.AddModelError("Username", "API.ERROR.USER.USERNAME.UNAVAILABLE");
                    return BadRequest(ModelState);
                }
            }

            bool resp = await _TeamService.Set(team);
            return Ok(resp);
        }
        #endregion

        #region Delete
        /// <summary>
        /// Elimina un equipo
        /// </summary>
        /// <param name="Id">Id del equipo</param>
        /// <returns>>Booleano con el resultado de la solicitud</returns>
        /// <response code="200">La solicitud ha ido correctamente</response>
        /// <response code="404">No se ha encontrado el usuario</response>   
        [HttpDelete]
        [ProducesResponseType(typeof(bool), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> DeleteCompanyAsync(int Id)
        {
            TeamDTO user = await _TeamService.Get(Id);

            if (user != null)
            {
                bool success = await _TeamService.Delete(Id);
                return Ok(success);
            }

            return NotFound();
        }
        #endregion
    }
}
