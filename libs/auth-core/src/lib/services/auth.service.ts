import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';

import { LOGIN_MUTATION, SIGNUP_MUTATION, ME_QUERY } from '@bookapp-angular/graphql/src/lib/queries';

@Injectable()
export class AuthService {
  constructor(private apollo: Apollo) {}

  login(email: string, password: string) {
    this.apollo.mutate()
  }

  signup() {}

  logout() {}
}
