import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';

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
      .query({
        query: ME_QUERY
      })
      .pipe(filter(me => !!me), map(me => !!me), take(1));
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
