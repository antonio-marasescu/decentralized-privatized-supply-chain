import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppRoutePaths } from '../../app-route-paths';
import { RegisterUserModel } from '../../models/users/register-user.model';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-auth-register',
  templateUrl: './auth-register.component.html',
  styleUrls: ['./auth-register.component.scss'],
})
export class AuthRegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(private usersService: UsersService, private router: Router) {}

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      username: new FormControl(null, [
        Validators.required,
        Validators.minLength(4),
      ]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
      ]),
    });
  }

  register(): void {
    const payload: RegisterUserModel = this.registerForm.value;
    this.usersService
      .registerUser(payload)
      .subscribe(() => this.router.navigateByUrl(AppRoutePaths.LOGIN));
  }

  gotoLogin(): void {
    this.router.navigateByUrl(AppRoutePaths.LOGIN);
  }
}
