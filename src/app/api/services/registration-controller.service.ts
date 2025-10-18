/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { completeCandidateRegistration } from '../fn/registration-controller/complete-candidate-registration';
import { CompleteCandidateRegistration$Params } from '../fn/registration-controller/complete-candidate-registration';
import { completeHiringManagerRegistration } from '../fn/registration-controller/complete-hiring-manager-registration';
import { CompleteHiringManagerRegistration$Params } from '../fn/registration-controller/complete-hiring-manager-registration';
import { initiateRegistration } from '../fn/registration-controller/initiate-registration';
import { InitiateRegistration$Params } from '../fn/registration-controller/initiate-registration';
import { validateRegistrationToken } from '../fn/registration-controller/validate-registration-token';
import { ValidateRegistrationToken$Params } from '../fn/registration-controller/validate-registration-token';
import { VerifyTokenResponse } from '../models/verify-token-response';

@Injectable({ providedIn: 'root' })
export class RegistrationControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `initiateRegistration()` */
  static readonly InitiateRegistrationPath = '/api/register';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `initiateRegistration()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  initiateRegistration$Response(params: InitiateRegistration$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return initiateRegistration(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `initiateRegistration$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  initiateRegistration(params: InitiateRegistration$Params, context?: HttpContext): Observable<void> {
    return this.initiateRegistration$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `completeHiringManagerRegistration()` */
  static readonly CompleteHiringManagerRegistrationPath = '/api/register/hiring-manager';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `completeHiringManagerRegistration()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  completeHiringManagerRegistration$Response(params: CompleteHiringManagerRegistration$Params, context?: HttpContext): Observable<StrictHttpResponse<VerifyTokenResponse>> {
    return completeHiringManagerRegistration(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `completeHiringManagerRegistration$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  completeHiringManagerRegistration(params: CompleteHiringManagerRegistration$Params, context?: HttpContext): Observable<VerifyTokenResponse> {
    return this.completeHiringManagerRegistration$Response(params, context).pipe(
      map((r: StrictHttpResponse<VerifyTokenResponse>): VerifyTokenResponse => r.body)
    );
  }

  /** Path part for operation `completeCandidateRegistration()` */
  static readonly CompleteCandidateRegistrationPath = '/api/register/candidate';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `completeCandidateRegistration()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  completeCandidateRegistration$Response(params: CompleteCandidateRegistration$Params, context?: HttpContext): Observable<StrictHttpResponse<VerifyTokenResponse>> {
    return completeCandidateRegistration(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `completeCandidateRegistration$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  completeCandidateRegistration(params: CompleteCandidateRegistration$Params, context?: HttpContext): Observable<VerifyTokenResponse> {
    return this.completeCandidateRegistration$Response(params, context).pipe(
      map((r: StrictHttpResponse<VerifyTokenResponse>): VerifyTokenResponse => r.body)
    );
  }

  /** Path part for operation `validateRegistrationToken()` */
  static readonly ValidateRegistrationTokenPath = '/api/register/validate-token';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `validateRegistrationToken()` instead.
   *
   * This method doesn't expect any request body.
   */
  validateRegistrationToken$Response(params: ValidateRegistrationToken$Params, context?: HttpContext): Observable<StrictHttpResponse<{
[key: string]: any;
}>> {
    return validateRegistrationToken(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `validateRegistrationToken$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  validateRegistrationToken(params: ValidateRegistrationToken$Params, context?: HttpContext): Observable<{
[key: string]: any;
}> {
    return this.validateRegistrationToken$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
[key: string]: any;
}>): {
[key: string]: any;
} => r.body)
    );
  }

}
