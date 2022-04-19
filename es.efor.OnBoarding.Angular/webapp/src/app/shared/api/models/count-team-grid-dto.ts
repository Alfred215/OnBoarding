/* tslint:disable */
import { TeamSmallDto } from './team-small-dto';
export interface CountTeamGridDto {
  name?: string;
  league?: number;
  team?: null | Array<TeamSmallDto>;
  totalHours?: number;
  totalParts?: number;
}
