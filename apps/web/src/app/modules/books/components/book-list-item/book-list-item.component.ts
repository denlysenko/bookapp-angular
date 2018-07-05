import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { Book, BookRateEvent } from '@bookapp-angular/books-core';

@Component({
  selector: 'ba-book-list-item',
  templateUrl: './book-list-item.component.html',
  styleUrls: ['./book-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookListItemComponent {
  @Input() book: Book;
  @Output() onRate = new EventEmitter<BookRateEvent>();

  rate(event: number) {
    this.onRate.emit(new BookRateEvent(this.book.id, event));
  }
}
