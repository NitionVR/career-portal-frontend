/* tslint:disable */
/* eslint-disable */
import { ApplicantSummaryDto } from '../models/applicant-summary-dto';
import { PageableObject } from '../models/pageable-object';
import { SortObject } from '../models/sort-object';
export interface PageApplicantSummaryDto {
  content?: Array<ApplicantSummaryDto>;
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
