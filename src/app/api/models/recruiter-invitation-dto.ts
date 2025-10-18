/* tslint:disable */
/* eslint-disable */
export interface RecruiterInvitationDto {
  createdAt?: string;
  email?: string;
  expiresAt?: string;
  id?: string;
  status?: 'PENDING' | 'ACCEPTED' | 'EXPIRED' | 'REVOKED';
}
