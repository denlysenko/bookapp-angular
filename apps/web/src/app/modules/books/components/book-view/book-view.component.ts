import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { User } from '@bookapp-angular/auth-core';
import { Book } from '@bookapp-angular/books-core';
import { BOOKMARKS } from '@bookapp-angular/core';

@Component({
  selector: 'ba-book-view',
  templateUrl: './book-view.component.html',
  styleUrls: ['./book-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookViewComponent {
  @Input() book: Book;
  @Input() bookmarks: string[];
  @Input()
  set user(value: User) {
    if (value) {
      this._isAdmin = value.roles.includes('admin');
    }
  }

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
