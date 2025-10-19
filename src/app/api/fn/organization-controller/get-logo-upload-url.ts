/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { UploadUrlRequest } from '../../models/upload-url-request';
import { UploadUrlResponse } from '../../models/upload-url-response';

export interface GetLogoUploadUrl$Params {
      body: UploadUrlRequest
}

export function getLogoUploadUrl(http: HttpClient, rootUrl: string, params: GetLogoUploadUrl$Params, context?: HttpContext): Observable<StrictHttpResponse<UploadUrlResponse>> {
  const rb = new RequestBuilder(rootUrl, getLogoUploadUrl.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'blob', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<UploadUrlResponse>;
    })
  );
}

getLogoUploadUrl.PATH = '/api/organization/logo/upload-url';
