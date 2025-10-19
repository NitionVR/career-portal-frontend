/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Pageable } from '../../models/pageable';
import { PageEmployerApplicationSummaryDto } from '../../models/page-employer-application-summary-dto';

export interface GetApplicationsForJob$Params {
  jobId: string;
  pageable: Pageable;
}

export function getApplicationsForJob(http: HttpClient, rootUrl: string, params: GetApplicationsForJob$Params, context?: HttpContext): Observable<StrictHttpResponse<PageEmployerApplicationSummaryDto>> {
  const rb = new RequestBuilder(rootUrl, getApplicationsForJob.PATH, 'get');
  if (params) {
    rb.path('jobId', params.jobId, {});
    rb.query('pageable', params.pageable, {});
  }

  return http.request(
    rb.build({ responseType: 'blob', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<PageEmployerApplicationSummaryDto>;
    })
  );
}

getApplicationsForJob.PATH = '/api/job-posts/{jobId}/applications';
