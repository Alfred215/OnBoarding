/* tslint:disable */
import { PartFilterDto } from './part-filter-dto';
export interface PartFilterDtoDatatableDto {
  filters?: PartFilterDto;
  pageIndex?: number;
  pageSize?: number;
  sortDescending?: boolean;
  sortName?: null | string;
}
