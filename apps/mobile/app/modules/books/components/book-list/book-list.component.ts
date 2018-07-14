import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

import { Book, BookRateEvent } from '@bookapp-angular/books-core';
import { Color } from 'color';
import { ListViewEventData, ListViewLoadOnDemandMode, RadListView } from 'nativescript-ui-listview';
import { RadListViewComponent } from 'nativescript-ui-listview/angular';
import { isAndroid, isIOS } from 'platform';
import { ObservableArray } from 'tns-core-modules/data/observable-array/observable-array';

@Component({
  moduleId: module.id,
  selector: 'ba-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookListComponent implements OnInit {
  bookItems: ObservableArray<Book>;

  @ViewChild('listView') listViewComponent: RadListViewComponent;

  @Input() count: number;

  @Input()
  set books(value: Book[]) {
    if (value) {
      this.bookItems = new ObservableArray(value);
      this.updateLoadOnDemandMode();
    }
  }

  @Output() onRate = new EventEmitter<BookRateEvent>();

  @Output() onLoadMoreItemsRequested = new EventEmitter<any>();

  ngOnInit() {
    if (isAndroid) {
      this.listViewComponent.listView.loadOnDemandBufferSize = 2;
    } else {
      this.listViewComponent.listView.loadOnDemandBufferSize = 1;
    }
  }

  moreItemsRequested(args: ListViewEventData) {
    const listView: RadListView = args.object;
    if (this.bookItems.length === this.count) {
      listView.loadOnDemandMode =
        ListViewLoadOnDemandMode[ListViewLoadOnDemandMode.None];
      listView.notifyLoadOnDemandFinished();
      return;
    }

    this.onLoadMoreItemsRequested.emit();
  }

  onItemLoading(args) {
    if (isIOS) {
      const newcolor = new Color('#eeeeee');
      args.ios.backgroundView.backgroundColor = newcolor.ios;
    }
  }

  private updateLoadOnDemandMode() {
    if (this.bookItems.length < this.count) {
      this.listViewComponent.listView.loadOnDemandMode =
        ListViewLoadOnDemandMode[ListViewLoadOnDemandMode.Auto];
    } else {
      this.listViewComponent.listView.loadOnDemandMode =
        ListViewLoadOnDemandMode[ListViewLoadOnDemandMode.None];
    }
    this.listViewComponent.listView.notifyLoadOnDemandFinished();
  }
}
