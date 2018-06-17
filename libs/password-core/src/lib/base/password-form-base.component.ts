import { EventEmitter, Input, Output } from '@angular/core';

import { FormBaseComponent } from '@bookapp-angular/core';

import { PasswordForm } from '../models';

export abstract class PasswordFormBaseComponent extends FormBaseComponent {
  @Input() loading: boolean;

  @Input()
  set error(value) {
    if (value) {
      this.handleError(value);
    }
  }

  @Output() onFormSubmit = new EventEmitter<PasswordForm>();
}
