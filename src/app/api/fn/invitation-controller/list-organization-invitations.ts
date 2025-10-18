/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Pageable } from '../../models/pageable';
import { PageRecruiterInvitationDto } from '../../models/page-recruiter-invitation-dto';

export interface ListOrganizationInvitations$Params {
  pageable: Pageable;
}

export function listOrganizationInvitations(http: HttpClient, rootUrl: string, params: ListOrganizationInvitations$Params, context?: HttpContext): Observable<StrictHttpResponse<PageRecruiterInvitationDto>> {
  const rb = new RequestBuilder(rootUrl, listOrganizationInvitations.PATH, 'get');
  if (params) {
    rb.query('pageable', params.pageable, {});
  }

  return http.request(
    rb.build({ responseType: 'blob', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<PageRecruiterInvitationDto>;
    })
  );
}

listOrganizationInvitations.PATH = '/api/invitations';
