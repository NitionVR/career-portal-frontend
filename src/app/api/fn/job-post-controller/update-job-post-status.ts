/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { JobPostResponse } from '../../models/job-post-response';

export interface UpdateJobPostStatus$Params {
  id: string;
  status: string;
}

export function updateJobPostStatus(http: HttpClient, rootUrl: string, params: UpdateJobPostStatus$Params, context?: HttpContext): Observable<StrictHttpResponse<JobPostResponse>> {
  const rb = new RequestBuilder(rootUrl, updateJobPostStatus.PATH, 'patch');
  if (params) {
    rb.path('id', params.id, {});
    rb.query('status', params.status, {});
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

updateJobPostStatus.PATH = '/api/job-posts/{id}/status';
