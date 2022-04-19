import { INavData } from '@coreui/angular';
import { RolesEnum } from '../../api/models';
import { Roles } from '../enums/role.enum';
/*
Para que en el menú lateral la nav que tenga hijos salga colapsado, la nav padre tiene que tener la raiz de la url de los hijos siempre que sea la misma:
    EJ: /hijos/hijo1 /hijos/hijo2 ... el padre tenría la url:'/hijos'
Si fuera diferente habría que ponerle una dummy
    EJ: /hijos/hijo1 /hijos/hijo2 /nohijos/nav4 ... el padre tenría la url:'/dummynav'
Si no le ponemos url al nav padre saldrá siempre desplegada
*/
export const navByRoles: NavByRole[] = [
    /*{
        name: 'MENU.NAV.HOME',
        url: '/home',
        icon: 'icon-fire',
        roles: [],
        order: 1
    },*/
    {
        name: 'MENU.NAV.EQUIPOS',
        url: '/parts',
        icon: 'icon-paypal',
        roles: [],
        order: 2
    },
    {
        name: 'MENU.NAV.JUGADOR',
        url: '/tasks',
        icon: 'icon-social-tumblr',
        roles: [],
        order: 3
    },
    /*{
        name: 'MENU.NAV.USERS',
        url: '/users',
        icon: 'cil-child',
        roles: [Roles.Tutor, Roles.Admin],
        order: 4
    }*/
];

interface NavByRole extends INavData {
    roles: Roles[];
    childsWithRole?: NavByRole[];
    order: number;
}
