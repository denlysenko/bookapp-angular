import { Component } from '@angular/core';

import { AuthPageBaseComponent, AuthService } from '@bookapp-angular/auth-core';
import { RouterExtensions } from '@bookapp-angular/core';
import { Page } from 'ui/page';

@Component({
  moduleId: module.id,
  selector: 'ba-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss']
})
export class AuthPageComponent extends AuthPageBaseComponent {
  constructor(
    public page: Page,
    protected authService: AuthService,
    protected routerExtensions: RouterExtensions
  ) {
    super();
    page.actionBarHidden = true;
  }
}
