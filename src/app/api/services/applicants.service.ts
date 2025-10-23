/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { getApplicants } from '../fn/applicants/get-applicants';
import { GetApplicants$Params } from '../fn/applicants/get-applicants';
import { PageApplicantSummaryDto } from '../models/page-applicant-summary-dto';


/**
 * Applicant management endpoints for employers
 */
@Injectable({ providedIn: 'root' })
export class ApplicantsService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getApplicants()` */
  static readonly GetApplicantsPath = '/api/applicants';

  /**
   * Get paginated list of applicants.
   *
   * Retrieve a filtered and paginated list of job applicants for the current organization
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getApplicants()` instead.
   *
   * This method doesn't expect any request body.
   */
  getApplicants$Response(params: GetApplicants$Params, context?: HttpContext): Observable<StrictHttpResponse<PageApplicantSummaryDto>> {
    return getApplicants(this.http, this.rootUrl, params, context);
  }

  /**
   * Get paginated list of applicants.
   *
   * Retrieve a filtered and paginated list of job applicants for the current organization
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getApplicants$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getApplicants(params: GetApplicants$Params, context?: HttpContext): Observable<PageApplicantSummaryDto> {
    return this.getApplicants$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageApplicantSummaryDto>): PageApplicantSummaryDto => r.body)
    );
  }

}
