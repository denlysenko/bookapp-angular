import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { Book, BookRateEvent } from '@bookapp-angular/books-core';
import { Page } from 'ui/page';

@Component({
  moduleId: module.id,
  selector: 'ba-book-list-item',
  templateUrl: './book-list-item.component.html',
  styleUrls: ['./book-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookListItemComponent {
  @Input()
  set book(value: Book) {
    if (value) {
      this._book = value;
      this.addRatingListener();
    }
  }
  get book(): Book {
    return this._book;
  }

  @Output() onRate = new EventEmitter<BookRateEvent>();

  private _book: Book;

  constructor(private page: Page) {}

  private addRatingListener() {
    const rating = this.page.getViewById(`rating_${this.book.id}`);
    if (rating) {
      rating.on('valueChange', args => {
        const value = args.object.get('value');
        this.onRate.emit(new BookRateEvent(this.book.id, value));
      });
    }
  }
}
