/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { acceptInvitation } from '../fn/invitation-controller/accept-invitation';
import { AcceptInvitation$Params } from '../fn/invitation-controller/accept-invitation';
import { inviteRecruiter } from '../fn/invitation-controller/invite-recruiter';
import { InviteRecruiter$Params } from '../fn/invitation-controller/invite-recruiter';
import { inviteRecruiterBulk } from '../fn/invitation-controller/invite-recruiter-bulk';
import { InviteRecruiterBulk$Params } from '../fn/invitation-controller/invite-recruiter-bulk';
import { listOrganizationInvitations } from '../fn/invitation-controller/list-organization-invitations';
import { ListOrganizationInvitations$Params } from '../fn/invitation-controller/list-organization-invitations';
import { PageRecruiterInvitationDto } from '../models/page-recruiter-invitation-dto';
import { RecruiterInvitationDto } from '../models/recruiter-invitation-dto';
import { resendInvitation } from '../fn/invitation-controller/resend-invitation';
import { ResendInvitation$Params } from '../fn/invitation-controller/resend-invitation';
import { revokeInvitation } from '../fn/invitation-controller/revoke-invitation';
import { RevokeInvitation$Params } from '../fn/invitation-controller/revoke-invitation';
import { validateInvitation } from '../fn/invitation-controller/validate-invitation';
import { ValidateInvitation$Params } from '../fn/invitation-controller/validate-invitation';

@Injectable({ providedIn: 'root' })
export class InvitationControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `resendInvitation()` */
  static readonly ResendInvitationPath = '/api/invitations/{invitationId}/resend';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `resendInvitation()` instead.
   *
   * This method doesn't expect any request body.
   */
  resendInvitation$Response(params: ResendInvitation$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return resendInvitation(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `resendInvitation$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  resendInvitation(params: ResendInvitation$Params, context?: HttpContext): Observable<void> {
    return this.resendInvitation$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `inviteRecruiter()` */
  static readonly InviteRecruiterPath = '/api/invitations/recruiter';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `inviteRecruiter()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  inviteRecruiter$Response(params: InviteRecruiter$Params, context?: HttpContext): Observable<StrictHttpResponse<RecruiterInvitationDto>> {
    return inviteRecruiter(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `inviteRecruiter$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  inviteRecruiter(params: InviteRecruiter$Params, context?: HttpContext): Observable<RecruiterInvitationDto> {
    return this.inviteRecruiter$Response(params, context).pipe(
      map((r: StrictHttpResponse<RecruiterInvitationDto>): RecruiterInvitationDto => r.body)
    );
  }

  /** Path part for operation `inviteRecruiterBulk()` */
  static readonly InviteRecruiterBulkPath = '/api/invitations/bulk-recruiter';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `inviteRecruiterBulk()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  inviteRecruiterBulk$Response(params: InviteRecruiterBulk$Params, context?: HttpContext): Observable<StrictHttpResponse<{
[key: string]: string;
}>> {
    return inviteRecruiterBulk(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `inviteRecruiterBulk$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  inviteRecruiterBulk(params: InviteRecruiterBulk$Params, context?: HttpContext): Observable<{
[key: string]: string;
}> {
    return this.inviteRecruiterBulk$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
[key: string]: string;
}>): {
[key: string]: string;
} => r.body)
    );
  }

  /** Path part for operation `acceptInvitation()` */
  static readonly AcceptInvitationPath = '/api/invitations/accept/{token}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `acceptInvitation()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  acceptInvitation$Response(params: AcceptInvitation$Params, context?: HttpContext): Observable<StrictHttpResponse<{
[key: string]: string;
}>> {
    return acceptInvitation(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `acceptInvitation$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  acceptInvitation(params: AcceptInvitation$Params, context?: HttpContext): Observable<{
[key: string]: string;
}> {
    return this.acceptInvitation$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
[key: string]: string;
}>): {
[key: string]: string;
} => r.body)
    );
  }

  /** Path part for operation `revokeInvitation()` */
  static readonly RevokeInvitationPath = '/api/invitations/{invitationId}/revoke';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `revokeInvitation()` instead.
   *
   * This method doesn't expect any request body.
   */
  revokeInvitation$Response(params: RevokeInvitation$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return revokeInvitation(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `revokeInvitation$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  revokeInvitation(params: RevokeInvitation$Params, context?: HttpContext): Observable<void> {
    return this.revokeInvitation$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `listOrganizationInvitations()` */
  static readonly ListOrganizationInvitationsPath = '/api/invitations';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `listOrganizationInvitations()` instead.
   *
   * This method doesn't expect any request body.
   */
  listOrganizationInvitations$Response(params: ListOrganizationInvitations$Params, context?: HttpContext): Observable<StrictHttpResponse<PageRecruiterInvitationDto>> {
    return listOrganizationInvitations(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `listOrganizationInvitations$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  listOrganizationInvitations(params: ListOrganizationInvitations$Params, context?: HttpContext): Observable<PageRecruiterInvitationDto> {
    return this.listOrganizationInvitations$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageRecruiterInvitationDto>): PageRecruiterInvitationDto => r.body)
    );
  }

  /** Path part for operation `validateInvitation()` */
  static readonly ValidateInvitationPath = '/api/invitations/validate/{token}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `validateInvitation()` instead.
   *
   * This method doesn't expect any request body.
   */
  validateInvitation$Response(params: ValidateInvitation$Params, context?: HttpContext): Observable<StrictHttpResponse<{
[key: string]: any;
}>> {
    return validateInvitation(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `validateInvitation$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  validateInvitation(params: ValidateInvitation$Params, context?: HttpContext): Observable<{
[key: string]: any;
}> {
    return this.validateInvitation$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
[key: string]: any;
}>): {
[key: string]: any;
} => r.body)
    );
  }

}
