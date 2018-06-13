import { EventEmitter, Input, Output } from '@angular/core';

import { User } from '@bookapp-angular/auth-core';
import { FormBaseComponent } from '@bookapp-angular/core';

import { ProfileForm } from '../models';

export abstract class ProfileFormBaseComponent extends FormBaseComponent {
  abstract user: User;

  @Input() loading: boolean;

  @Input()
  set error(value) {
    if (value) {
      this.handleError(value);
    }
  }
  @Output() onFormSubmit = new EventEmitter<ProfileForm>();
}
