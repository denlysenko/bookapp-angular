import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { Book, BookRateEvent } from '@bookapp-angular/books-core';
import { Color } from 'color';
import { isIOS } from 'platform';
import { ObservableArray } from 'tns-core-modules/data/observable-array/observable-array';

@Component({
  moduleId: module.id,
  selector: 'ba-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookListComponent {
  bookItems: ObservableArray<Book>;

  @Input()
  set books(value: Book[]) {
    this.bookItems = new ObservableArray(value);
  }

  @Output() onRate = new EventEmitter<BookRateEvent>();

  onLoadMoreItemsRequested(e) {
    console.log(e);
  }

  onItemLoading(args) {
    if (isIOS) {
      const newcolor = new Color('#eeeeee');
      args.ios.backgroundView.backgroundColor = newcolor.ios;
    }
  }

  rate(event: BookRateEvent) {
    this.onRate.emit(event);
  }
}
