import { Component } from '@angular/core';

import { AuthPageBaseComponent, AuthService } from '@bookapp-angular/auth-core';
import { RouterExtensions } from '@bookapp-angular/core';

@Component({
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss']
})
export class AuthPageComponent extends AuthPageBaseComponent {
  constructor(
    protected authService: AuthService,
    protected routerExtensions: RouterExtensions
  ) {
    super();
  }
}
