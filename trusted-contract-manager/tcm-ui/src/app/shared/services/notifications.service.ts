import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  private _latestMessage: string = '';
  constructor(private _snackBar: MatSnackBar) {}

  showMessage(value: string, messageDuration: number = 3000): void {
    this._latestMessage = value;
    this._snackBar.open(value, 'Ok', { duration: messageDuration });
  }

  get latestMessage(): string {
    return this._latestMessage;
  }
}
