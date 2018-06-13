import { Component } from '@angular/core';

import { FeedbackPlatformService, RouterExtensions } from '@bookapp-angular/core';
import { ProfilePageBaseComponent, ProfileService } from '@bookapp-angular/profile-core';
import { Apollo } from 'apollo-angular';

@Component({
  moduleId: module.id,
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent extends ProfilePageBaseComponent {
  constructor(
    protected apollo: Apollo,
    protected feedbackService: FeedbackPlatformService,
    protected profileService: ProfileService,
    private routerExtensions: RouterExtensions
  ) {
    super();
  }

  goBack() {
    this.routerExtensions.back();
  }
}
