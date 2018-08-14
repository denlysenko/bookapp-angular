import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';

import {
  AuthService,
  User,
  UserSelfResponse
} from '@bookapp-angular/auth-core';
import { BaseComponent, RouterExtensions } from '@bookapp-angular/core';
import {
  LAST_LOGS_QUERY,
  LOG_CREATED_SUBSCRIPTION,
  ME_QUERY
} from '@bookapp-angular/graphql';
import { Log, LogsResponse } from '@bookapp-angular/history-core';

import { Apollo, QueryRef } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'ba-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent extends BaseComponent
  implements OnInit, OnDestroy {
  mobileQuery: MediaQueryList;
  user: User;
  lastLogsQuery: QueryRef<LogsResponse>;
  logs$: Observable<Log[]>;

  private mobileQueryListener: () => void;
  private unsubscribeFromNewLogs: () => void;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private media: MediaMatcher,
    private apollo: Apollo,
    private routerExtensions: RouterExtensions,
    private authService: AuthService
  ) {
    super();
    this.mobileQuery = this.media.matchMedia('(max-width: 600px)');
    this.mobileQueryListener = () => this.changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this.mobileQueryListener);
  }

  ngOnInit() {
    this.subscribeToMeQuery();

    this.lastLogsQuery = this.apollo.watchQuery<LogsResponse>({
      query: LAST_LOGS_QUERY
    });

    this.logs$ = this.lastLogsQuery.valueChanges.pipe(
      map(({ data }) => data.logs.rows)
    );
  }

  logout() {
    this.authService.logout();
    this.navigateToAuth();
  }

  ngOnDestroy() {
    this.mobileQuery.removeListener(this.mobileQueryListener);
    this.unsubscribeFromNewLogs();
    super.ngOnDestroy();
  }

  private navigateToAuth() {
    this.routerExtensions.navigate(['auth']);
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
