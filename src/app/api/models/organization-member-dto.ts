/* tslint:disable */
/* eslint-disable */
export interface OrganizationMemberDto {
  email?: string;
  firstName?: string;
  id?: string;
  joinedDate?: string;
  lastName?: string;
  role?: 'CANDIDATE' | 'RECRUITER' | 'HIRING_MANAGER' | 'ADMIN';
  status?: string;
}
