/* tslint:disable */
/* eslint-disable */
import { UserDto } from '../models/user-dto';
export interface VerifyTokenResponse {
  expiresIn?: number;
  token?: string;
  user?: UserDto;
}
