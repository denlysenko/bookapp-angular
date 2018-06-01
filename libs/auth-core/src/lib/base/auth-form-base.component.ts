import { EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';

import { AuthForm } from '@bookapp-angular/auth-core';
import { FormBaseComponent } from '@bookapp-angular/core';

export abstract class AuthFormBaseComponent extends FormBaseComponent
  implements OnInit {
  isLoggingIn = true;

  @Input() loading: boolean;
  @Input()
  set error(value) {
    if (value) {
      this.handleError(value);
    }
  }

  @Output() onFormSubmit = new EventEmitter<AuthForm>();

  protected abstract fb: FormBuilder;

  private firstNameField: AbstractControl;
  private lastNameField: AbstractControl;

  ngOnInit() {
    this.initForm();
  }

  getEmailError() {
    const emailField = this.form.get('email');
    return emailField.invalid && emailField.hasError('required')
      ? 'This field is required'
      : emailField.hasError('email')
        ? 'Not a valid email'
        : emailField.hasError('serverError') ? this.errors['email'] : '';
  }

  toggleAuthMode() {
    this.isLoggingIn = !this.isLoggingIn;
    this.isLoggingIn ? this.disableFields() : this.enableFields();
  }

  submit() {
    if (this.form.valid) {
      this.onFormSubmit.emit({
        credentials: this.form.value,
        isLoggingIn: this.isLoggingIn
      });
    }
  }

  private initForm() {
    this.form = this.fb.group({
      firstName: [null],
      lastName: [null],
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required]
    });

    this.firstNameField = this.form.get('firstName');
    this.lastNameField = this.form.get('lastName');
    this.disableFields();
  }

  private enableFields() {
    this.firstNameField.enable();
    this.lastNameField.enable();
  }

  private disableFields() {
    this.firstNameField.disable();
    this.lastNameField.disable();
  }
}
