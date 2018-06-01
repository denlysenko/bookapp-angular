import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

import { AuthFormBaseComponent } from '@bookapp-angular/auth-core';

@Component({
  selector: 'ba-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthFormComponent extends AuthFormBaseComponent {
  constructor(protected fb: FormBuilder, protected snackBar: MatSnackBar) {
    super();
  }
}
