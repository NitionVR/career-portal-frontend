/* tslint:disable */
/* eslint-disable */
import { PageableObject } from '../models/pageable-object';
import { RecruiterInvitationDto } from '../models/recruiter-invitation-dto';
import { SortObject } from '../models/sort-object';
export interface PageRecruiterInvitationDto {
  content?: Array<RecruiterInvitationDto>;
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
