/* tslint:disable */
/* eslint-disable */
export interface NotificationResponse {
  content?: string;
  createdAt?: string;
  id?: number;
  metadata?: {
[key: string]: any;
};
  readAt?: string;
  recipientId?: string;
  status?: 'PENDING' | 'SENT' | 'DELIVERED' | 'READ' | 'FAILED';
  title?: string;
  type?: string;
}
