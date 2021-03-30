using AutoMapper;
using es.efor.OnBoarding.Business.DTO.RolesDTOs;
using es.efor.OnBoarding.Business.DTO.UsersDTOs;
using es.efor.OnBoarding.Data.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace es.efor.OnBoarding.Business
{
    public sealed class AutoMapperRegistrations : Profile
    {
        public AutoMapperRegistrations()
        {
            #region Usuarios
            CreateMap<Usuarios, UserDTO>()
                .ForMember(dst => dst.Id, src => src.MapFrom(usr => usr.Id))
                .ForMember(dst => dst.Username, src => src.MapFrom(usr => usr.Usuario))
                .ForMember(dst => dst.Password, src => src.MapFrom(usr => usr.Clave))
                .ForMember(dst => dst.Name, src => src.MapFrom(usr => usr.Nombre))
                .ForMember(dst => dst.Surnames, src => src.MapFrom(usr => usr.Apellidos))
                .ForMember(dst => dst.Email, src => src.MapFrom(usr => usr.Email))
                .ForMember(dst => dst.Active, src => src.MapFrom(usr => usr.Activo));

            CreateMap<UserDTO, Usuarios>()
                .ForMember(dst => dst.Id, src => src.MapFrom(usr => usr.Id))
                .ForMember(dst => dst.Usuario, src => src.MapFrom(usr => usr.Username))
                .ForMember(dst => dst.Clave, src => src.MapFrom(usr => usr.Password))
                .ForMember(dst => dst.Nombre, src => src.MapFrom(usr => usr.Name))
                .ForMember(dst => dst.Apellidos, src => src.MapFrom(usr => usr.Surnames))
                .ForMember(dst => dst.Email, src => src.MapFrom(usr => usr.Email))
                .ForMember(dst => dst.Activo, src => src.MapFrom(usr => usr.Active));
            #endregion

            #region Roles
            CreateMap<Roles, RoleDTO>()
                .ForMember(dst => dst.Id, src => src.MapFrom<int>(sc => sc.Id))
                .ForMember(dst => dst.Name, src => src.MapFrom<string>(sc => sc.Nombre));
            #endregion
        }
    }
}
