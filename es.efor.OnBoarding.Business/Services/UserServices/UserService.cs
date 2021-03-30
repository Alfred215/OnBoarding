using AutoMapper;
using es.efor.OnBoarding.Business.DTO.UsersDTOs;
using es.efor.OnBoarding.Data.Context;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace es.efor.OnBoarding.Business.Services.UserServices
{
    public class UserService : IUserService
    {
        #region Contructor y propiedades privadas
        private readonly IMapper _mapper;
        private readonly OnboardingContext _dbContext;

        public UserService(OnboardingContext dbContext, IMapper mapper)
        {
            this._dbContext = dbContext;
            this._mapper = mapper;
        }
        #endregion


        public async Task<List<UserDTO>> GetUserList()
        {

        }

    }
}
