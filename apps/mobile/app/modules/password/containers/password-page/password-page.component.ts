import { Component } from '@angular/core';

import { FeedbackPlatformService, RouterExtensions } from '@bookapp-angular/core';
import { PasswordPageBaseComponent, PasswordService } from '@bookapp-angular/password-core';
import { Apollo } from 'apollo-angular';

@Component({
  moduleId: module.id,
  templateUrl: './password-page.component.html',
  styleUrls: ['./password-page.component.scss']
})
export class PasswordPageComponent extends PasswordPageBaseComponent {
  constructor(
    protected apollo: Apollo,
    protected feedbackService: FeedbackPlatformService,
    protected passwordService: PasswordService,
    private routerExtensions: RouterExtensions
  ) {
    super();
  }

  goBack() {
    this.routerExtensions.back();
  }
}
