using es.efor.OnBoarding.Business.DTO.RolesDTOs;
using es.efor.OnBoarding.Business.Services.RoleServices;
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
    public class RoleController : ControllerBase
    {

        private readonly IRoleService _RoleService;

        public RoleController(
            IRoleService RoleService
            )
        {
            _RoleService = RoleService;
        }

        /// <summary>
        /// Obtiene el listado de roles de la aplicación
        /// </summary>
        /// <param name="filter">Filtro por nombre de rol</param>
        /// <returns>Listado de roles sin paginar</returns>
        /// <response code="200">La solicitud ha ido correctamente</response>
        /// <response code="401">El usuario no ha iniciado sesión</response>
        [HttpGet("select")]
        [Authorize]
        [ProducesResponseType(typeof(List<RoleDTO>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<IActionResult> GetRoleListAsync([FromQuery(Name = "f")] string filter = null)
        {
            List<RoleDTO> roles = await _RoleService.List(filter);

            return Ok(roles);
        }

        /// <summary>
        /// Obtiene un rol a partir de su Id
        /// </summary>
        /// <param name="id">Id del rol</param>
        /// <returns>Rol especificado</returns>
        /// <response code="200">La solicitud ha ido correctamente</response>
        /// <response code="401">El usuario no ha iniciado sesión</response>
        /// <response code="404">No se ha encontrado el rol especificado</response>
        [HttpGet("{id}")]
        [Authorize]
        [ProducesResponseType(typeof(RoleDTO), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetRoleAsync(int id)
        {
            RoleDTO role = await _RoleService.Get(id);
            if (role != null)
            {
                return Ok(role);
            }

            return NotFound();
        }
    }
}
