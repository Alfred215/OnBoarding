using es.efor.OnBoarding.Business.DTO.FrontDTOs;
using es.efor.OnBoarding.Business.DTO.UsersDTOs;
using es.efor.OnBoarding.Business.Services.UserServices;
using es.efor.Utilities.General;
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
    public class UserController : ControllerBase
    {
        private readonly IUserService _UserService;

        public UserController(
            IUserService UserService
            )
        {
            _UserService = UserService;
        }

        /// <summary>
        /// Obtiene el listado de usuarios de la aplicación
        /// </summary>
        /// <param name="Filters">filtros de búsqueda</param>
        /// <returns>Listado de usuarios</returns>
        /// <response code="200">La solicitud ha ido correctamente</response>
        /// <response code="401">El usuario no ha iniciado sesión</response>
        [HttpPost("datatable")]
        [ProducesResponseType(typeof(CollectionList<UserGridDTO>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<IActionResult> GetDatatableUsersAsync(
            //[FromBody] DatatableDTO<UserFilterDTO> Filters)
            )
        {

            //CollectionList<UserGridDTO> users = await _UserService.Datatable(Filters.filters, Filters.pageIndex, Filters.pageSize, Filters.sortName, Filters.sortDescending);
            //return Ok(users);
            return Ok();
        }

        /// <summary>
        /// Obtiene un usuario a partir de su Id
        /// </summary>
        /// <param name="id">Id del usuario</param>
        /// <returns>Usuario especificada</returns>
        /// <response code="200">La solicitud ha ido correctamente</response>
        /// <response code="401">El usuario no ha iniciado sesión</response>
        /// <response code="404">No se ha encontrado el usuario especificado</response>
        [HttpGet("{id}")]
        [ProducesResponseType(typeof(UserDTO), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetUserAsync(int id)
        {
            UserDTO user = await _UserService.Get(id);
            if (user != null)
            {
                return Ok(user);
            }

            return NotFound();
        }

        /// <summary>
        /// Guarda los datos de un usuario
        /// </summary>
        /// <param name="user">Datos del usuarios</param>
        /// <returns>Booleano con el resultado de la solicitud</returns>
        /// <response code="200">La solicitud ha ido correctamente</response>
        /// <response code="400">Los datos de la publicación no son correctos</response>
        /// <response code="401">El usuario no ha iniciado sesión</response>
        [HttpPost]
        [ProducesResponseType(typeof(bool), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<IActionResult> SaveUserAsync([FromBody] UserDTO user)
        {

            //Comprobar usuario disponible
            UserDTO userExists = await _UserService.Get(user.Username);
            if (userExists != null)
            {
                if (userExists.Id != user.Id)
                {
                    ModelState.AddModelError("Username", "API.ERROR.USER.USERNAME.UNAVAILABLE");
                    return BadRequest(ModelState);
                }
            }

            //Comprobar contraseña
            if (user.Id == 0 && string.IsNullOrEmpty(user.Password))
            {
                ModelState.AddModelError("Password", "API.ERROR.USER.PASSWORD.REQUIRED");
                return BadRequest(ModelState);
            }

            bool resp = true;// await _UserService.Set(user);
            return Ok(resp);
        }

        /// <summary>
        /// Activa o desactiva un usuario, dependiendo del parámetro pasado
        /// </summary>
        /// <param name="Id">Id del usuario</param>
        /// <param name="Active">Estado del campo Active de usuario</param>
        /// <returns>Booleano con el resultado de la solicitud</returns>
        /// <response code="200">La solicitud ha ido correctamente</response>
        /// <response code="400">El estado especificado es el estado actual del usuario</response>
        /// <response code="401">El usuario no ha iniciado sesión</response> 
        /// <response code="404">No se ha encontrado el usuario especificado</response>    
        [HttpPost("setactive/{Id}")]
        [ProducesResponseType(typeof(bool), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> ChangeUserStatusAsync(int Id, [FromBody] bool Active)
        {
            UserDTO user = await _UserService.Get(Id);

            if (user != null)
            {
                //Cambiar el estado activo                 
                if (user.Active != Active)
                {
                    user.Active = Active;
                    bool resp = true;// await _UserService.Set(user);
                    return Ok(resp);
                }
                return BadRequest();
            }
            return NotFound();
        }

        /// <summary>
        /// Elimina un usuario
        /// </summary>
        /// <param name="Id">Id del hotel</param>
        /// <returns>>Booleano con el resultado de la solicitud</returns>
        /// <response code="200">La solicitud ha ido correctamente</response>
        /// <response code="401">El usuario no ha iniciado sesión</response>
        /// <response code="404">No se ha encontrado el usuario</response>   
        [HttpDelete]
        [ProducesResponseType(typeof(bool), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> DeleteUserAsync(int Id)
        {
            UserDTO user = await _UserService.Get(Id);

            if (user != null)
            {
                bool success = true;// await _UserService.Delete(Id);
                return Ok(success);
            }

            return NotFound();
        }
    }
}
