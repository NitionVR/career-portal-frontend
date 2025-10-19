/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { OrganizationDto } from '../../models/organization-dto';

export interface GetCurrentOrganization$Params {
}

export function getCurrentOrganization(http: HttpClient, rootUrl: string, params?: GetCurrentOrganization$Params, context?: HttpContext): Observable<StrictHttpResponse<OrganizationDto>> {
  const rb = new RequestBuilder(rootUrl, getCurrentOrganization.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'blob', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<OrganizationDto>;
    })
  );
}

getCurrentOrganization.PATH = '/api/organization/me';
