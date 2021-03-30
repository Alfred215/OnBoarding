using AutoMapper;
using es.efor.OnBoarding.Business.DTO.RolesDTOs;
using es.efor.OnBoarding.Data.Context;
using es.efor.OnBoarding.Data.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
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

        public async Task<List<RoleDTO>> List(string name)
        {
            name ??= "";
            List<Roles> rolesList = await _dbContext.Roles
                .Where(x => x.Nombre.Contains(name))
                .AsNoTracking().ToListAsync();
            return _mapper.Map<List<RoleDTO>>(rolesList);
        }

        public async Task<RoleDTO> Get(int id)
        {
            Roles role = await _dbContext.Roles.AsNoTracking()
                .FirstOrDefaultAsync(r => r.Id == id);
            return _mapper.Map<RoleDTO>(role);
        }
    }
}
