using AutoMapper;
using es.efor.OnBoarding.Business.DTO.AuthDTOs;
using es.efor.OnBoarding.Business.DTO.UsersDTOs;
using es.efor.OnBoarding.Data.Context;
using es.efor.OnBoarding.Data.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace es.efor.OnBoarding.Business.Services.UserServices
{
    public class UserService : IUserService
    {
        #region Propiedades privadas
        private readonly OnboardingContext _dbContext;
        private readonly IMapper _Mapper;
        #endregion

        public UserService(
            OnboardingContext PuertaAmericaContext,
            IMapper Mapper
            )
        {
            this._dbContext = PuertaAmericaContext;
            this._Mapper = Mapper;
        }

        public async Task<UserDTO> Get(int Id)
        {
            Usuarios User = await this._dbContext.Usuarios.AsNoTracking().FirstOrDefaultAsync(x => x.Id == Id);
            return this._Mapper.Map<UserDTO>(User);
        }
        public async Task<UserDTO> Get(string User)
        {
            Usuarios UserDb = await this._dbContext.Usuarios.AsNoTracking().FirstOrDefaultAsync(x => x.Usuario.Equals(User));
            return this._Mapper.Map<UserDTO>(UserDb);
        }

        #region Auth
        /// <summary>
        /// Crea un usuario, para pruebas
        /// </summary>
        /// <param name="User"></param>
        /// <returns></returns>
        public async Task<bool> Register(RegisterModelDTO User)
        {
            Usuarios UserDb = this._Mapper.Map<Usuarios>(User);

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

            return this._Mapper.Map<UserDTO>(User);
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
