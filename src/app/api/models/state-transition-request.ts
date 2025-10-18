/* tslint:disable */
/* eslint-disable */
export interface StateTransitionRequest {
  reason?: string;
  targetStatus: 'DRAFT' | 'OPEN' | 'CLOSED' | 'ARCHIVED';
}
