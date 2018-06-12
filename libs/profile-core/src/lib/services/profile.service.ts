import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { User } from '@bookapp-angular/auth-core';
import { UPDATE_USER_MUTATION } from '@bookapp-angular/graphql';

@Injectable()
export class ProfileService {
  constructor(private apollo: Apollo) {}

  update(id: string, user: User) {
    return this.apollo.mutate({
      mutation: UPDATE_USER_MUTATION,
      variables: {
        id,
        user
      }
    });
  }
}
