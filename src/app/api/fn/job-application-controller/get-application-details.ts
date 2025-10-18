/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { ApplicationDetailsDto } from '../../models/application-details-dto';

export interface GetApplicationDetails$Params {
  id: string;
}

export function getApplicationDetails(http: HttpClient, rootUrl: string, params: GetApplicationDetails$Params, context?: HttpContext): Observable<StrictHttpResponse<ApplicationDetailsDto>> {
  const rb = new RequestBuilder(rootUrl, getApplicationDetails.PATH, 'get');
  if (params) {
    rb.path('id', params.id, {});
  }

  return http.request(
    rb.build({ responseType: 'blob', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<ApplicationDetailsDto>;
    })
  );
}

getApplicationDetails.PATH = '/api/applications/{id}';
