using AutoMapper;
using es.efor.OnBoarding.Business.DTO.AuthDTOs;
using es.efor.OnBoarding.Business.DTO.TeamsDTOs;
using es.efor.OnBoarding.Business.Services.TeamServices;
using es.efor.OnBoarding.Data.Context;
using es.efor.OnBoarding.Data.Entities;
using es.efor.Utilities.General;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace es.efor.OnBoarding.Business.Services.TeamServices
{
    public class TeamService : ITeamService
    {
        #region Contructor y propiedades privadas
        private readonly OnboardingContext _dbContext;
        private readonly IMapper _mapper;

        public TeamService(
            OnboardingContext dbContext,
            IMapper mapper
            )
        {
            this._dbContext = dbContext;
            this._mapper = mapper;
        }
        #endregion

        #region Get
        public async Task<TeamDTO> Get(int Id)
        {
            Equipo team = await this._dbContext.Equipo.AsNoTracking().FirstOrDefaultAsync(x => x.Id == Id);
            return this._mapper.Map<TeamDTO>(team);
        }

        public async Task<TeamDTO> Get(string team)
        {
            Equipo teamDb = await this._dbContext.Equipo.AsNoTracking().FirstOrDefaultAsync(x => x.Nombre.Equals(team));
            return this._mapper.Map<TeamDTO>(teamDb);
        }
        #endregion

        #region DataTable
        public async Task<CollectionList<TeamGridDTO>> Datatable(TeamFilterDTO teamFilterDTO, int pageIndex, int pageSize, string sortName, bool sortDescending)
        {
            CollectionList<TeamGridDTO> result = new CollectionList<TeamGridDTO>();
            IQueryable<Equipo> query = _dbContext.Equipo.Include(u => u.Players);

            if (teamFilterDTO.Id > 0)
                query = query.Where(u => u.Id == teamFilterDTO.Id);
            if (!string.IsNullOrWhiteSpace(teamFilterDTO.Name))
                query = query.Where(u => u.Nombre.Contains(teamFilterDTO.Name));
            if (!string.IsNullOrWhiteSpace(teamFilterDTO.League))
                query = query.Where(u => u.Liga.Contains(teamFilterDTO.League));

            if (sortName != null)
            {
                switch (sortName)
                {
                    case nameof(TeamGridDTO.Name):
                        query = sortDescending ? query.OrderByDescending(u => u.Nombre) : query.OrderBy(u => u.Nombre);
                        break;
                    case nameof(TeamGridDTO.League):
                        query = sortDescending ? query.OrderByDescending(u => u.Liga) : query.OrderBy(u => u.Liga);
                        break;
                    default:
                        query = sortDescending ? query.OrderByDescending(u => u.Id) : query.OrderBy(u => u.Id);
                        break;
                }
            }

            List<Equipo> teamList = await query.EforPaginate(pageIndex, pageSize).AsNoTracking().ToListAsync();

            result.Items = _mapper.Map<List<TeamGridDTO>>(teamList);
            result.Total = await query.CountAsync();

            return result;
        }
        #endregion

        #region Set y Delete
        public async Task<bool> Set(TeamDTO team)
        {
            Equipo teamEntity;
            if (team.Id > 0)
            {
                teamEntity = await _dbContext.Equipo.FirstOrDefaultAsync(u => u.Id == team.Id);
                if (teamEntity != null)
                {
                    _mapper.Map<TeamDTO, Equipo>(team, teamEntity);
                    await _dbContext.SaveChangesAsync();
                    return true;
                }
            }
            else
            {
                teamEntity = _mapper.Map<TeamDTO, Equipo>(team);
                await _dbContext.Equipo.AddAsync(teamEntity);
                await _dbContext.SaveChangesAsync();
                return true;
            }

            return false;
        }

        public async Task<bool> Delete(int id)
        {
            Equipo teamEntity = await _dbContext.Equipo.FirstOrDefaultAsync(u => u.Id == id);

            if (teamEntity != null)
            {
                _dbContext.Equipo.Remove(teamEntity);
                await _dbContext.SaveChangesAsync();
                return true;
            }

            return false;
        }
        #endregion
    }
}
