using AutoMapper;
using es.efor.OnBoarding.Business.DTO.AuthDTOs;
using es.efor.OnBoarding.Business.DTO.UsersDTOs;
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

namespace es.efor.OnBoarding.Business.Services.UserServices
{
    public class UserService : IUserService
    {
        #region Contructor y propiedades privadas
        private readonly OnboardingContext _dbContext;
        private readonly IMapper _mapper;


        public UserService(
            OnboardingContext dbContext,
            IMapper mapper
            )
        {
            this._dbContext = dbContext;
            this._mapper = mapper;
        }
        #endregion

        public async Task<UserDTO> Get(int Id)
        {
            Usuarios User = await this._dbContext.Usuarios.AsNoTracking().FirstOrDefaultAsync(x => x.Id == Id);
            return this._mapper.Map<UserDTO>(User);
        }

        public async Task<UserDTO> Get(string User)
        {
            Usuarios UserDb = await this._dbContext.Usuarios.AsNoTracking().FirstOrDefaultAsync(x => x.Usuario.Equals(User));
            return this._mapper.Map<UserDTO>(UserDb);
        }


        public async Task<CollectionList<UserGridDTO>> Datatable(UserFilterDTO userFilterDTO,
            int pageIndex, int pageSize, string sortName, bool sortDescending)
        {
            CollectionList<UserGridDTO> result = new CollectionList<UserGridDTO>();
            IQueryable<Usuarios> query = _dbContext.Usuarios.Include(u => u.Role);

            if (userFilterDTO.Id > 0)
                query = query.Where(u => u.Id == userFilterDTO.Id);
            if (!string.IsNullOrWhiteSpace(userFilterDTO.Username))
                query = query.Where(u => u.Usuario.Contains(userFilterDTO.Username));
            if (!string.IsNullOrWhiteSpace(userFilterDTO.Name))
                query = query.Where(u => u.Nombre.Contains(userFilterDTO.Name));
            if (!string.IsNullOrWhiteSpace(userFilterDTO.Surnames))
                query = query.Where(u => u.Apellidos.Contains(userFilterDTO.Surnames));
            if (!string.IsNullOrWhiteSpace(userFilterDTO.Email))
                query = query.Where(u => u.Email.Contains(userFilterDTO.Email));
            if (userFilterDTO.RoleId > 0)
                query = query.Where(u => u.RoleId == userFilterDTO.RoleId);
            if (!string.IsNullOrWhiteSpace(userFilterDTO.RoleName))
                query = query.Where(u => u.Role.Nombre.Contains(userFilterDTO.RoleName));
            if (userFilterDTO.Active.HasValue)
                query = query.Where(u => u.Activo == userFilterDTO.Active);

            if (sortName != null)
            {
                switch (sortName)
                {
                    case nameof(UserGridDTO.Name):
                        query = sortDescending ? query.OrderByDescending(u => u.Nombre) : query.OrderBy(u => u.Nombre);
                        break;
                    case nameof(UserGridDTO.Surnames):
                        query = sortDescending ? query.OrderByDescending(u => u.Apellidos) : query.OrderBy(u => u.Apellidos);
                        break;
                    case nameof(UserGridDTO.Username):
                        query = sortDescending ? query.OrderByDescending(u => u.Usuario) : query.OrderBy(u => u.Usuario);
                        break;
                    case nameof(UserGridDTO.Email):
                        query = sortDescending ? query.OrderByDescending(u => u.Email) : query.OrderBy(u => u.Email);
                        break;
                    case nameof(UserGridDTO.Active):
                        query = sortDescending ? query.OrderByDescending(u => u.Activo) : query.OrderBy(u => u.Activo);
                        break;
                    case nameof(UserGridDTO.RoleName):
                        query = sortDescending ? query.OrderByDescending(u => u.Role.Nombre) : query.OrderBy(u => u.Role.Nombre);
                        break;
                    default:
                        query = sortDescending ? query.OrderByDescending(u => u.Id) : query.OrderBy(u => u.Id);
                        break;
                }
            }

            List<Usuarios> usersList = await query.EforPaginate(pageIndex, pageSize).AsNoTracking().ToListAsync();

            result.Items = _mapper.Map<List<UserGridDTO>>(usersList);
            result.Total = await query.CountAsync();

            return result;
        }

        public async Task<bool> Set(UserDTO user)
        {
            Usuarios userEntity;
            if (user.Id > 0)
            {
                userEntity = await _dbContext.Usuarios.FirstOrDefaultAsync(u => u.Id == user.Id);
                if (userEntity != null)
                {
                    _mapper.Map<UserDTO, Usuarios>(user, userEntity);
                    await _dbContext.SaveChangesAsync();
                    return true;
                }
            }
            else
            {
                userEntity = _mapper.Map<UserDTO, Usuarios>(user);
                userEntity.Clave = GetMd5Hash(user.Password);
                await _dbContext.Usuarios.AddAsync(userEntity);
                await _dbContext.SaveChangesAsync();
                return true;
            }

            return false;
        }

        public async Task<bool> Delete(int id)
        {
            Usuarios userEntity = await _dbContext.Usuarios.FirstOrDefaultAsync(u => u.Id == id);
            
            if(userEntity != null)
            {
                _dbContext.Usuarios.Remove(userEntity);
                await _dbContext.SaveChangesAsync();
                return true;
            }

            return false;
        }

        #region Auth
        public async Task<bool> Register(RegisterModelDTO User)
        {
            Usuarios UserDb = this._mapper.Map<Usuarios>(User);

            if (!string.IsNullOrEmpty(User.Password))
            {
                UserDb.Clave = GetMd5Hash(User.Password);
            }

            await this._dbContext.Usuarios.AddAsync(UserDb);
            await this._dbContext.SaveChangesAsync();
            return true;
        }
        /// <summary>
        /// Obtiene un usuario a partir de la información enviada durante el login
        /// </summary>
        /// <param name="Login"></param>
        /// <returns></returns>
        public async Task<UserDTO> Get(LoginModelDTO Login)
        {
            //encriptar contraseña
            Login.Password = GetMd5Hash(Login.Password);

            Usuarios User = await this._dbContext.Usuarios
                .AsNoTracking()
                .FirstOrDefaultAsync(x => x.Usuario.Equals(Login.Username) && x.Clave.Equals(Login.Password));

            return this._mapper.Map<UserDTO>(User);
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
