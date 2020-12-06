import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserModel } from '../models/users/user.model';
import { Observable, of } from 'rxjs';
import { RegisterUserModel } from '../models/users/register-user.model';
import { catchError } from 'rxjs/operators';
import { NotificationsService } from './notifications.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(
    private http: HttpClient,
    private notificationsService: NotificationsService,
  ) {}

  getCurrentUser(): Observable<UserModel> {
    return this.http.get<UserModel>('api/users/me', this.httpOptions).pipe(
      catchError((err) => {
        this.notificationsService.showMessage(err.message);
        return of(null);
      }),
    );
  }

  registerUser(user: RegisterUserModel): Observable<UserModel> {
    return this.http.post<UserModel>('api/users', user, this.httpOptions).pipe(
      catchError((err) => {
        this.notificationsService.showMessage(err.message);
        return of(null);
      }),
    );
  }
}
