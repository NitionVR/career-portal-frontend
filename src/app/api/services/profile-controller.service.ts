/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { addResumeToProfile } from '../fn/profile-controller/add-resume-to-profile';
import { AddResumeToProfile$Params } from '../fn/profile-controller/add-resume-to-profile';
import { completeProfile } from '../fn/profile-controller/complete-profile';
import { CompleteProfile$Params } from '../fn/profile-controller/complete-profile';
import { deleteAvatar } from '../fn/profile-controller/delete-avatar';
import { DeleteAvatar$Params } from '../fn/profile-controller/delete-avatar';
import { deleteResume } from '../fn/profile-controller/delete-resume';
import { DeleteResume$Params } from '../fn/profile-controller/delete-resume';
import { getAvatarUploadUrl } from '../fn/profile-controller/get-avatar-upload-url';
import { GetAvatarUploadUrl$Params } from '../fn/profile-controller/get-avatar-upload-url';
import { getCurrentUserProfile } from '../fn/profile-controller/get-current-user-profile';
import { GetCurrentUserProfile$Params } from '../fn/profile-controller/get-current-user-profile';
import { getResumes } from '../fn/profile-controller/get-resumes';
import { GetResumes$Params } from '../fn/profile-controller/get-resumes';
import { getResumeUploadUrl } from '../fn/profile-controller/get-resume-upload-url';
import { GetResumeUploadUrl$Params } from '../fn/profile-controller/get-resume-upload-url';
import { JsonNode } from '../models/json-node';
import { ResumeDto } from '../models/resume-dto';
import { autofillResume } from '../fn/profile-controller/autofill-resume';
import { AutofillResume$Params } from '../fn/profile-controller/autofill-resume';
import { updateAvatar } from '../fn/profile-controller/update-avatar';
import { UpdateAvatar$Params } from '../fn/profile-controller/update-avatar';
import { updateFullProfile } from '../fn/profile-controller/update-full-profile';
import { UpdateFullProfile$Params } from '../fn/profile-controller/update-full-profile';
import { updateProfile } from '../fn/profile-controller/update-profile';
import { UpdateProfile$Params } from '../fn/profile-controller/update-profile';
import { UploadUrlResponse } from '../models/upload-url-response';
import { UserDto } from '../models/user-dto';
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

  /** Path part for operation `getCurrentUserProfile()` */
  static readonly GetCurrentUserProfilePath = '/api/profile/me';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getCurrentUserProfile()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCurrentUserProfile$Response(params?: GetCurrentUserProfile$Params, context?: HttpContext): Observable<StrictHttpResponse<JsonNode>> {
    return getCurrentUserProfile(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getCurrentUserProfile$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCurrentUserProfile(params?: GetCurrentUserProfile$Params, context?: HttpContext): Observable<JsonNode> {
    return this.getCurrentUserProfile$Response(params, context).pipe(
      map((r: StrictHttpResponse<JsonNode>): JsonNode => r.body)
    );
  }

  /** Path part for operation `updateFullProfile()` */
  static readonly UpdateFullProfilePath = '/api/profile/me';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateFullProfile()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateFullProfile$Response(params: UpdateFullProfile$Params, context?: HttpContext): Observable<StrictHttpResponse<JsonNode>> {
    return updateFullProfile(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateFullProfile$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateFullProfile(params: UpdateFullProfile$Params, context?: HttpContext): Observable<JsonNode> {
    return this.updateFullProfile$Response(params, context).pipe(
      map((r: StrictHttpResponse<JsonNode>): JsonNode => r.body)
    );
  }

  /** Path part for operation `updateAvatar()` */
  static readonly UpdateAvatarPath = '/api/profile/me/avatar';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateAvatar()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateAvatar$Response(params: UpdateAvatar$Params, context?: HttpContext): Observable<StrictHttpResponse<UserDto>> {
    return updateAvatar(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateAvatar$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateAvatar(params: UpdateAvatar$Params, context?: HttpContext): Observable<UserDto> {
    return this.updateAvatar$Response(params, context).pipe(
      map((r: StrictHttpResponse<UserDto>): UserDto => r.body)
    );
  }

  /** Path part for operation `deleteAvatar()` */
  static readonly DeleteAvatarPath = '/api/profile/me/avatar';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteAvatar()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteAvatar$Response(params?: DeleteAvatar$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return deleteAvatar(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteAvatar$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteAvatar(params?: DeleteAvatar$Params, context?: HttpContext): Observable<void> {
    return this.deleteAvatar$Response(params, context).pipe(
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

  /** Path part for operation `getResumes()` */
  static readonly GetResumesPath = '/api/profile/me/resumes';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getResumes()` instead.
   *
   * This method doesn't expect any request body.
   */
  getResumes$Response(params?: GetResumes$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<ResumeDto>>> {
    return getResumes(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getResumes$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getResumes(params?: GetResumes$Params, context?: HttpContext): Observable<Array<ResumeDto>> {
    return this.getResumes$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<ResumeDto>>): Array<ResumeDto> => r.body)
    );
  }

  /** Path part for operation `addResumeToProfile()` */
  static readonly AddResumeToProfilePath = '/api/profile/me/resumes';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addResumeToProfile()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addResumeToProfile$Response(params: AddResumeToProfile$Params, context?: HttpContext): Observable<StrictHttpResponse<ResumeDto>> {
    return addResumeToProfile(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `addResumeToProfile$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addResumeToProfile(params: AddResumeToProfile$Params, context?: HttpContext): Observable<ResumeDto> {
    return this.addResumeToProfile$Response(params, context).pipe(
      map((r: StrictHttpResponse<ResumeDto>): ResumeDto => r.body)
    );
  }

  /** Path part for operation `getResumeUploadUrl()` */
  static readonly GetResumeUploadUrlPath = '/api/profile/me/resumes/upload-url';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getResumeUploadUrl()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  getResumeUploadUrl$Response(params: GetResumeUploadUrl$Params, context?: HttpContext): Observable<StrictHttpResponse<UploadUrlResponse>> {
    return getResumeUploadUrl(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getResumeUploadUrl$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  getResumeUploadUrl(params: GetResumeUploadUrl$Params, context?: HttpContext): Observable<UploadUrlResponse> {
    return this.getResumeUploadUrl$Response(params, context).pipe(
      map((r: StrictHttpResponse<UploadUrlResponse>): UploadUrlResponse => r.body)
    );
  }

  /** Path part for operation `getAvatarUploadUrl()` */
  static readonly GetAvatarUploadUrlPath = '/api/profile/me/avatar/upload-url';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAvatarUploadUrl()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  getAvatarUploadUrl$Response(params: GetAvatarUploadUrl$Params, context?: HttpContext): Observable<StrictHttpResponse<UploadUrlResponse>> {
    return getAvatarUploadUrl(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAvatarUploadUrl$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  getAvatarUploadUrl(params: GetAvatarUploadUrl$Params, context?: HttpContext): Observable<UploadUrlResponse> {
    return this.getAvatarUploadUrl$Response(params, context).pipe(
      map((r: StrictHttpResponse<UploadUrlResponse>): UploadUrlResponse => r.body)
    );
  }

  /** Path part for operation `deleteResume()` */
  static readonly DeleteResumePath = '/api/profile/me/resumes/{resumeId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteResume()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteResume$Response(params: DeleteResume$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return deleteResume(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteResume$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteResume(params: DeleteResume$Params, context?: HttpContext): Observable<void> {
    return this.deleteResume$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  static readonly AutofillResumePath = '/api/profile/me/autofill-resume';

  autofillResume$Response(params: AutofillResume$Params, context?: HttpContext): Observable<StrictHttpResponse<JsonNode>> {
    return autofillResume(this.http, this.rootUrl, params, context);
  }

  autofillResume(params: AutofillResume$Params, context?: HttpContext): Observable<JsonNode> {
    return this.autofillResume$Response(params, context).pipe(
      map((r: StrictHttpResponse<JsonNode>): JsonNode => r.body)
    );
  }
}
