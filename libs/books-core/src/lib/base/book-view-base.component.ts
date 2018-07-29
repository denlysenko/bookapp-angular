import { EventEmitter, Input, Output } from '@angular/core';

import { BOOKMARKS } from '@bookapp-angular/core';

import { AddOrRemoveBookmarkEvent, Book, BookRateEvent } from '../models';

export abstract class BookViewBaseComponent {
  BOOKMARKS = BOOKMARKS;

  @Input() book: Book;
  @Input() bookmarks: string[];

  @Output() onAddBookmark = new EventEmitter<AddOrRemoveBookmarkEvent>();
  @Output() onRemoveBookmark = new EventEmitter<AddOrRemoveBookmarkEvent>();
  @Output() onRate = new EventEmitter<BookRateEvent>();

  get inFavourites(): boolean {
    return this.bookmarks && this.bookmarks.includes(BOOKMARKS.FAVOURITE);
  }

  get inWishlist(): boolean {
    return this.bookmarks && this.bookmarks.includes(BOOKMARKS.WISHLIST);
  }

  get inMustread(): boolean {
    return this.bookmarks && this.bookmarks.includes(BOOKMARKS.MUSTREAD);
  }

  rate(event: number) {
    this.onRate.emit(new BookRateEvent(this.book.id, event));
  }
}
