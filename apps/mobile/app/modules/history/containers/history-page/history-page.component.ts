import { Component, ViewChild } from '@angular/core';

import { HistoryPageBaseComponent } from '@bookapp-angular/history-core';

import { Apollo } from 'apollo-angular';
import { ObservableArray } from 'tns-core-modules/data/observable-array/observable-array';
import { action } from 'ui/dialogs';

import { LoaderService } from '~/modules/core/services/loader.service';
import { HistoryListComponent } from '../../components/history-list/history-list.component';

@Component({
  moduleId: module.id,
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss']
})
export class HistoryPageComponent extends HistoryPageBaseComponent {
  set isLoading(value: boolean) {
    this._loading = value;
    if (this._loading) {
      this.loaderService.start();
    } else {
      this.loaderService.stop();
    }
  }
  get isLoading(): boolean {
    return this._loading;
  }

  @ViewChild(HistoryListComponent)
  historyListView: HistoryListComponent;

  private _loading: boolean;
  private skip = 0;

  constructor(protected apollo: Apollo, private loaderService: LoaderService) {
    super();
  }

  async onFilterTap() {
    const result = await action({
      message: 'Sort By Creation Date',
      cancelButtonText: 'Cancel',
      actions: ['Ascending', 'Descending']
    });

    if (result === 'Ascending') {
      return this.sort('asc');
    }

    if (result === 'Descending') {
      return this.sort('desc');
    }
  }

  loadMore() {
    if (this.isLoading) {
      return;
    }

    if (this.hasMoreItems()) {
      this.skip = this.logs.length;

      const { skip } = this;

      return this.logsQueryRef.fetchMore({
        variables: {
          skip
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          if (!fetchMoreResult) {
            return previousResult;
          }

          const { rows, count } = fetchMoreResult.logs;

          return {
            logs: {
              count,
              rows: [...previousResult.logs.rows, ...rows],
              __typename: 'LogsResponse'
            }
          };
        }
      });
    }
  }

  protected handleLogsChanges({ data, loading }) {
    this.isLoading = loading;
    if (loading) {
      return;
    }

    this.logs = new ObservableArray(data.logs.rows);
    this.count = data.logs.count;
    this.historyListView.updateLoadOnDemandMode(this.hasMoreItems());
  }

  private sort(direction: string) {
    this.skip = 0;
    this.logsQueryRef.refetch({
      skip: this.skip,
      orderBy: `createdAt_${direction}`
    });
    this.historyListView.scrollToIndex(0);
  }

  private hasMoreItems(): boolean {
    return this.logs.length < this.count;
  }
}
