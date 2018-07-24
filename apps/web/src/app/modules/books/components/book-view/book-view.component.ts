import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { User } from '@bookapp-angular/auth-core';
import { AddOrRemoveBookmarkEvent, Book } from '@bookapp-angular/books-core';
import { BOOKMARKS } from '@bookapp-angular/core';

@Component({
  selector: 'ba-book-view',
  templateUrl: './book-view.component.html',
  styleUrls: ['./book-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookViewComponent {
  BOOKMARKS = BOOKMARKS;

  @Input() book: Book;
  @Input() bookmarks: string[];
  @Input()
  set user(value: User) {
    if (value) {
      this._isAdmin = value.roles.includes('admin');
    }
  }

  @Output() onAddBookmark = new EventEmitter<AddOrRemoveBookmarkEvent>();
  @Output() onRemoveBookmark = new EventEmitter<AddOrRemoveBookmarkEvent>();

  get isAdmin(): boolean {
    return this._isAdmin;
  }

  get inFavourites(): boolean {
    return this.bookmarks && this.bookmarks.includes(BOOKMARKS.FAVOURITE);
  }

  get inWishlist(): boolean {
    return this.bookmarks && this.bookmarks.includes(BOOKMARKS.WISHLIST);
  }

  get inMustread(): boolean {
    return this.bookmarks && this.bookmarks.includes(BOOKMARKS.MUSTREAD);
  }

  private _isAdmin: boolean;
}
