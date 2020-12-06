import { Component, OnInit } from '@angular/core';
import { ApplicationContextService } from './shared/services/application-context.service';
import { UsersService } from './shared/services/users.service';
import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  isContextLoading$: Observable<boolean>;
  constructor(
    private applicationContextService: ApplicationContextService,
    private usersService: UsersService,
  ) {}

  ngOnInit(): void {
    this.applicationContextService.resetService();
    this.isContextLoading$ = this.applicationContextService.loadingStatusChanged.asObservable();
    this.applicationContextService.loginStatusChanged.subscribe(
      (isLoggedIn) => {
        this.applicationContextService.isLoading = true;
        if (isLoggedIn) {
          this.usersService
            .getCurrentUser()
            .pipe(
              catchError((_) => {
                this.applicationContextService.isLoading = false;
                return of(null);
              }),
            )
            .subscribe((currentUser) => {
              this.applicationContextService.isLoading = false;
              this.applicationContextService.currentUser = currentUser;
            });
        } else {
          this.applicationContextService.isLoading = false;
        }
      },
    );
  }
}
