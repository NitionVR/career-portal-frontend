/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { ApplicationDetailsDto } from '../../models/application-details-dto';
import { ApplicationTransitionRequest } from '../../models/application-transition-request';

export interface TransitionApplicationStatus$Params {
  applicationId: string;
      body: ApplicationTransitionRequest
}

export function transitionApplicationStatus(http: HttpClient, rootUrl: string, params: TransitionApplicationStatus$Params, context?: HttpContext): Observable<StrictHttpResponse<ApplicationDetailsDto>> {
  const rb = new RequestBuilder(rootUrl, transitionApplicationStatus.PATH, 'post');
  if (params) {
    rb.path('applicationId', params.applicationId, {});
    rb.body(params.body, 'application/json');
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

transitionApplicationStatus.PATH = '/api/applications/{applicationId}/transition';
