import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { User } from '@bookapp-angular/auth-core';
import { FeedbackPlatformService } from '@bookapp-angular/core';
import { ProfileFormBaseComponent } from '@bookapp-angular/profile-core';
import { getViewById } from 'ui/core/view';
import { Page } from 'ui/page';

import { profileMetadata, ProfileViewModel } from '../../models';

@Component({
  moduleId: module.id,
  selector: 'ba-profile-form',
  templateUrl: 'profile-form.component.html',
  styleUrls: ['./profile-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileFormComponent extends ProfileFormBaseComponent {
  metadata = profileMetadata;
  profile: ProfileViewModel;

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
    private page: Page,
    protected feedbackService: FeedbackPlatformService
  ) {
    super();
  }

  goBack() {
    this.backTapped.emit();
  }

  submit() {
    this.onFormSubmit.emit({ id: this.user.id, user: this.profile });
  }

  private initForm() {
    this.profile = new ProfileViewModel(
      this.user.firstName,
      this.user.lastName,
      this.user.email
    );
  }

  protected handleError(err: any) {
    if (err.errors) {
      const error = err.errors;
      Object.keys(error).forEach(key => {
        const dataform: any = getViewById(this.page, 'profileForm');
        const formControl = dataform.getPropertyByName(key);
        if (formControl) {
          formControl.errorMessage = error[key].message;
          dataform.notifyValidated(key, false);
        }
      });
    } else if (err.message && err.message.message) {
      this.feedbackService.error(err.message.message);
    }
  }
}
