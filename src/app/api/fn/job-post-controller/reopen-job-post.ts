/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { JobPostResponse } from '../../models/job-post-response';

export interface ReopenJobPost$Params {
  id: string;
  reason?: string;
}

export function reopenJobPost(http: HttpClient, rootUrl: string, params: ReopenJobPost$Params, context?: HttpContext): Observable<StrictHttpResponse<JobPostResponse>> {
  const rb = new RequestBuilder(rootUrl, reopenJobPost.PATH, 'patch');
  if (params) {
    rb.path('id', params.id, {});
    rb.query('reason', params.reason, {});
  }

  return http.request(
    rb.build({ responseType: 'blob', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<JobPostResponse>;
    })
  );
}

reopenJobPost.PATH = '/api/job-posts/{id}/reopen';
