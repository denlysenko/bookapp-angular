import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';

import { UserSelfResponse } from '@bookapp-angular/auth-core';
import { ME_QUERY } from '@bookapp-angular/graphql/src/lib/queries';
import { Apollo } from 'apollo-angular';

import { AUTH_TOKEN } from '../constants';
import { RouterExtensions, StoragePlatformService } from '../services';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
  constructor(
    private routerExtensions: RouterExtensions,
    private apollo: Apollo,
    private storagePlatformService: StoragePlatformService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.hasAccess();
  }

  canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
    return this.hasAccess();
  }

  private waitForUser() {
    return this.apollo
      .query<UserSelfResponse>({
        query: ME_QUERY
      })
      .pipe(
        map(res => res.data.me),
        filter(user => !!user),
        map(user => !!user),
        take(1)
      );
  }

  private hasAccess() {
    const loggedIn = !!this.storagePlatformService.getItem(AUTH_TOKEN);

    if (!loggedIn) {
      this.routerExtensions.navigate(['auth'], {
        // for nativescript
        clearHistory: true,
        transition: {
          name: 'flip',
          duration: 300,
          curve: 'linear'
        }
      });

      return false;
    }

    return this.waitForUser();
  }
}
