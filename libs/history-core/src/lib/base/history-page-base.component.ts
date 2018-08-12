import { OnInit } from '@angular/core';

import { BaseComponent, LIMIT } from '@bookapp-angular/core';
import { LOGS_QUERY } from '@bookapp-angular/graphql';

import { Apollo, QueryRef } from 'apollo-angular';
import { ApolloQueryResult } from 'apollo-client';
import { takeUntil } from 'rxjs/operators';
import { ObservableArray } from 'tns-core-modules/data/observable-array/observable-array';

import { Log, LogsResponse } from '../models';

const DEFAULT_SKIP = 0;
const DEFAULT_ORDER_BY = 'createdAt_desc';

export abstract class HistoryPageBaseComponent extends BaseComponent
  implements OnInit {
  logs: Log[] | ObservableArray<Log>;
  count: number;
  isLoading: boolean;

  protected abstract apollo: Apollo;

  protected logsQueryRef: QueryRef<LogsResponse>;

  ngOnInit() {
    this.logsQueryRef = this.apollo.watchQuery<LogsResponse>({
      query: LOGS_QUERY,
      variables: {
        skip: DEFAULT_SKIP,
        first: LIMIT,
        orderBy: DEFAULT_ORDER_BY
      },
      fetchPolicy: 'network-only',
      notifyOnNetworkStatusChange: true
    });

    this.logsQueryRef.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(this.handleLogsChanges.bind(this));
  }

  protected abstract handleLogsChanges(
    result: ApolloQueryResult<LogsResponse>
  ): void;
}
