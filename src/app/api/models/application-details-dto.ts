/* tslint:disable */
/* eslint-disable */
import { CommunicationHistoryDto } from '../models/communication-history-dto';
import { JobPostDto } from '../models/job-post-dto';
export interface ApplicationDetailsDto {
  applicationDate?: string;
  communicationHistory?: Array<CommunicationHistoryDto>;
  id?: string;
  job?: JobPostDto;
  status?: string;
}
