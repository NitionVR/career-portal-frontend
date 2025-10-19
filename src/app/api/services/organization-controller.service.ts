/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { deleteLogo } from '../fn/organization-controller/delete-logo';
import { DeleteLogo$Params } from '../fn/organization-controller/delete-logo';
import { getCurrentOrganization } from '../fn/organization-controller/get-current-organization';
import { GetCurrentOrganization$Params } from '../fn/organization-controller/get-current-organization';
import { getLogoUploadUrl } from '../fn/organization-controller/get-logo-upload-url';
import { GetLogoUploadUrl$Params } from '../fn/organization-controller/get-logo-upload-url';
import { OrganizationDto } from '../models/organization-dto';
import { updateLogo } from '../fn/organization-controller/update-logo';
import { UpdateLogo$Params } from '../fn/organization-controller/update-logo';
import { UploadUrlResponse } from '../models/upload-url-response';

@Injectable({ providedIn: 'root' })
export class OrganizationControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `updateLogo()` */
  static readonly UpdateLogoPath = '/api/organization/logo';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateLogo()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateLogo$Response(params: UpdateLogo$Params, context?: HttpContext): Observable<StrictHttpResponse<OrganizationDto>> {
    return updateLogo(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateLogo$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateLogo(params: UpdateLogo$Params, context?: HttpContext): Observable<OrganizationDto> {
    return this.updateLogo$Response(params, context).pipe(
      map((r: StrictHttpResponse<OrganizationDto>): OrganizationDto => r.body)
    );
  }

  /** Path part for operation `deleteLogo()` */
  static readonly DeleteLogoPath = '/api/organization/logo';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteLogo()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteLogo$Response(params?: DeleteLogo$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return deleteLogo(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteLogo$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteLogo(params?: DeleteLogo$Params, context?: HttpContext): Observable<void> {
    return this.deleteLogo$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `getLogoUploadUrl()` */
  static readonly GetLogoUploadUrlPath = '/api/organization/logo/upload-url';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getLogoUploadUrl()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  getLogoUploadUrl$Response(params: GetLogoUploadUrl$Params, context?: HttpContext): Observable<StrictHttpResponse<UploadUrlResponse>> {
    return getLogoUploadUrl(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getLogoUploadUrl$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  getLogoUploadUrl(params: GetLogoUploadUrl$Params, context?: HttpContext): Observable<UploadUrlResponse> {
    return this.getLogoUploadUrl$Response(params, context).pipe(
      map((r: StrictHttpResponse<UploadUrlResponse>): UploadUrlResponse => r.body)
    );
  }

  /** Path part for operation `getCurrentOrganization()` */
  static readonly GetCurrentOrganizationPath = '/api/organization/me';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getCurrentOrganization()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCurrentOrganization$Response(params?: GetCurrentOrganization$Params, context?: HttpContext): Observable<StrictHttpResponse<OrganizationDto>> {
    return getCurrentOrganization(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getCurrentOrganization$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCurrentOrganization(params?: GetCurrentOrganization$Params, context?: HttpContext): Observable<OrganizationDto> {
    return this.getCurrentOrganization$Response(params, context).pipe(
      map((r: StrictHttpResponse<OrganizationDto>): OrganizationDto => r.body)
    );
  }

}
