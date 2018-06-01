import { Injectable } from '@angular/core';

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
    this.apollo
      .mutate({
        mutation: LOGIN_MUTATION,
        variables: {
          email,
          password
        }
      })
      .subscribe(({ data: { login: { token } } }) => {
        this.storagePlatformService.setItem(AUTH_TOKEN, token);
        this.getUserSelf();
      });
  }

  signup(user: Credentials) {
    this.apollo
      .mutate({
        mutation: SIGNUP_MUTATION,
        variables: {
          user
        }
      })
      .subscribe(({ data: { signin: { token } } }) => {
        this.storagePlatformService.setItem(AUTH_TOKEN, token);
        this.getUserSelf();
      });
  }

  getUserSelf() {
    this.apollo
      .query({
        query: ME_QUERY
      })
      .subscribe();
  }

  logout() {
    this.apollo.getClient().resetStore();
  }
}
