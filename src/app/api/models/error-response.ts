/* tslint:disable */
/* eslint-disable */
export interface ErrorResponse {
  details?: {
[key: string]: any;
};
  errors?: Array<string>;
  message?: string;
  path?: string;
  status?: number;
  timestamp?: string;
}
