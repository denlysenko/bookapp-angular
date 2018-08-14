import {
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';

import {
  AuthService,
  User,
  UserSelfResponse
} from '@bookapp-angular/auth-core';
import {
  BaseComponent,
  categories,
  MenuItem,
  navs,
  userMenu
} from '@bookapp-angular/core';
import {
  LAST_LOGS_QUERY,
  LOG_CREATED_SUBSCRIPTION,
  ME_QUERY
} from '@bookapp-angular/graphql';
import { Log, LogsResponse } from '@bookapp-angular/history-core';

import { Apollo, QueryRef } from 'apollo-angular';
import { RouterExtensions } from 'nativescript-angular/router/router-extensions';
import {
  DrawerTransitionBase,
  SlideInOnTopTransition
} from 'nativescript-ui-sidedrawer';
import { RadSideDrawerComponent } from 'nativescript-ui-sidedrawer/angular';
import { Observable } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import * as application from 'tns-core-modules/application';
import { isIOS } from 'tns-core-modules/platform';

@Component({
  moduleId: module.id,
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  animations: [
    trigger('state', [
      state('in', style({ opacity: 1, transform: 'translateY(0)' })),
      state('out', style({ opacity: 0, transform: 'translateY(-100%)' })),
      transition('in <=> out', [animate('300ms ease-out')])
    ])
  ]
})
export class LayoutComponent extends BaseComponent
  implements OnInit, OnDestroy {
  user: User;
  selectedPage: string;
  isUserMenuOpen = false;
  lastLogsQuery: QueryRef<LogsResponse>;
  logs$: Observable<Log[]>;

  readonly navItems = navs;
  readonly categoryItems = categories;
  readonly userMenuItems = userMenu;

  @ViewChild('drawer')
  drawerComponent: RadSideDrawerComponent;

  private _sideDrawerTransition: DrawerTransitionBase;
  private unsubscribeFromNewLogs: () => void;

  constructor(
    private apollo: Apollo,
    private authService: AuthService,
    private routerExtensions: RouterExtensions
  ) {
    super();
  }

  ngOnInit() {
    // iPhone X fix height
    if (
      isIOS &&
      application.ios.window.safeAreaInsets &&
      application.ios.window.safeAreaInsets.bottom > 0
    ) {
      application.addCss(`
          RadSideDrawer { margin-bottom: -${
            application.ios.window.safeAreaInsets.bottom
          } }
        `);
    }

    this._sideDrawerTransition = new SlideInOnTopTransition();
    this.subscribeToMeQuery();

    this.lastLogsQuery = this.apollo.watchQuery<LogsResponse>({
      query: LAST_LOGS_QUERY
    });

    this.logs$ = this.lastLogsQuery.valueChanges.pipe(
      map(({ data }) => data.logs.rows),
      takeUntil(this.destroy$)
    );
  }

  ngOnDestroy() {
    if (this.unsubscribeFromNewLogs) {
      this.unsubscribeFromNewLogs();
      this.unsubscribeFromNewLogs = null;
    }
    super.ngOnDestroy();
  }

  get sideDrawerTransition(): DrawerTransitionBase {
    return this._sideDrawerTransition;
  }

  onDrawerButtonTap() {
    this.drawerComponent.sideDrawer.toggleDrawerState();
  }

  selectPageAndNavigate(navItem: MenuItem) {
    this.selectedPage = navItem.label;
    this.drawerComponent.sideDrawer.closeDrawer();
    this.routerExtensions.navigate([navItem.path], {
      transition: {
        name: 'fade',
        duration: 300,
        curve: 'linear'
      }
    });
  }

  logout() {
    this.ngOnDestroy();
    this.authService.logout();
    this.routerExtensions.navigate(['/auth'], {
      clearHistory: true,
      transition: {
        name: 'flip',
        duration: 300,
        curve: 'linear'
      }
    });
  }

  private subscribeToMeQuery() {
    this.apollo
      .watchQuery<UserSelfResponse>({
        query: ME_QUERY
      })
      .valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe(
        ({ data, errors }) => {
          if (data) {
            this.user = data.me;

            if (!this.unsubscribeFromNewLogs) {
              this.subscribeToNewLogs();
            }

            this.selectPageAndNavigate(this.navItems[1]);
          }

          if (errors) {
            this.logout();
          }
        },
        () => {
          this.logout();
        }
      );
  }

  private subscribeToNewLogs() {
    this.unsubscribeFromNewLogs = this.lastLogsQuery.subscribeToMore({
      document: LOG_CREATED_SUBSCRIPTION,
      variables: { userId: this.user.id },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) {
          return prev;
        }

        const newLogs = [subscriptionData.data.logCreated, ...prev.logs.rows];
        newLogs.pop();

        return {
          logs: {
            rows: newLogs,
            __typename: 'LogsResponse'
          }
        };
      }
    });
  }
}
