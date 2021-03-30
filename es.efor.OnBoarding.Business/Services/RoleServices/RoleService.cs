using AutoMapper;
using es.efor.OnBoarding.Business.DTO.RolesDTOs;
using es.efor.OnBoarding.Data.Context;
using es.efor.OnBoarding.Data.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace es.efor.OnBoarding.Business.Services.RoleServices
{
    public class RoleService : IRoleService
    {
        #region Contructor y propiedades privadas
        private readonly IMapper _mapper;
        private readonly OnboardingContext _dbContext;

        public RoleService(OnboardingContext dbContext, IMapper mapper)
        {
            this._dbContext = dbContext;
            this._mapper = mapper;
        }
        #endregion

        /// <summary>
        /// Obtiene la lista de roles de la aplicación
        /// </summary>
        /// <returns></returns>
        public async Task<List<RoleDTO>> GetRoleList()
        {
            List<Roles> rolesList = await _dbContext.Roles.AsNoTracking().ToListAsync();
            return _mapper.Map<List<RoleDTO>>(rolesList);
        }

        /// <summary>
        /// Obtiene un rol por su id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<RoleDTO> GetRoleById(int id)
        {
            Roles role = await _dbContext.Roles.AsNoTracking().FirstOrDefaultAsync(r => r.Id == id);
            return _mapper.Map<RoleDTO>(role);
        }
    }
}
