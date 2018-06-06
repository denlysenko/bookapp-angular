import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { AuthFormBaseComponent } from '@bookapp-angular/auth-core';
import { FeedbackPlatformService } from '@bookapp-angular/core';

@Component({
  moduleId: module.id,
  selector: 'ba-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthFormComponent extends AuthFormBaseComponent {
  submitting = false;

  constructor(
    protected fb: FormBuilder,
    protected feedbackService: FeedbackPlatformService
  ) {
    super();
  }

  submit() {
    this.submitting = true;
    super.submit();
  }
}
