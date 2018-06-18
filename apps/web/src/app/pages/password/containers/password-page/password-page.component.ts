import { Component } from '@angular/core';

import { FeedbackPlatformService } from '@bookapp-angular/core';
import { PasswordPageBaseComponent, PasswordService } from '@bookapp-angular/password-core';

@Component({
  templateUrl: './password-page.component.html',
  styleUrls: ['./password-page.component.scss']
})
export class PasswordPageComponent extends PasswordPageBaseComponent {
  constructor(
    protected passwordService: PasswordService,
    protected feedbackService: FeedbackPlatformService
  ) {
    super();
  }
}
