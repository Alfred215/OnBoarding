/* tslint:disable */
import { RolesEnum } from './roles-enum';
export interface UserDto {
  dni: string;
  email: string;
  id?: null | number;
  name: string;
  password: string;
  roleId: RolesEnum;
  surnames: string;
  username: string;
}
