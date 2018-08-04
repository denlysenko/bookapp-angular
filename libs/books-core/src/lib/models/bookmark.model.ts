import { ListResponse } from '@bookapp-angular/core';

import { Book } from './book.model';

export interface Bookmark {
  type: string;
  book: Book;
}

export interface BookmarkByUserAndBookResponse {
  userBookmarksByBook: Array<{ type: string }>;
}

export interface AddOrRemoveBookmarkEvent {
  bookId: string;
  type: string;
}

export interface BookmarksResponse {
  bookmarks: ListResponse<Bookmark>;
}
