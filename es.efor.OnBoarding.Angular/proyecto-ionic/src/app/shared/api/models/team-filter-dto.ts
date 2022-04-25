/* tslint:disable */
/* eslint-disable */
import { PlayerDto } from './player-dto';
export interface TeamFilterDto {
  active?: boolean;
  id?: number;
  league?: null | string;
  name?: null | string;
  players?: null | Array<PlayerDto>;
}
