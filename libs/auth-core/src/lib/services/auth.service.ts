import { Injectable } from '@angular/core';

import { AUTH_TOKEN, StoragePlatformService } from '@bookapp-angular/core';
import {
  LOGIN_MUTATION,
  ME_QUERY,
  SIGNUP_MUTATION
} from '@bookapp-angular/graphql';

import { Apollo } from 'apollo-angular';
import { tap } from 'rxjs/operators';

import { Credentials, UserSelfResponse } from '../models';

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
            const {
              login: { token }
            } = data;
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
            const {
              signup: { token }
            } = data;
            this.storagePlatformService.setItem(AUTH_TOKEN, token);
          }
        })
      );
  }

  getUserSelf() {
    this.apollo
      .query<UserSelfResponse>({
        query: ME_QUERY
      })
      .subscribe();
  }

  async logout() {
    this.storagePlatformService.removeItem(AUTH_TOKEN);
    await this.apollo.getClient().resetStore();
  }
}
