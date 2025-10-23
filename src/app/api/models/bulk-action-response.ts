/* tslint:disable */
/* eslint-disable */
import { BulkActionError } from '../models/bulk-action-error';
export interface BulkActionResponse {
  errors?: Array<BulkActionError>;
  failureCount?: number;
  processedAt?: string;
  successCount?: number;
  totalRequested?: number;
}
