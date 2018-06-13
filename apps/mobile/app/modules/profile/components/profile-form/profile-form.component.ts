import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { User } from '@bookapp-angular/auth-core';
import { FeedbackPlatformService } from '@bookapp-angular/core';
import { ProfileFormBaseComponent } from '@bookapp-angular/profile-core';

@Component({
  moduleId: module.id,
  selector: 'ba-profile-form',
  templateUrl: 'profile-form.component.html',
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

  @Output() backTapped = new EventEmitter<void>();

  private _user: User;

  constructor(
    protected fb: FormBuilder,
    protected feedbackService: FeedbackPlatformService
  ) {
    super();
  }

  goBack() {
    this.backTapped.emit();
  }
}
