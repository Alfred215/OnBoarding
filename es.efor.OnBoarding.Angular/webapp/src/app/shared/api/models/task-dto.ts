/* tslint:disable */
import { PartDto } from './part-dto';
export interface TaskDto {
  comement?: null | string;
  delete?: boolean;
  deleteDate?: null | string;
  estimatedHours: number;
  id: number;
  name: string;
  parts?: null | Array<PartDto>;
}
