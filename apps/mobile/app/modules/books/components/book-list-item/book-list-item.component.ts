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
        // as books are loaded dynamicaly and to not emit event each time the book value changed, first off listener
        this.ratingElemRef.nativeElement.off('valueChange');
        this.ratingElemRef.nativeElement.value = this._book.rating;
        this.ratingElemRef.nativeElement.on('valueChange', args => {
          const val = args.object.get('value');
          this.onRate.emit(new BookRateEvent(this.book.id, val));
        });
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
    this.ratingElemRef.nativeElement.value = this._book.rating;
  }
}
