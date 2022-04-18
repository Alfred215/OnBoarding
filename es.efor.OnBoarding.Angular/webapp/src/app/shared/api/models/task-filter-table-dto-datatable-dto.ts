/* tslint:disable */
import { TaskFilterTableDto } from './task-filter-table-dto';
export interface TaskFilterTableDtoDatatableDto {
  filters?: TaskFilterTableDto;
  pageIndex?: number;
  pageSize?: number;
  sortDescending?: boolean;
  sortName?: null | string;
}
