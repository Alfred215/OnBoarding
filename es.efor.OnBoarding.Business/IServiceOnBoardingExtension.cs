using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using es.efor.OnBoarding.Data.Context;
using es.efor.OnBoarding.Business.Services.TeamServices;
using es.efor.OnBoarding.Business.Services.PlayerServices;
using es.efor.OnBoarding.Business.Services;

namespace es.efor.OnBoarding.Business
{
    public static class IServiceOnBoardingExtension
    {
        /// <param name="configuration">Application settings</param>
        /// <returns></returns>
        public static IServiceCollection AddOnBoardingService(this IServiceCollection services, IConfiguration configuration)
        {

            services.AddDbContext<OnboardingContext>(options =>
            {
                string cnnStr = configuration.GetConnectionString("Default");
                options.UseSqlServer(cnnStr);
            });

            // Inyección dependencias SERVICIOS
            services.AddScoped<IPlayerService, PlayerService>();
            services.AddScoped<ITeamService, TeamService>();

            return services;
        }
    }
}
