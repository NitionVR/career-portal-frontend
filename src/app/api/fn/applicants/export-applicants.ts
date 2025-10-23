/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';


export interface ExportApplicants$Params {
  format?: 'CSV' | 'EXCEL' | 'PDF';
  search?: string;
  skillSearch?: string;
  jobId?: string;
  statuses?: Array<string>;
  experienceMin?: number;
  education?: Array<string>;
  location?: string;
}

export function exportApplicants(http: HttpClient, rootUrl: string, params?: ExportApplicants$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
  const rb = new RequestBuilder(rootUrl, exportApplicants.PATH, 'get');
  if (params) {
    rb.query('format', params.format, {});
    rb.query('search', params.search, {});
    rb.query('skillSearch', params.skillSearch, {});
    rb.query('jobId', params.jobId, {});
    rb.query('statuses', params.statuses, {});
    rb.query('experienceMin', params.experienceMin, {});
    rb.query('education', params.education, {});
    rb.query('location', params.location, {});
  }

  return http.request(
    rb.build({ responseType: 'text', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
    })
  );
}

exportApplicants.PATH = '/api/applicants/export';
