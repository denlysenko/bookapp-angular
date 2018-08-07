import { OnInit } from '@angular/core';

import { takeUntil } from 'rxjs/operators';

import { BaseComponent, LIMIT } from '@bookapp-angular/core';
import { LOGS_QUERY } from '@bookapp-angular/graphql';
import { Apollo, QueryRef } from 'apollo-angular';

import { Log, LogsResponse } from '../models';

const DEFAULT_SKIP = 0;
const DEFAULT_ORDER_BY = 'createdAt_desc';

export abstract class HistoryPageBaseComponent extends BaseComponent
  implements OnInit {
  logs: Log[];
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

    this.subscribeToLogsQuery();
  }

  private subscribeToLogsQuery() {
    this.logsQueryRef.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(({ data, loading }) => {
        this.isLoading = loading;
        if (loading) {
          return;
        }

        this.logs = data.logs.rows;
        this.count = data.logs.count;
      });
  }
}
