import { Component } from '@angular/core';

import { Page } from 'ui/page';

@Component({
  moduleId: module.id,
  selector: 'ba-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss']
})
export class AuthPageComponent {
  constructor(public page: Page) {
    page.actionBarHidden = true;
  }
}
