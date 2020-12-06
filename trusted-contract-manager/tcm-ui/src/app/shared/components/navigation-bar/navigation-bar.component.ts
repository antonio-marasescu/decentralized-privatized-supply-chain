import { Component, OnInit } from '@angular/core';
import { ApplicationContextService } from '../../services/application-context.service';
import { UserModel } from '../../models/users/user.model';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { AppRoutePaths } from '../../app-route-paths';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss'],
})
export class NavigationBarComponent implements OnInit {
  currentUser: UserModel;
  isLoggedIn: boolean;

  constructor(
    private applicationContextService: ApplicationContextService,
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.currentUser = this.applicationContextService.currentUser;
    this.isLoggedIn = this.applicationContextService.isLoggedIn;
    this.applicationContextService.currentUserChanged.subscribe(
      (user) => (this.currentUser = user),
    );
    this.applicationContextService.loginStatusChanged.subscribe(
      (isLoggedIn) => (this.isLoggedIn = isLoggedIn),
    );
  }

  logout(): void {
    this.authService
      .logout()
      .subscribe(() => this.router.navigateByUrl(AppRoutePaths.LOGIN));
  }
}
