/* tslint:disable */
import { RolesEnum } from './roles-enum';
export interface RegisterModelDto {
  deleteDate: string;
  deleted: boolean;
  email: string;
  name: string;
  nif: string;
  password: string;
  role: RolesEnum;
  surname: string;
  user: string;
}
