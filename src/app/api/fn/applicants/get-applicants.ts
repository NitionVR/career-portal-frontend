/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Pageable } from '../../models/pageable';
import { PageApplicantSummaryDto } from '../../models/page-applicant-summary-dto';

export interface GetApplicants$Params {

/**
 * Pagination parameters (page, size, sort)
 */
  pageable: Pageable;

/**
 * General search term (candidate name or job title)
 */
  search?: string;

/**
 * Search term for candidate skills
 */
  skillSearch?: string;

/**
 * Filter by specific job post ID
 */
  jobId?: string;

/**
 * Filter by application statuses
 */
  statuses?: Array<string>;

/**
 * Minimum years of experience
 */
  experienceMin?: number;

/**
 * Filter by education levels (OR logic)
 */
  education?: Array<string>;

/**
 * Filter by location
 */
  location?: string;

/**
 * Minimum AI match score (future feature)
 */
  aiMatchScoreMin?: number;
}

export function getApplicants(http: HttpClient, rootUrl: string, params: GetApplicants$Params, context?: HttpContext): Observable<StrictHttpResponse<PageApplicantSummaryDto>> {
  const rb = new RequestBuilder(rootUrl, getApplicants.PATH, 'get');
  if (params) {
    rb.query('pageable', params.pageable, {});
    rb.query('search', params.search, {});
    rb.query('skillSearch', params.skillSearch, {});
    rb.query('jobId', params.jobId, {});
    rb.query('statuses', params.statuses, {});
    rb.query('experienceMin', params.experienceMin, {});
    rb.query('education', params.education, {});
    rb.query('location', params.location, {});
    rb.query('aiMatchScoreMin', params.aiMatchScoreMin, {});
  }

  return http.request(
    rb.build({ responseType: 'blob', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<PageApplicantSummaryDto>;
    })
  );
}

getApplicants.PATH = '/api/applicants';
