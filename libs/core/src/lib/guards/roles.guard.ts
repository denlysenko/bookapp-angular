import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { UserSelfResponse } from '@bookapp-angular/auth-core';
import { ME_QUERY } from '@bookapp-angular/graphql/src/lib/queries';
import { Apollo } from 'apollo-angular';

import { RouterExtensions } from '../services';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private apollo: Apollo,
    private routerExtensions: RouterExtensions
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.apollo
      .query<UserSelfResponse>({
        query: ME_QUERY
      })
      .pipe(
        map(res => res.data.me),
        map(user => {
          const roles = route.data['roles'];

          if (!user.roles.some(role => roles.includes(role))) {
            this.routerExtensions.navigate(['']);
          }

          return true;
        }),
        take(1)
      );
  }
}
