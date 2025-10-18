/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { checkSession } from '../fn/authentication-controller/check-session';
import { CheckSession$Params } from '../fn/authentication-controller/check-session';
import { login } from '../fn/authentication-controller/login';
import { Login$Params } from '../fn/authentication-controller/login';
import { logout } from '../fn/authentication-controller/logout';
import { Logout$Params } from '../fn/authentication-controller/logout';
import { refreshToken } from '../fn/authentication-controller/refresh-token';
import { RefreshToken$Params } from '../fn/authentication-controller/refresh-token';
import { SessionResponse } from '../models/session-response';
import { verifyToken } from '../fn/authentication-controller/verify-token';
import { VerifyToken$Params } from '../fn/authentication-controller/verify-token';
import { VerifyTokenResponse } from '../models/verify-token-response';

@Injectable({ providedIn: 'root' })
export class AuthenticationControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `refreshToken()` */
  static readonly RefreshTokenPath = '/api/auth/refresh';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `refreshToken()` instead.
   *
   * This method doesn't expect any request body.
   */
  refreshToken$Response(params: RefreshToken$Params, context?: HttpContext): Observable<StrictHttpResponse<{
[key: string]: any;
}>> {
    return refreshToken(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `refreshToken$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  refreshToken(params: RefreshToken$Params, context?: HttpContext): Observable<{
[key: string]: any;
}> {
    return this.refreshToken$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
[key: string]: any;
}>): {
[key: string]: any;
} => r.body)
    );
  }

  /** Path part for operation `logout()` */
  static readonly LogoutPath = '/api/auth/logout';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `logout()` instead.
   *
   * This method doesn't expect any request body.
   */
  logout$Response(params?: Logout$Params, context?: HttpContext): Observable<StrictHttpResponse<{
[key: string]: string;
}>> {
    return logout(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `logout$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  logout(params?: Logout$Params, context?: HttpContext): Observable<{
[key: string]: string;
}> {
    return this.logout$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
[key: string]: string;
}>): {
[key: string]: string;
} => r.body)
    );
  }

  /** Path part for operation `login()` */
  static readonly LoginPath = '/api/auth/login';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `login()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  login$Response(params: Login$Params, context?: HttpContext): Observable<StrictHttpResponse<{
[key: string]: string;
}>> {
    return login(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `login$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  login(params: Login$Params, context?: HttpContext): Observable<{
[key: string]: string;
}> {
    return this.login$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
[key: string]: string;
}>): {
[key: string]: string;
} => r.body)
    );
  }

  /** Path part for operation `verifyToken()` */
  static readonly VerifyTokenPath = '/api/auth/verify';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `verifyToken()` instead.
   *
   * This method doesn't expect any request body.
   */
  verifyToken$Response(params: VerifyToken$Params, context?: HttpContext): Observable<StrictHttpResponse<VerifyTokenResponse>> {
    return verifyToken(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `verifyToken$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  verifyToken(params: VerifyToken$Params, context?: HttpContext): Observable<VerifyTokenResponse> {
    return this.verifyToken$Response(params, context).pipe(
      map((r: StrictHttpResponse<VerifyTokenResponse>): VerifyTokenResponse => r.body)
    );
  }

  /** Path part for operation `checkSession()` */
  static readonly CheckSessionPath = '/api/auth/session';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `checkSession()` instead.
   *
   * This method doesn't expect any request body.
   */
  checkSession$Response(params?: CheckSession$Params, context?: HttpContext): Observable<StrictHttpResponse<SessionResponse>> {
    return checkSession(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `checkSession$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  checkSession(params?: CheckSession$Params, context?: HttpContext): Observable<SessionResponse> {
    return this.checkSession$Response(params, context).pipe(
      map((r: StrictHttpResponse<SessionResponse>): SessionResponse => r.body)
    );
  }

}
