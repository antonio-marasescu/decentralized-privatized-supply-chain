import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { AppRoutePaths } from '../../app-route-paths';
import { LoginUserModel } from '../../models/auth/login-user.model';

@Component({
  selector: 'app-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.scss'],
})
export class AuthLoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
      ]),
    });
  }

  login(): void {
    const payload: LoginUserModel = this.loginForm.value;
    this.authService
      .login(payload)
      .subscribe(() => this.router.navigateByUrl(AppRoutePaths.CONTRACTS));
  }

  gotoRegister(): void {
    this.router.navigateByUrl(AppRoutePaths.REGISTER);
  }
}
