/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { UpdateMemberRoleRequest } from '../../models/update-member-role-request';

export interface UpdateMemberRole$Params {
  memberId: string;
      body: UpdateMemberRoleRequest
}

export function updateMemberRole(http: HttpClient, rootUrl: string, params: UpdateMemberRole$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
  const rb = new RequestBuilder(rootUrl, updateMemberRole.PATH, 'put');
  if (params) {
    rb.path('memberId', params.memberId, {});
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'text', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
    })
  );
}

updateMemberRole.PATH = '/api/organization/members/{memberId}/role';
