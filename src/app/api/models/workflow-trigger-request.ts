/* tslint:disable */
/* eslint-disable */
export interface WorkflowTriggerRequest {
  email?: string;
  firstName?: string;
  lastName?: string;
  payload: {
[key: string]: any;
};
  subscriberId: string;
}
