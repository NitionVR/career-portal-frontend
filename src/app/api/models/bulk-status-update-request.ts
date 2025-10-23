/* tslint:disable */
/* eslint-disable */
export interface BulkStatusUpdateRequest {
  applicationIds: Array<string>;
  note?: string;
  sendNotification?: boolean;
  targetStatus: 'APPLIED' | 'UNDER_REVIEW' | 'INTERVIEW_SCHEDULED' | 'OFFER_EXTENDED' | 'HIRED' | 'REJECTED' | 'WITHDRAWN';
}
