/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { completeProfile } from '../fn/profile-controller/complete-profile';
import { CompleteProfile$Params } from '../fn/profile-controller/complete-profile';
import { updateProfile } from '../fn/profile-controller/update-profile';
import { UpdateProfile$Params } from '../fn/profile-controller/update-profile';
import { VerifyTokenResponse } from '../models/verify-token-response';

@Injectable({ providedIn: 'root' })
export class ProfileControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `updateProfile()` */
  static readonly UpdateProfilePath = '/api/profile/update';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateProfile()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateProfile$Response(params: UpdateProfile$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return updateProfile(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateProfile$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateProfile(params: UpdateProfile$Params, context?: HttpContext): Observable<void> {
    return this.updateProfile$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `completeProfile()` */
  static readonly CompleteProfilePath = '/api/profile/complete';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `completeProfile()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  completeProfile$Response(params: CompleteProfile$Params, context?: HttpContext): Observable<StrictHttpResponse<VerifyTokenResponse>> {
    return completeProfile(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `completeProfile$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  completeProfile(params: CompleteProfile$Params, context?: HttpContext): Observable<VerifyTokenResponse> {
    return this.completeProfile$Response(params, context).pipe(
      map((r: StrictHttpResponse<VerifyTokenResponse>): VerifyTokenResponse => r.body)
    );
  }

}
