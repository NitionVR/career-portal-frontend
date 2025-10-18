/* tslint:disable */
/* eslint-disable */
import { UserDto } from '../models/user-dto';
export interface SessionResponse {
  authenticated?: boolean;
  expiresIn?: number;
  user?: UserDto;
}
