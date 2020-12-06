import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-auth-login-form',
  templateUrl: './auth-login-form.component.html',
  styleUrls: ['./auth-login-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthLoginFormComponent {
  @Input() loginForm: FormGroup;
  hidePassword = true;
}
