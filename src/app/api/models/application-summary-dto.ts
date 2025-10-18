/* tslint:disable */
/* eslint-disable */
import { JobSummaryDto } from '../models/job-summary-dto';
export interface ApplicationSummaryDto {
  applicationDate?: string;
  id?: string;
  job?: JobSummaryDto;
  status?: string;
}
