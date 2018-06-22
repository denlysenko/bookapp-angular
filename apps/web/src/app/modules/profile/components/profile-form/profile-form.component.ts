import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { User } from '@bookapp-angular/auth-core';
import { FeedbackPlatformService } from '@bookapp-angular/core';
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

  private _user: User;

  constructor(
    private fb: FormBuilder,
    protected feedbackService: FeedbackPlatformService,
    private location: Location
  ) {
    super();
  }

  goBack() {
    this.location.back();
  }

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

  private initForm() {
    this.form = this.fb.group({
      firstName: [this.user.firstName, Validators.required],
      lastName: [this.user.lastName, Validators.required],
      email: [this.user.email, [Validators.required, Validators.email]]
    });
  }
}
