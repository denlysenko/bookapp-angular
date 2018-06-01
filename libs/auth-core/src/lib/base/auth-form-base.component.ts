import { EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthForm } from '@bookapp-angular/auth-core';

export abstract class AuthFormBaseComponent implements OnInit {
  form: FormGroup;
  isLoggingIn = true;

  @Output() onFormSubmit = new EventEmitter<AuthForm>();

  protected abstract fb: FormBuilder;

  private firstNameField: AbstractControl;
  private lastNameField: AbstractControl;

  ngOnInit() {
    this.initForm();
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
