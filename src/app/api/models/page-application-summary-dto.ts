/* tslint:disable */
/* eslint-disable */
import { ApplicationSummaryDto } from '../models/application-summary-dto';
import { PageableObject } from '../models/pageable-object';
import { SortObject } from '../models/sort-object';
export interface PageApplicationSummaryDto {
  content?: Array<ApplicationSummaryDto>;
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
