using AutoMapper.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using es.efor.OnBoarding.Data.Context;

namespace es.efor.OnBoarding.Business
{
    public static class IServiceOnBoardingExtension
    {
        /// <param name="configuration">Application settings</param>
        /// <param name="migrationAssembly">Assembly name containing the database migrations. If none specified, the Repository assembly will be chosen</param>
        /// <returns></returns>
        public static IServiceCollection AddAPPHotelesService(this IServiceCollection services, IConfiguration configuration)
        {

            services.AddDbContext<OnboardingContext>(options =>
            {
                string cnnStr = configuration.GetConnectionString("Default");
                options.UseSqlServer(cnnStr);
            });

            // Inyección dependencias SERVICIOS
            services.AddScoped<IUserService, UserService>();

            return services;
        }
    }
}
