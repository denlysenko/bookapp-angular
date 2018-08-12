import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild
} from '@angular/core';

import { Log } from '@bookapp-angular/history-core';

import { Color } from 'color';
import { ListViewLoadOnDemandMode } from 'nativescript-ui-listview';
import { RadListViewComponent } from 'nativescript-ui-listview/angular';
import { isIOS } from 'platform';
import { ObservableArray } from 'tns-core-modules/data/observable-array/observable-array';

@Component({
  moduleId: module.id,
  selector: 'ba-history-list',
  templateUrl: './history-list.component.html',
  styleUrls: ['./history-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HistoryListComponent {
  @Input()
  logs: ObservableArray<Log>;

  @Output()
  onLoadMore = new EventEmitter<void>();

  @ViewChild('listView')
  listViewComponent: RadListViewComponent;

  onItemLoading(args) {
    if (isIOS) {
      const newcolor = new Color('#eeeeee');
      args.ios.backgroundView.backgroundColor = newcolor.ios;
    }
  }

  updateLoadOnDemandMode(hasMoreItems: boolean) {
    if (hasMoreItems) {
      this.listViewComponent.listView.loadOnDemandMode =
        ListViewLoadOnDemandMode[ListViewLoadOnDemandMode.Auto];
    } else {
      this.listViewComponent.listView.loadOnDemandMode =
        ListViewLoadOnDemandMode[ListViewLoadOnDemandMode.None];
    }

    this.listViewComponent.listView.notifyLoadOnDemandFinished();
  }

  scrollToIndex(index: number) {
    this.listViewComponent.listView.scrollToIndex(index);
  }
}
