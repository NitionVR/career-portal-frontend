/* tslint:disable */
/* eslint-disable */
export interface NotificationRequest {
  content: string;
  metadata?: {
[key: string]: any;
};
  recipientId: string;
  title: string;
  type: string;
}
