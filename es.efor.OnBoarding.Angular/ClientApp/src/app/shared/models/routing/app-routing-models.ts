import { Data, Route, Routes } from '@angular/router';
import { Roles } from '../enums/role.enum';


/** @todo KEEP THIS UPDATED WITH POLICY ENUMS FROM API! */
export type AppPolicy = Roles;

export declare type AppRoutes = AppRoute[];
export interface AppRoute
    extends Route {
    data?: RouteDataWithPolicy;
}
export interface RouteDataWithPolicy
    extends Data {
    policy?: AppPolicy | AppPolicy[];
    policyJoinMode?: PolicyJoinMode;
}
export enum PolicyJoinMode {
    And = 0,
    Or = 1,
}
