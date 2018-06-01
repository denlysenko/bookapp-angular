import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { AuthFormBaseComponent } from '@bookapp-angular/auth-core/src';

@Component({
  selector: 'ba-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthFormComponent extends AuthFormBaseComponent {
  constructor(protected fb: FormBuilder) {
    super();
  }
}
