import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';

import { takeUntil } from 'rxjs/operators';

import { AuthService, User } from '@bookapp-angular/auth-core';
import { BaseComponent, RouterExtensions } from '@bookapp-angular/core';
import { ME_QUERY } from '@bookapp-angular/graphql';
import { Apollo } from 'apollo-angular';

@Component({
  selector: 'ba-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent extends BaseComponent
  implements OnInit, OnDestroy {
  mobileQuery: MediaQueryList;
  user: User;

  private mobileQueryListener: () => void;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private media: MediaMatcher,
    private apollo: Apollo,
    private routerExtensions: RouterExtensions,
    private authService: AuthService
  ) {
    super();
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this.mobileQueryListener);
  }

  ngOnInit() {
    this.apollo
      .watchQuery<any>({
        query: ME_QUERY
      })
      .valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe(
        ({ data, errors }) => {
          if (data) {
            this.user = data.me;
          }

          if (errors) {
            this.navigateToAuth();
          }
        },
        () => {
          this.navigateToAuth();
        }
      );
  }

  logout() {
    this.authService.logout();
    this.navigateToAuth();
  }

  ngOnDestroy() {
    this.mobileQuery.removeListener(this.mobileQueryListener);
    super.ngOnDestroy();
  }

  private navigateToAuth() {
    this.routerExtensions.navigate(['auth'], {
      // for nativescript
      clearHistory: true,
      transition: {
        name: 'flip',
        duration: 300,
        curve: 'linear'
      }
    });
  }
}
