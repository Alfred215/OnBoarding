using AutoMapper;
using es.efor.OnBoarding.Business.DTO.AuthDTOs;
using es.efor.OnBoarding.Business.DTO.TeamsDTOs;
using es.efor.OnBoarding.Business.DTO.PlayersDTOs;
using es.efor.OnBoarding.Data.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace es.efor.OnBoarding.Business
{
    public sealed class MapperProfileRegistrations : Profile
    {
        public MapperProfileRegistrations()
        {
            #region Jugadores
            CreateMap<Players, PlayerDTO>()
                .ForMember(dst => dst.Id, src => src.MapFrom(usr => usr.Id))
                .ForMember(dst => dst.Name, src => src.MapFrom(usr => usr.Nombre))
                .ForMember(dst => dst.Position, src => src.MapFrom(usr => usr.Posicion))
                .ForMember(dst => dst.Number, src => src.MapFrom(usr => usr.Numero))
                .ForMember(dst => dst.TeamId, src => src.MapFrom(usr => usr.EquipoId));

            CreateMap<PlayerDTO, Players>()
                .ForMember(dst => dst.Id, src => src.MapFrom(usr => usr.Id))
                .ForMember(dst => dst.Nombre, src => src.MapFrom(usr => usr.Name))
                .ForMember(dst => dst.Posicion, src => src.MapFrom(usr => usr.Position))
                .ForMember(dst => dst.Numero, src => src.MapFrom(usr => usr.Number))
                .ForMember(dst => dst.EquipoId, src => src.MapFrom(usr => usr.TeamId));

            CreateMap<Players, PlayerGridDTO>()
                .ForMember(dst => dst.Id, src => src.MapFrom(usr => usr.Id))
                .ForMember(dst => dst.Name, src => src.MapFrom(usr => usr.Nombre))
                .ForMember(dst => dst.Position, src => src.MapFrom(usr => usr.Posicion))
                .ForMember(dst => dst.Number, src => src.MapFrom(usr => usr.Numero))
                .ForMember(dst => dst.TeamId, src => src.MapFrom(usr => usr.EquipoId));
            #endregion

            #region Equipos
            CreateMap<Equipo, TeamDTO>()
                .ForMember(dst => dst.Id, src => src.MapFrom(usr => usr.Id))
                .ForMember(dst => dst.Name, src => src.MapFrom(usr => usr.Nombre))
                .ForMember(dst => dst.League, src => src.MapFrom(usr => usr.Liga))
                .ForMember(dst => dst.Active, src => src.MapFrom(usr => usr.Activo))
                .ReverseMap();

            CreateMap<Equipo, TeamGridDTO>()
               .ForMember(dst => dst.Id, src => src.MapFrom(usr => usr.Id))
               .ForMember(dst => dst.Name, src => src.MapFrom(usr => usr.Nombre))
               .ForMember(dst => dst.League, src => src.MapFrom(usr => usr.Liga))
               .ForMember(dst => dst.Active, src => src.MapFrom(usr => usr.Activo));
            #endregion
        }
    }
}
