import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-auth-register-form',
  templateUrl: './auth-register-form.component.html',
  styleUrls: ['./auth-register-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthRegisterFormComponent {
  @Input() registerForm: FormGroup;
  hidePassword = true;
}
