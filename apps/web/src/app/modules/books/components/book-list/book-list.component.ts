import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { Book, BookRateEvent } from '@bookapp-angular/books-core';

@Component({
  selector: 'ba-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookListComponent {
  @Input() books: Book[];
  @Output() onRate = new EventEmitter<BookRateEvent>();

  rate(event: BookRateEvent) {
    this.onRate.emit(event);
  }
}
