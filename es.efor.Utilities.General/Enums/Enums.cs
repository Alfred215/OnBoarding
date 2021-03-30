using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace es.efor.Utilities.General.Enums
{
    public enum Roles
    {
        Tecnico,
        ResponsablePlanificar,
        GestorPlanificacion,
        Unauthorized,
    }

    public class Enums
    {

        #region UsuariosRoles
        public static Roles GetEnumRoles(int idRol)
        {
            switch (idRol)
            {
                case (int)Roles.Tecnico:
                    return Roles.Tecnico;
                case (int)Roles.ResponsablePlanificar:
                    return Roles.ResponsablePlanificar;
                case (int)Roles.GestorPlanificacion:
                    return Roles.GestorPlanificacion;
                default:
                    return Roles.Unauthorized;
            }
        }
        #endregion
    }
}
