/* tslint:disable */
import { PlayerFilterDto } from './player-filter-dto';
export interface PlayerFilterDtoDatatableDto {
  filters?: PlayerFilterDto;
  pageIndex?: number;
  pageSize?: number;
  sortDescending?: boolean;
  sortName?: null | string;
}
