/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { RecruiterInvitationRequest } from '../../models/recruiter-invitation-request';

export interface InviteRecruiterBulk$Params {
      body: Array<RecruiterInvitationRequest>
}

export function inviteRecruiterBulk(http: HttpClient, rootUrl: string, params: InviteRecruiterBulk$Params, context?: HttpContext): Observable<StrictHttpResponse<{
[key: string]: string;
}>> {
  const rb = new RequestBuilder(rootUrl, inviteRecruiterBulk.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'blob', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<{
      [key: string]: string;
      }>;
    })
  );
}

inviteRecruiterBulk.PATH = '/api/invitations/bulk-recruiter';
