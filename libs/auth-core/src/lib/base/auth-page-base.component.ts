import { finalize } from 'rxjs/operators';

import { AuthService, Credentials } from '@bookapp-angular/auth-core';
import { RouterExtensions } from '@bookapp-angular/core';

export abstract class AuthPageBaseComponent {
  error: any;
  isLoading = false;

  protected abstract authService: AuthService;
  protected abstract routerExtensions: RouterExtensions;

  submit({ isLoggingIn, credentials }) {
    this.error = null;

    isLoggingIn
      ? this.login(credentials.email, credentials.password)
      : this.signup(credentials);
  }

  private login(email, password) {
    this.isLoading = true;

    return this.authService
      .login(email, password)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe(({ data, errors }) => {
        if (data) {
          this.routerExtensions.navigate([''], {
            // for nativescript
            clearHistory: true,
            transition: {
              name: 'flip',
              duration: 300,
              curve: 'linear'
            }
          });
        }

        if (errors) {
          this.error = errors[errors.length - 1];
        }
      });
  }

  private signup(credentials: Credentials) {
    this.isLoading = true;

    return this.authService
      .signup(credentials)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe(({ data, errors }) => {
        if (data) {
          this.routerExtensions.navigate([''], {
            // for nativescript
            clearHistory: true,
            transition: {
              name: 'flip',
              duration: 300,
              curve: 'linear'
            }
          });
        }

        if (errors) {
          this.error = errors[errors.length - 1];
        }
      });
  }
}
