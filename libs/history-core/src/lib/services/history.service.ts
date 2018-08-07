import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { LIMIT, ListResponse } from '@bookapp-angular/core';
import { LOGS_QUERY } from '@bookapp-angular/graphql';
import { Apollo } from 'apollo-angular';

import { Log, LogsResponse } from '../models';

@Injectable()
export class HistoryService {
  constructor(private apollo: Apollo) {}

  getLogs(
    orderBy = 'createdAt_desc',
    skip = 0,
    first = LIMIT
  ): Observable<ListResponse<Log>> {
    return this.apollo
      .query<LogsResponse>({
        query: LOGS_QUERY,
        variables: {
          skip,
          first,
          orderBy
        }
      })
      .pipe(map(res => res.data.logs));
  }
}
