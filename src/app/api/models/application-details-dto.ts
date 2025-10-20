/* tslint:disable */
/* eslint-disable */
import { CandidateProfileDto } from '../models/candidate-profile-dto';
import { CommunicationHistoryDto } from '../models/communication-history-dto';
import { JobPostDto } from '../models/job-post-dto';
export interface ApplicationDetailsDto {
  applicationDate?: string;
  candidateProfile?: CandidateProfileDto;
  communicationHistory?: Array<CommunicationHistoryDto>;
  id?: string;
  job?: JobPostDto;
  status?: string;
}
