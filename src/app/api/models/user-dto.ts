/* tslint:disable */
/* eslint-disable */
import { JsonNode } from '../models/json-node';
export interface UserDto {
  awards?: Array<JsonNode>;
  basics?: JsonNode;
  certificates?: Array<JsonNode>;
  education?: Array<JsonNode>;
  email?: string;
  firstName?: string;
  id?: string;
  interests?: Array<JsonNode>;
  isNewUser?: boolean;
  languages?: Array<JsonNode>;
  lastName?: string;
  profileImageUrl?: string;
  projects?: Array<JsonNode>;
  publications?: Array<JsonNode>;
  references?: Array<JsonNode>;
  role?: string;
  skills?: Array<JsonNode>;
  volunteer?: Array<JsonNode>;
  work?: Array<JsonNode>;
}
