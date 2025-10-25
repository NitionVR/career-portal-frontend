/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { JsonNode } from '../../models/json-node';
import { ResumeDto } from '../../models/resume-dto';

export interface AutofillProfileFromResume$Params {
      body: ResumeDto
}

export function autofillProfileFromResume(http: HttpClient, rootUrl: string, params: AutofillProfileFromResume$Params, context?: HttpContext): Observable<StrictHttpResponse<JsonNode>> {
  const rb = new RequestBuilder(rootUrl, autofillProfileFromResume.PATH, 'post');
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

autofillProfileFromResume.PATH = '/api/profile/me/autofill-resume';
