import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ba-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthFormComponent {}
