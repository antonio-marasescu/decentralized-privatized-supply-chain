import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Injectable } from '@angular/core';
import { from, Observable, of } from 'rxjs';
import { ApplicationContextService } from '../services/application-context.service';
import { AppRoutePaths } from '../app-route-paths';
import { map } from 'rxjs/operators';
import { LOCAL_STORAGE_AUTHORIZATION_KEY } from '../interceptors/jwt.interceptor';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private applicationContextService: ApplicationContextService,
    private router: Router,
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> {
    const jwtToken = localStorage.getItem(LOCAL_STORAGE_AUTHORIZATION_KEY);
    if (jwtToken) {
      this.applicationContextService.isLoggedIn = true;
    }
    if (!this.applicationContextService.isLoggedIn)
      return from(this.router.navigateByUrl(AppRoutePaths.LOGIN)).pipe(
        map(() => false),
      );
    return of(true);
  }
}
