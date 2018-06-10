import { OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '@bookapp-angular/auth-core';
import { ME_QUERY } from '@bookapp-angular/graphql';
import { Apollo } from 'apollo-angular';

export abstract class ProfilePageBaseComponent implements OnInit {
  user$: Observable<User>;
  error: any;
  isLoading = false;

  protected abstract apollo: Apollo;

  ngOnInit() {
    this.user$ = this.apollo
      .query<any>({
        query: ME_QUERY
      })
      .pipe(map(({ data }) => data.me));
  }

  updateProfile(event: User) {
    console.log(event);
  }
}
