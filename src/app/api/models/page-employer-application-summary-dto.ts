/* tslint:disable */
/* eslint-disable */
import { EmployerApplicationSummaryDto } from '../models/employer-application-summary-dto';
import { PageableObject } from '../models/pageable-object';
import { SortObject } from '../models/sort-object';
export interface PageEmployerApplicationSummaryDto {
  content?: Array<EmployerApplicationSummaryDto>;
  empty?: boolean;
  first?: boolean;
  last?: boolean;
  number?: number;
  numberOfElements?: number;
  pageable?: PageableObject;
  size?: number;
  sort?: SortObject;
  totalElements?: number;
  totalPages?: number;
}
