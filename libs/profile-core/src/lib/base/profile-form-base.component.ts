import { EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

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

  protected abstract fb: FormBuilder;

  submit() {
    if (this.form.valid) {
      this.onFormSubmit.emit({ id: this.user.id, user: this.form.value });
    }
  }

  getEmailError() {
    const emailField = this.form.get('email');
    return emailField.invalid && emailField.hasError('required')
      ? 'This field is required'
      : emailField.hasError('email')
        ? 'Not a valid email'
        : emailField.hasError('serverError') ? this.errors['email'] : '';
  }

  protected initForm() {
    this.form = this.fb.group({
      firstName: [this.user.firstName, Validators.required],
      lastName: [this.user.lastName, Validators.required],
      email: [this.user.email, [Validators.required, Validators.email]]
    });
  }
}
