import { Component } from '@angular/core';

import { AuthPageBaseComponent, AuthService } from '@bookapp-angular/auth-core';

@Component({
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss']
})
export class AuthPageComponent extends AuthPageBaseComponent {
  constructor(protected authService: AuthService) {
    super();
  }
}
