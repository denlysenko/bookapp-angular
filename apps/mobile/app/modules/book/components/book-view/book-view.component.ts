import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';

import { Book, BookRateEvent, BookViewBaseComponent } from '@bookapp-angular/books-core';

@Component({
  moduleId: module.id,
  selector: 'ba-book-view',
  templateUrl: './book-view.component.html',
  styleUrls: ['./book-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookViewComponent extends BookViewBaseComponent
  implements AfterViewInit {
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

  private _book: Book;

  @ViewChild('rating') ratingElemRef: ElementRef;

  ngAfterViewInit() {
    this.ratingElemRef.nativeElement.value = this._book.rating;
  }
}
