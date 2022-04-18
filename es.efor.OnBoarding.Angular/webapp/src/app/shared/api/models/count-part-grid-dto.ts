/* tslint:disable */
import { PartSmallDto } from './part-small-dto';
export interface CountPartGridDto {
  date?: string;
  idAlumno?: number;
  month?: number;
  name?: null | string;
  part?: null | Array<PartSmallDto>;
  totalHours?: number;
  totalParts?: number;
}
