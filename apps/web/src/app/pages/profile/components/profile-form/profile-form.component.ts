import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { User } from '@bookapp-angular/auth-core';
import { ProfileFormBaseComponent } from '@bookapp-angular/profile-core';

@Component({
  selector: 'ba-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileFormComponent extends ProfileFormBaseComponent {
  @Input()
  set user(value: User) {
    if (value) {
      this._user = value;
      this.initForm();
    }
  }
  get user(): User {
    return this._user;
  }

  @Input()
  set error(value: any) {
    if (value) {
      this.handleError(value);
    }
  }

  @Output() formSubmitted = new EventEmitter<User>();

  private _user: User;

  constructor(protected fb: FormBuilder) {
    super();
  }
}
