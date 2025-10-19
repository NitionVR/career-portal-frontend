/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { ApplicationDetailsDto } from '../models/application-details-dto';
import { ApplicationSummaryDto } from '../models/application-summary-dto';
import { applyForJob } from '../fn/job-application-controller/apply-for-job';
import { ApplyForJob$Params } from '../fn/job-application-controller/apply-for-job';
import { getApplicationDetails } from '../fn/job-application-controller/get-application-details';
import { GetApplicationDetails$Params } from '../fn/job-application-controller/get-application-details';
import { getApplicationsForJob } from '../fn/job-application-controller/get-applications-for-job';
import { GetApplicationsForJob$Params } from '../fn/job-application-controller/get-applications-for-job';
import { getMyApplications } from '../fn/job-application-controller/get-my-applications';
import { GetMyApplications$Params } from '../fn/job-application-controller/get-my-applications';
import { PageApplicationSummaryDto } from '../models/page-application-summary-dto';
import { PageEmployerApplicationSummaryDto } from '../models/page-employer-application-summary-dto';
import { withdrawApplication } from '../fn/job-application-controller/withdraw-application';
import { WithdrawApplication$Params } from '../fn/job-application-controller/withdraw-application';

@Injectable({ providedIn: 'root' })
export class JobApplicationControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `applyForJob()` */
  static readonly ApplyForJobPath = '/api/job-posts/{id}/apply';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `applyForJob()` instead.
   *
   * This method doesn't expect any request body.
   */
  applyForJob$Response(params: ApplyForJob$Params, context?: HttpContext): Observable<StrictHttpResponse<ApplicationSummaryDto>> {
    return applyForJob(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `applyForJob$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  applyForJob(params: ApplyForJob$Params, context?: HttpContext): Observable<ApplicationSummaryDto> {
    return this.applyForJob$Response(params, context).pipe(
      map((r: StrictHttpResponse<ApplicationSummaryDto>): ApplicationSummaryDto => r.body)
    );
  }

  /** Path part for operation `getApplicationsForJob()` */
  static readonly GetApplicationsForJobPath = '/api/job-posts/{jobId}/applications';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getApplicationsForJob()` instead.
   *
   * This method doesn't expect any request body.
   */
  getApplicationsForJob$Response(params: GetApplicationsForJob$Params, context?: HttpContext): Observable<StrictHttpResponse<PageEmployerApplicationSummaryDto>> {
    return getApplicationsForJob(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getApplicationsForJob$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getApplicationsForJob(params: GetApplicationsForJob$Params, context?: HttpContext): Observable<PageEmployerApplicationSummaryDto> {
    return this.getApplicationsForJob$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageEmployerApplicationSummaryDto>): PageEmployerApplicationSummaryDto => r.body)
    );
  }

  /** Path part for operation `getApplicationDetails()` */
  static readonly GetApplicationDetailsPath = '/api/applications/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getApplicationDetails()` instead.
   *
   * This method doesn't expect any request body.
   */
  getApplicationDetails$Response(params: GetApplicationDetails$Params, context?: HttpContext): Observable<StrictHttpResponse<ApplicationDetailsDto>> {
    return getApplicationDetails(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getApplicationDetails$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getApplicationDetails(params: GetApplicationDetails$Params, context?: HttpContext): Observable<ApplicationDetailsDto> {
    return this.getApplicationDetails$Response(params, context).pipe(
      map((r: StrictHttpResponse<ApplicationDetailsDto>): ApplicationDetailsDto => r.body)
    );
  }

  /** Path part for operation `withdrawApplication()` */
  static readonly WithdrawApplicationPath = '/api/applications/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `withdrawApplication()` instead.
   *
   * This method doesn't expect any request body.
   */
  withdrawApplication$Response(params: WithdrawApplication$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return withdrawApplication(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `withdrawApplication$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  withdrawApplication(params: WithdrawApplication$Params, context?: HttpContext): Observable<void> {
    return this.withdrawApplication$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `getMyApplications()` */
  static readonly GetMyApplicationsPath = '/api/applications/me';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getMyApplications()` instead.
   *
   * This method doesn't expect any request body.
   */
  getMyApplications$Response(params: GetMyApplications$Params, context?: HttpContext): Observable<StrictHttpResponse<PageApplicationSummaryDto>> {
    return getMyApplications(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getMyApplications$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getMyApplications(params: GetMyApplications$Params, context?: HttpContext): Observable<PageApplicationSummaryDto> {
    return this.getMyApplications$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageApplicationSummaryDto>): PageApplicationSummaryDto => r.body)
    );
  }

}
