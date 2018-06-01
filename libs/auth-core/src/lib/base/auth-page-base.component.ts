import { AuthForm, AuthService, Credentials } from '@bookapp-angular/auth-core';

export abstract class AuthPageBaseComponent {
  error: any;

  protected authService: AuthService;

  submit($event: AuthForm) {
    const { isLoggingIn, credentials } = $event;
    this.error = null;

    isLoggingIn
      ? this.login(credentials.email, credentials.password)
      : this.signup(credentials);
  }

  private login(email, password) {
    return this.authService
      .login(email, password)
      .subscribe(({ data, errors }) => {
        if (errors) {
          this.error = errors[errors.length - 1];
        }
      });
  }

  private signup(credentials: Credentials) {
    return this.authService
      .signup(credentials)
      .subscribe(({ data, errors }) => {
        if (errors) {
          this.error = errors[errors.length - 1];
        }
      });
  }
}
