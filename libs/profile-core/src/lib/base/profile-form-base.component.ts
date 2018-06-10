import { EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { User } from '@bookapp-angular/auth-core';
import { FormBaseComponent } from '@bookapp-angular/core';

export abstract class ProfileFormBaseComponent extends FormBaseComponent {
  abstract user: User;
  abstract formSubmitted: EventEmitter<User>;

  protected abstract fb: FormBuilder;

  submit() {
    if (this.form.valid) {
      this.formSubmitted.emit(this.form.value);
    }
  }

  protected initForm() {
    this.form = this.fb.group({
      firstName: [this.user.firstName, Validators.required],
      lastName: [this.user.lastName, Validators.required],
      email: [this.user.email, [Validators.required, Validators.email]]
    });
  }
}
