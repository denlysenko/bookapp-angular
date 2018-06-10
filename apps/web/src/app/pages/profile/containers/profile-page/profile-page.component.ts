import { Component } from '@angular/core';
import { ProfilePageBaseComponent } from '@bookapp-angular/profile-core';
import { Apollo } from 'apollo-angular';

@Component({
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent extends ProfilePageBaseComponent {
  constructor(protected apollo: Apollo) {
    super();
  }
}
