/* tslint:disable */
import { TaskFilterDto } from './task-filter-dto';
export interface TaskFilterDtoDatatableDto {
  filters?: TaskFilterDto;
  pageIndex?: number;
  pageSize?: number;
  sortDescending?: boolean;
  sortName?: null | string;
}
