/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Pageable } from '../../models/pageable';
import { PageNotificationResponse } from '../../models/page-notification-response';

export interface GetUserNotifications$Params {
  userId: string;
  pageable: Pageable;
}

export function getUserNotifications(http: HttpClient, rootUrl: string, params: GetUserNotifications$Params, context?: HttpContext): Observable<StrictHttpResponse<PageNotificationResponse>> {
  const rb = new RequestBuilder(rootUrl, getUserNotifications.PATH, 'get');
  if (params) {
    rb.path('userId', params.userId, {});
    rb.query('pageable', params.pageable, {});
  }

  return http.request(
    rb.build({ responseType: 'blob', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<PageNotificationResponse>;
    })
  );
}

getUserNotifications.PATH = '/api/v1/notifications/user/{userId}';
