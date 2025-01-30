import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // console.log('Request Interceptor: ', request);
    if (request.method == 'POST') {
      const tempRequest = request.clone({
        headers: new HttpHeaders({
          token: '12345abcde',
        }),
      });
      return next.handle(tempRequest);
    }
    return next.handle(request);
  }
}
