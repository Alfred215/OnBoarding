using AutoMapper;
using AutoMapper.QueryableExtensions;
using es.efor.OnBoarding.Business.DTO.AuthDTOs;
using es.efor.OnBoarding.Business.DTO.PlayersDTOs;
using es.efor.OnBoarding.Business.Services.PlayerServices;
using es.efor.OnBoarding.Data.Context;
using es.efor.OnBoarding.Data.Entities;
using es.efor.Utilities.General;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace es.efor.OnBoarding.Business.Services.PlayerServices
{
    public class PlayerService : IPlayerService
    {
        #region Contructor y propiedades privadas
        private readonly OnboardingContext _dbContext;
        private readonly IMapper _mapper;


        public PlayerService(
            OnboardingContext dbContext,
            IMapper mapper
            )
        {
            this._dbContext = dbContext;
            this._mapper = mapper;
        }
        #endregion

        #region Get
        public async Task<PlayerDTO> Get(int Id)
        {
            Players Player = await this._dbContext.Players.AsNoTracking().FirstOrDefaultAsync(x => x.Id == Id);
            return this._mapper.Map<PlayerDTO>(Player);
        }

        public async Task<PlayerDTO> Get(string Player)
        {
            Players PlayerDb = await this._dbContext.Players.AsNoTracking().FirstOrDefaultAsync(x => x.Nombre.Equals(Player));
            return this._mapper.Map<PlayerDTO>(PlayerDb);
        }
        #endregion

        #region Select
        public async Task<List<PlayerGridDTO>> PlayerSelect(string nombre)
        {
            IQueryable<Players> query = _dbContext.Players;
            if (!string.IsNullOrWhiteSpace(nombre))
                query = query.Where(x => x.Nombre.Contains(nombre));

            return await query.ProjectTo<PlayerGridDTO>(_mapper.ConfigurationProvider).ToListAsync();
        }
        #endregion

        #region DataTable
        public async Task<CollectionList<PlayerGridDTO>> Datatable(PlayerFilterDTO playerFilterDTO,
            int pageIndex, int pageSize, string sortName, bool sortDescending)
        {
            CollectionList<PlayerGridDTO> result = new CollectionList<PlayerGridDTO>();
            IQueryable<Players> query = _dbContext.Players.Include(u=> u.Equipo);

            if (playerFilterDTO.Id > 0)
                query = query.Where(u => u.Id == playerFilterDTO.Id);
            if (!string.IsNullOrWhiteSpace(playerFilterDTO.Name))
                query = query.Where(u => u.Nombre.Contains(playerFilterDTO.Name));
            if (!string.IsNullOrWhiteSpace(playerFilterDTO.Position))
                query = query.Where(u => u.Posicion.Contains(playerFilterDTO.Position));
            if (playerFilterDTO.Number > 0)
                query = query.Where(u => u.Numero == playerFilterDTO.Number);
            if (playerFilterDTO.TeamId > 0)
                query = query.Where(u => u.EquipoId == playerFilterDTO.TeamId);

            if (sortName != null)
            {
                switch (sortName)
                {
                    case nameof(PlayerFilterDTO.Name):
                        query = sortDescending ? query.OrderByDescending(u => u.Nombre) : query.OrderBy(u => u.Nombre);
                        break;
                    case nameof(PlayerFilterDTO.Position):
                        query = sortDescending ? query.OrderByDescending(u => u.Posicion) : query.OrderBy(u => u.Posicion);
                        break;
                    case nameof(PlayerFilterDTO.Number):
                        query = sortDescending ? query.OrderByDescending(u => u.Numero) : query.OrderBy(u => u.Numero);
                        break;
                    case nameof(PlayerFilterDTO.TeamId):
                        query = sortDescending ? query.OrderByDescending(u => u.EquipoId) : query.OrderBy(u => u.EquipoId);
                        break;
                    default:
                        query = sortDescending ? query.OrderByDescending(u => u.Id) : query.OrderBy(u => u.Id);
                        break;
                }
            }

            List<Players> playerList = await query.EforPaginate(pageIndex, pageSize).AsNoTracking().ToListAsync();

            result.Items = _mapper.Map<List<PlayerGridDTO>>(playerList);
            result.Total = await query.CountAsync();

            return result;
        }
        #endregion

        #region Set y Delete
        public async Task<bool> Set(PlayerDTO player)
        {
            Players playerEntity;
            if (player.Id > 0)
            {
                playerEntity = await _dbContext.Players.FirstOrDefaultAsync(u => u.Id == player.Id);
                if (playerEntity != null)
                {
                    _mapper.Map<PlayerDTO, Players>(player, playerEntity);
                    await _dbContext.SaveChangesAsync();
                    return true;
                }
            }
            else
            {
                Players playerDB = _mapper.Map<PlayerDTO, Players>(player);
                //Si llega bien
                if (playerDB != null)
                {
                    //Lo añadimos a la bd.
                    await _dbContext.Players.AddAsync(playerDB);
                    await _dbContext.SaveChangesAsync();
                    return true;
                }
            }

            return false;
        }

        public async Task<bool> Delete(int id)
        {
            Players playerEntity = await _dbContext.Players.FirstOrDefaultAsync(u => u.Id == id);
            
            if(playerEntity != null)
            {
                _dbContext.Players.Remove(playerEntity);
                await _dbContext.SaveChangesAsync();
                return true;
            }

            return false;
        }
        #endregion

        #region Funciones privadas
        private string GetMd5Hash(string input)
        {
            string hash = "";
            using (MD5 md5Hash = MD5.Create())
            {
                // Convert the input string to a byte array and compute the hash.
                byte[] data = md5Hash.ComputeHash(Encoding.UTF8.GetBytes(input));
                StringBuilder sBuilder = new StringBuilder();
                for (int i = 0; i < data.Length; i++)
                {
                    sBuilder.Append(data[i].ToString("x2"));
                }
                hash = sBuilder.ToString();
            }
            return hash;
        }
        #endregion
    }
}
