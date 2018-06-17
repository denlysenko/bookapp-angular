import { tap } from 'rxjs/operators';

import { FeedbackPlatformService } from '@bookapp-angular/core';

import { PasswordForm } from '../models';
import { PasswordService } from '../services';

export abstract class PasswordPageBaseComponent {
  error: any;
  isLoading = false;

  protected abstract passwordService: PasswordService;
  protected abstract feedbackService: FeedbackPlatformService;

  changePassword(event: PasswordForm) {
    this.isLoading = true;

    const { newPassword, oldPassword } = event;

    return this.passwordService
      .changePassword(newPassword, oldPassword)
      .pipe(
        tap(() => {
          this.isLoading = false;
        })
      )
      .subscribe(({ data, errors }) => {
        if (data) {
          this.feedbackService.success('Password changed!');
        }

        if (errors) {
          this.error = errors[errors.length - 1];
        }
      });
  }
}
