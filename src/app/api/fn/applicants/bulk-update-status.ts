/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { BulkActionResponse } from '../../models/bulk-action-response';
import { BulkStatusUpdateRequest } from '../../models/bulk-status-update-request';

export interface BulkUpdateStatus$Params {
      body: BulkStatusUpdateRequest
}

export function bulkUpdateStatus(http: HttpClient, rootUrl: string, params: BulkUpdateStatus$Params, context?: HttpContext): Observable<StrictHttpResponse<BulkActionResponse>> {
  const rb = new RequestBuilder(rootUrl, bulkUpdateStatus.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'blob', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<BulkActionResponse>;
    })
  );
}

bulkUpdateStatus.PATH = '/api/applicants/bulk-update-status';
