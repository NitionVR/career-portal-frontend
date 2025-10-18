/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';


export interface ValidateInvitation$Params {
  token: string;
}

export function validateInvitation(http: HttpClient, rootUrl: string, params: ValidateInvitation$Params, context?: HttpContext): Observable<StrictHttpResponse<{
[key: string]: any;
}>> {
  const rb = new RequestBuilder(rootUrl, validateInvitation.PATH, 'get');
  if (params) {
    rb.path('token', params.token, {});
  }

  return http.request(
    rb.build({ responseType: 'blob', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<{
      [key: string]: any;
      }>;
    })
  );
}

validateInvitation.PATH = '/api/invitations/validate/{token}';
