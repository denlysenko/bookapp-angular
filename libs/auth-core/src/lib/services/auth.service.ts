import { Injectable } from '@angular/core';

import { tap } from 'rxjs/operators';

import { Credentials } from '@bookapp-angular/auth-core';
import { AUTH_TOKEN, StoragePlatformService } from '@bookapp-angular/core';
import { LOGIN_MUTATION, ME_QUERY, SIGNUP_MUTATION } from '@bookapp-angular/graphql';
import { Apollo } from 'apollo-angular';

@Injectable()
export class AuthService {
  constructor(
    private apollo: Apollo,
    private storagePlatformService: StoragePlatformService
  ) {}

  login(email: string, password: string) {
    return this.apollo
      .mutate({
        mutation: LOGIN_MUTATION,
        variables: {
          email,
          password
        }
      })
      .pipe(
        tap(({ data }) => {
          if (data) {
            const { login: { token } } = data;
            this.storagePlatformService.setItem(AUTH_TOKEN, token);
          }
        })
      );
  }

  signup(user: Credentials) {
    return this.apollo
      .mutate({
        mutation: SIGNUP_MUTATION,
        variables: {
          user
        }
      })
      .pipe(
        tap(({ data }) => {
          if (data) {
            const { login: { token } } = data;
            this.storagePlatformService.setItem(AUTH_TOKEN, token);
          }
        })
      );
  }

  getUserSelf() {
    this.apollo
      .query({
        query: ME_QUERY
      })
      .subscribe();
  }

  logout() {
    this.storagePlatformService.removeItem(AUTH_TOKEN);
    this.apollo.getClient().resetStore();
  }
}
