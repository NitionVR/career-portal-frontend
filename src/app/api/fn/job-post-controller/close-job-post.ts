/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { JobPostResponse } from '../../models/job-post-response';

export interface CloseJobPost$Params {
  id: string;
  reason?: string;
}

export function closeJobPost(http: HttpClient, rootUrl: string, params: CloseJobPost$Params, context?: HttpContext): Observable<StrictHttpResponse<JobPostResponse>> {
  const rb = new RequestBuilder(rootUrl, closeJobPost.PATH, 'patch');
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

closeJobPost.PATH = '/api/job-posts/{id}/close';
