/* tslint:disable */
/* eslint-disable */
import { JsonNode } from '../models/json-node';
export interface JobPostResponse {
  company?: string;
  createdAt?: string;
  createdByEmail?: string;
  datePosted?: string;
  description?: string;
  experienceLevel?: string;
  id?: string;
  jobType?: string;
  location?: JsonNode;
  qualifications?: JsonNode;
  remote?: string;
  responsibilities?: JsonNode;
  salary?: string;
  skills?: JsonNode;
  status?: 'DRAFT' | 'OPEN' | 'CLOSED' | 'ARCHIVED';
  title?: string;
  updatedAt?: string;
}
