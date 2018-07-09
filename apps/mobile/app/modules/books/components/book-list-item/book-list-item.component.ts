import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';

import { Book, BookRateEvent } from '@bookapp-angular/books-core';

@Component({
  moduleId: module.id,
  selector: 'ba-book-list-item',
  templateUrl: './book-list-item.component.html',
  styleUrls: ['./book-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookListItemComponent implements AfterViewInit {
  @Input()
  set book(value: Book) {
    if (value) {
      this._book = value;
      if (this.ratingElemRef) {
        // refresh StarRating value after book update, e.g. rating has changed
        this.ratingElemRef.nativeElement.value = this._book.rating;
      }
    }
  }
  get book(): Book {
    return this._book;
  }

  @ViewChild('rating') ratingElemRef: ElementRef;

  @Output() onRate = new EventEmitter<BookRateEvent>();

  private _book: Book;

  ngAfterViewInit() {
    if (this.ratingElemRef.nativeElement) {
      this.ratingElemRef.nativeElement.on('valueChange', args => {
        const value = args.object.get('value');
        this.onRate.emit(new BookRateEvent(this.book.id, value));
      });
    }
  }
}
