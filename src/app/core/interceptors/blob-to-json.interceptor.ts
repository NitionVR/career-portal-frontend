import { HttpEvent, HttpHandlerFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize, switchMap } from 'rxjs/operators';
import { LoadingService } from '../services/loading.service';
import { inject } from '@angular/core';

export function blobToJsonInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const loadingService = inject(LoadingService);

  // Only intercept requests that are expected to return a blob but should be JSON.
  if (req.responseType !== 'blob') {
    return next(req);
  }

  loadingService.startLoading();

  return next(req).pipe(
    switchMap((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse && event.body instanceof Blob) {
        return new Observable<HttpEvent<any>>(observer => {
          const reader = new FileReader();
          reader.onload = () => {
            try {
              const json = JSON.parse(reader.result as string);
              // Clone the response and replace the blob body with the parsed JSON
              const newResponse = event.clone({ body: json });
              observer.next(newResponse);
              observer.complete();
            } catch (e) {
              // If parsing fails, return the original blob
              observer.next(event);
              observer.complete();
            }
          };
          reader.onerror = e => {
            // On error, return the original blob
            observer.next(event);
            observer.complete();
          };
          reader.readAsText(event.body);
        });
      }
      return new Observable<HttpEvent<any>>(observer => {
        observer.next(event);
        observer.complete();
      });
    }),
    finalize(() => loadingService.stopLoading())
  );
}