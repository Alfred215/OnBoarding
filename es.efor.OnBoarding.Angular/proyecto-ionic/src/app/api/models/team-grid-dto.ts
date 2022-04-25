/* tslint:disable */
import { PlayerDto } from './player-dto';
export interface TeamGridDto {
  active?: null | string;
  id?: number;
  league?: null | string;
  name?: null | string;
  players?: null | Array<PlayerDto>;
}
