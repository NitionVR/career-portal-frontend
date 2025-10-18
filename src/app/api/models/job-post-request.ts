/* tslint:disable */
/* eslint-disable */
import { LocationDto } from '../models/location-dto';
import { SkillDto } from '../models/skill-dto';
export interface JobPostRequest {
  company: string;
  description: string;
  experienceLevel?: string;
  jobType?: string;
  location?: LocationDto;
  qualifications: Array<string>;
  remote?: string;
  responsibilities: Array<string>;
  salary?: string;
  skills?: Array<SkillDto>;
  title: string;
}
