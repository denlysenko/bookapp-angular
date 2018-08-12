import { Component } from '@angular/core';
import { PageEvent, Sort } from '@angular/material';

import { HistoryPageBaseComponent } from '@bookapp-angular/history-core';
import { Apollo } from 'apollo-angular';

@Component({
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss']
})
export class HistoryPageComponent extends HistoryPageBaseComponent {
  constructor(protected apollo: Apollo) {
    super();
  }

  sort(event: Sort) {
    this.logsQueryRef.refetch({
      orderBy: `${event.active}_${event.direction}`
    });
  }

  paginate(event: PageEvent) {
    this.logsQueryRef.refetch({
      skip: event.pageIndex * event.pageSize,
      first: event.pageSize
    });
  }

  protected handleLogsChanges({ data, loading }) {
    if (loading) {
      return;
    }

    this.logs = data.logs.rows;
    this.count = data.logs.count;
  }
}
