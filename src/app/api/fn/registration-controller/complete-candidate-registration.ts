/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { CandidateRegistrationRequest } from '../../models/candidate-registration-request';
import { VerifyTokenResponse } from '../../models/verify-token-response';

export interface CompleteCandidateRegistration$Params {
  token: string;
      body: CandidateRegistrationRequest
}

export function completeCandidateRegistration(http: HttpClient, rootUrl: string, params: CompleteCandidateRegistration$Params, context?: HttpContext): Observable<StrictHttpResponse<VerifyTokenResponse>> {
  const rb = new RequestBuilder(rootUrl, completeCandidateRegistration.PATH, 'post');
  if (params) {
    rb.query('token', params.token, {});
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'blob', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<VerifyTokenResponse>;
    })
  );
}

completeCandidateRegistration.PATH = '/api/register/candidate';
