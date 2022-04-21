using AutoMapper;
using AutoMapper.QueryableExtensions;
using es.efor.OnBoarding.Business.DTO.RefereesDTOs;
using es.efor.OnBoarding.Data.Context;
using es.efor.OnBoarding.Data.Entities;
using es.efor.Utilities.General;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace es.efor.OnBoarding.Business.Services.RefereeServices
{
    public class RefereeService : IRefereeService
    {
        #region Contructor y propiedades privadas
        private readonly OnboardingContext _dbContext;
        private readonly IMapper _mapper;

        public RefereeService(
            OnboardingContext dbContext,
            IMapper mapper
            )
        {
            this._dbContext = dbContext;
            this._mapper = mapper;
        }
        #endregion

        #region Get
        public async Task<RefereeDTO> Get(int Id)
        {
            Arbitro referee = await this._dbContext.Arbitro.AsNoTracking().FirstOrDefaultAsync(x => x.Id == Id);
            return this._mapper.Map<RefereeDTO>(referee);
        }

        public async Task<RefereeDTO> Get(string team)
        {
            Arbitro teamDb = await this._dbContext.Arbitro.AsNoTracking().FirstOrDefaultAsync(x => x.Nombre.Equals(team));
            return this._mapper.Map<RefereeDTO>(teamDb);
        }
        #endregion

        #region Select
        public async Task<List<RefereeGridDTO>> TeamSelect(string nombre)
        {
            IQueryable<Arbitro> query = _dbContext.Arbitro;
            if (!string.IsNullOrWhiteSpace(nombre))
                query = query.Where(x => x.Nombre.Contains(nombre));

            return await query.ProjectTo<RefereeGridDTO>(_mapper.ConfigurationProvider).ToListAsync();
        }
        #endregion

        #region DataTable
        public async Task<CollectionList<RefereeGridDTO>> Datatable(RefereeFilterDTO refereeFilterDTO, int pageIndex, int pageSize, string sortName, bool sortDescending)
        {
            CollectionList<RefereeGridDTO> result = new CollectionList<RefereeGridDTO>();
            IQueryable<Arbitro> query = _dbContext.Arbitro;

            if (refereeFilterDTO.Id > 0)
                query = query.Where(u => u.Id == refereeFilterDTO.Id);
            if (!string.IsNullOrWhiteSpace(refereeFilterDTO.Name))
                query = query.Where(u => u.Nombre.Contains(refereeFilterDTO.Name));

            if (sortName != null)
            {
                switch (sortName)
                {
                    case nameof(RefereeGridDTO.Name):
                        query = sortDescending ? query.OrderByDescending(u => u.Nombre) : query.OrderBy(u => u.Nombre);
                        break;
                    default:
                        query = sortDescending ? query.OrderByDescending(u => u.Id) : query.OrderBy(u => u.Id);
                        break;
                }
            }

            List<Arbitro> refereeList = await query.EforPaginate(pageIndex, pageSize).AsNoTracking().ToListAsync();

            result.Items = _mapper.Map<List<RefereeGridDTO>>(refereeList);
            result.Total = await query.CountAsync();

            return result;
        }
        #endregion

        #region Set y Delete
        public async Task<bool> Set(RefereeDTO referee)
        {
            Arbitro refereeEntity;
            if (referee.Id > 0)
            {
                refereeEntity = await _dbContext.Arbitro.FirstOrDefaultAsync(u => u.Id == referee.Id);
                if (refereeEntity != null)
                {
                    _mapper.Map<RefereeDTO, Arbitro>(referee, refereeEntity);
                    await _dbContext.SaveChangesAsync();
                    return true;
                }
            }
            else
            {
                refereeEntity = _mapper.Map<RefereeDTO, Arbitro>(referee);
                await _dbContext.Arbitro.AddAsync(refereeEntity);
                await _dbContext.SaveChangesAsync();
                return true;
            }

            return false;
        }

        public async Task<bool> Delete(int id)
        {
            Arbitro refereeEntity = await _dbContext.Arbitro.FirstOrDefaultAsync(u => u.Id == id);

            if (refereeEntity != null)
            {
                _dbContext.Arbitro.Remove(refereeEntity);
                await _dbContext.SaveChangesAsync();
                return true;
            }
            return false;
        }
        #endregion
    }
}
