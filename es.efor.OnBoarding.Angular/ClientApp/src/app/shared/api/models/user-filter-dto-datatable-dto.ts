/* tslint:disable */
import { UserFilterDto } from './user-filter-dto';
export interface UserFilterDtoDatatableDto {
  filters?: UserFilterDto;
  pageIndex?: number;
  pageSize?: number;
  sortDescending?: boolean;
  sortName?: null | string;
}
