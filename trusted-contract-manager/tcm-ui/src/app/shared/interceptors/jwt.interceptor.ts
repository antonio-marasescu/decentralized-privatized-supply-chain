import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ApplicationContextService } from '../services/application-context.service';
import { defaultTo } from 'lodash';

export const LOCAL_STORAGE_AUTHORIZATION_KEY = 'tcm-auth-token';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private applicationContextService: ApplicationContextService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    if (req.url.includes('auth/logout')) {
      return this.handleLogout(req, next);
    }

    if (req.url.includes('auth/login')) {
      return this.handleLogin(req, next);
    }

    let updatedRequest: HttpRequest<any>;
    const jwtToken = localStorage.getItem(LOCAL_STORAGE_AUTHORIZATION_KEY);
    if (jwtToken) {
      updatedRequest = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + jwtToken),
      });
    } else {
      updatedRequest = req.clone();
    }
    return next.handle(updatedRequest);
  }

  private handleLogout(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    localStorage.removeItem(LOCAL_STORAGE_AUTHORIZATION_KEY);
    this.applicationContextService.isLoggedIn = false;
    return of(new HttpResponse({ status: 200 }));
  }

  private handleLogin(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap((event) => {
        if (event instanceof HttpResponse) {
          localStorage.setItem(
            LOCAL_STORAGE_AUTHORIZATION_KEY,
            defaultTo(event.body?.token, null),
          );
          this.applicationContextService.isLoggedIn = true;
        }
      }),
    );
  }
}
