import { Injectable } from '@angular/core';
import { UserModel } from '../models/users/user.model';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApplicationContextService {
  private _isLoggedIn: boolean = false;
  private _isLoading: boolean = false;
  private _currentUser: UserModel = null;
  loginStatusChanged: ReplaySubject<boolean> = new ReplaySubject<boolean>();
  loadingStatusChanged: ReplaySubject<boolean> = new ReplaySubject<boolean>();
  currentUserChanged: ReplaySubject<UserModel> = new ReplaySubject<UserModel>();

  get isLoggedIn(): boolean {
    return this._isLoggedIn;
  }

  get isLoading(): boolean {
    return this._isLoading;
  }

  get currentUser(): UserModel {
    return this._currentUser;
  }

  set currentUser(value: UserModel) {
    if (this._currentUser !== value) {
      this._currentUser = value;
      this.currentUserChanged.next(value);
    }
  }

  set isLoggedIn(value: boolean) {
    if (this._isLoggedIn !== value) {
      this._isLoggedIn = value;
      this.loginStatusChanged.next(value);
    }
  }

  set isLoading(value: boolean) {
    if (this._isLoading !== value) {
      this._isLoading = value;
      this.loadingStatusChanged.next(value);
    }
  }

  resetService(): void {
    this._isLoggedIn = false;
    this._isLoading = false;
    this._currentUser = null;
    this.loginStatusChanged.complete();
    this.loadingStatusChanged.complete();
    this.currentUserChanged.complete();
    this.loginStatusChanged = new ReplaySubject<boolean>();
    this.loadingStatusChanged = new ReplaySubject<boolean>();
    this.currentUserChanged = new ReplaySubject<UserModel>();
  }
}
