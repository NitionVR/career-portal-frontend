/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { JsonNode } from '../../models/json-node';

export interface UpdateFullProfile$Params {
      body: JsonNode
}

export function updateFullProfile(http: HttpClient, rootUrl: string, params: UpdateFullProfile$Params, context?: HttpContext): Observable<StrictHttpResponse<JsonNode>> {
  const rb = new RequestBuilder(rootUrl, updateFullProfile.PATH, 'put');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'blob', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<JsonNode>;
    })
  );
}

updateFullProfile.PATH = '/api/profile/me';
