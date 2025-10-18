/* tslint:disable */
/* eslint-disable */
export interface StateAuditResponse {
  changedAt?: string;
  changedByEmail?: string;
  fromStatus?: 'DRAFT' | 'OPEN' | 'CLOSED' | 'ARCHIVED';
  id?: string;
  reason?: string;
  toStatus?: 'DRAFT' | 'OPEN' | 'CLOSED' | 'ARCHIVED';
}
