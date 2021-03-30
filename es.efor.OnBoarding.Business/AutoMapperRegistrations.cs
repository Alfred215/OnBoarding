using AutoMapper;
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
                .ForMember(dst => dst.Id, src => src.MapFrom<long>(usr => usr.Id))
                .ForMember(dst => dst.User, src => src.MapFrom<string>(usr => usr.Usuario))
                .ForMember(dst => dst.Password, src => src.MapFrom<string>(usr => usr.Clave))
                .ForMember(dst => dst.Name, src => src.MapFrom<string>(usr => usr.Nombre))
                .ForMember(dst => dst.Surname, src => src.MapFrom<string>(usr => usr.Apellidos))
                .ForMember(dst => dst.RoleId, src => src.MapFrom<int>(usr => usr.RolId))
                .ForMember(dst => dst.HotelId, src => src.MapFrom<int?>(usr => usr.HotelId))
                .ForMember(dst => dst.RoomNumber, src => src.MapFrom<int?>(usr => usr.NumHabitacion))
                .ForMember(dst => dst.LanguagePref, src => src.MapFrom<string>(usr => usr.IdiomaPref))
                .ForMember(dst => dst.Active, src => src.MapFrom<bool>(usr => usr.Activo));

            CreateMap<UserDTO, Usuarios>()
                .ForMember(dst => dst.Id, src => src.MapFrom<long>(usr => usr.Id))
                .ForMember(dst => dst.Usuario, src => src.MapFrom<string>(usr => usr.User))
                .ForMember(dst => dst.Clave, src => src.UseDestinationValue())
                .ForMember(dst => dst.Nombre, src => src.MapFrom<string>(usr => usr.Name))
                .ForMember(dst => dst.Apellidos, src => src.MapFrom<string>(usr => usr.Surname))
                .ForMember(dst => dst.RolId, src => src.MapFrom<int>(usr => (int)usr.RoleId))
                .ForMember(dst => dst.HotelId, src => src.MapFrom<int?>(usr => usr.HotelId))
                .ForMember(dst => dst.NumHabitacion, src => src.MapFrom<int?>(usr => usr.RoomNumber))
                .ForMember(dst => dst.IdiomaPref, src => src.MapFrom<string>(usr => usr.LanguagePref))
                .ForMember(dst => dst.Activo, src => src.MapFrom<bool>(usr => usr.Active));

            CreateMap<RegisterModelDTO, Usuarios>()
               .ForMember(dst => dst.Usuario, src => src.MapFrom<string>(usr => usr.User))
               .ForMember(dst => dst.Clave, src => src.MapFrom<string>(usr => usr.Password))
               .ForMember(dst => dst.Nombre, src => src.MapFrom<string>(usr => usr.Name))
               .ForMember(dst => dst.Apellidos, src => src.MapFrom<string>(usr => usr.Surname))
               .ForMember(dst => dst.RolId, src => src.MapFrom<int>(usr => usr.Role))
               .ForMember(dst => dst.Activo, src => src.MapFrom<bool>(usr => true));

            CreateMap<Usuarios, UserListDTO>()
                .ForMember(dst => dst.Id, src => src.MapFrom<long>(usr => usr.Id))
                .ForMember(dst => dst.User, src => src.MapFrom<string>(usr => usr.Usuario))
                .ForMember(dst => dst.Name, src => src.MapFrom<string>(usr => usr.Nombre))
                .ForMember(dst => dst.Surname, src => src.MapFrom<string>(usr => usr.Apellidos))
                .ForMember(dst => dst.RoleId, src => src.MapFrom<int>(usr => usr.RolId))
                .ForMember(dst => dst.RoleName, src => src.MapFrom<string>(usr => usr.Rol.Nombre))
                .ForMember(dst => dst.HotelId, src => src.MapFrom<int?>(usr => usr.HotelId))
                .ForMember(dst => dst.HotelName, src => src.MapFrom<string>(usr => usr.Hotel.Nombre))
                .ForMember(dst => dst.RoomNumber, src => src.MapFrom<int?>(usr => usr.NumHabitacion))
                .ForMember(dst => dst.LanguagePref, src => src.MapFrom<string>(usr => usr.IdiomaPref))
                .ForMember(dst => dst.Active, src => src.MapFrom<bool>(usr => usr.Activo));
            #endregion

            #region Roles
            CreateMap<Roles, RoleDTO>()
                .ForMember(dst => dst.Id, src => src.MapFrom<int>(sc => sc.Id))
                .ForMember(dst => dst.Name, src => src.MapFrom<string>(sc => sc.Nombre));
            #endregion
        }
    }
}
