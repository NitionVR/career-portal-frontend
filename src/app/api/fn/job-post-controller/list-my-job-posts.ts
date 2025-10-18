/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Pageable } from '../../models/pageable';
import { PageJobPostResponse } from '../../models/page-job-post-response';

export interface ListMyJobPosts$Params {
  pageable: Pageable;
}

export function listMyJobPosts(http: HttpClient, rootUrl: string, params: ListMyJobPosts$Params, context?: HttpContext): Observable<StrictHttpResponse<PageJobPostResponse>> {
  const rb = new RequestBuilder(rootUrl, listMyJobPosts.PATH, 'get');
  if (params) {
    rb.query('pageable', params.pageable, {});
  }

  return http.request(
    rb.build({ responseType: 'blob', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<PageJobPostResponse>;
    })
  );
}

listMyJobPosts.PATH = '/api/job-posts/my-posts';
