import { AuthForm, AuthService } from '@bookapp-angular/auth-core';

export abstract class AuthPageBaseComponent {
  protected authService: AuthService;

  submit($event: AuthForm) {
    const { isLoggingIn, credentials } = $event;
    isLoggingIn
      ? this.authService.login(credentials.email, credentials.password)
      : this.authService.signup(credentials);
  }
}
