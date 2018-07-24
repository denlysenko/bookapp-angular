export interface BookmarkByUserAndBookResponse {
  userBookmarksByBook: Array<{ type: string }>;
}

export interface AddOrRemoveBookmarkEvent {
  bookId: string;
  type: string;
}
