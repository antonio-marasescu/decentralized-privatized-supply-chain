import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { LoginUserModel } from '../models/auth/login-user.model';
import { JwtResponseModel } from '../models/auth/jwt-response.model';
import { catchError } from 'rxjs/operators';
import { NotificationsService } from './notifications.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(
    private http: HttpClient,
    private notificationsService: NotificationsService,
  ) {}

  login(payload: LoginUserModel): Observable<JwtResponseModel> {
    return this.http
      .post<JwtResponseModel>('api/auth/login', payload, this.httpOptions)
      .pipe(
        catchError((err) => {
          this.notificationsService.showMessage(err.message);
          return of(null);
        }),
      );
  }

  logout(): Observable<void> {
    return this.http.get<void>('api/auth/logout', this.httpOptions).pipe(
      catchError((err) => {
        this.notificationsService.showMessage(err.message);
        return of(null);
      }),
    );
  }
}
