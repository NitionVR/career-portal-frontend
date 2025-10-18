/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { triggerWorkflow } from '../fn/workflow-controller/trigger-workflow';
import { TriggerWorkflow$Params } from '../fn/workflow-controller/trigger-workflow';
import { WorkflowTriggerResponse } from '../models/workflow-trigger-response';

@Injectable({ providedIn: 'root' })
export class WorkflowControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `triggerWorkflow()` */
  static readonly TriggerWorkflowPath = '/api/v1/workflows/{workflowId}/trigger';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `triggerWorkflow()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  triggerWorkflow$Response(params: TriggerWorkflow$Params, context?: HttpContext): Observable<StrictHttpResponse<WorkflowTriggerResponse>> {
    return triggerWorkflow(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `triggerWorkflow$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  triggerWorkflow(params: TriggerWorkflow$Params, context?: HttpContext): Observable<WorkflowTriggerResponse> {
    return this.triggerWorkflow$Response(params, context).pipe(
      map((r: StrictHttpResponse<WorkflowTriggerResponse>): WorkflowTriggerResponse => r.body)
    );
  }

}
