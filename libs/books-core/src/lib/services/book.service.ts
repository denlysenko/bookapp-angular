import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';

import { DEFAULT_SORT_VALUE, LIMIT } from '@bookapp-angular/core';
import {
  ADD_COMMENT_MUTATION,
  ADD_TO_BOOKMARKS_MUTATION,
  BOOK_QUERY,
  BOOKMARKS_BY_USER_AND_BOOK_QUERY,
  CREATE_BOOK_MUTATION,
  FREE_BOOKS_QUERY,
  PAID_BOOKS_QUERY,
  REMOVE_FROM_BOOKMARKS_MUTATION,
  UPDATE_BOOK_MUTATION,
} from '@bookapp-angular/graphql';
import { Apollo } from 'apollo-angular';

import {
  AddOrRemoveBookmarkEvent,
  Book,
  BookFilterInput,
  BookmarkByUserAndBookResponse,
  BookResponse,
  BooksResponse,
  CreateBookResponse,
} from '../models';

@Injectable()
export class BookService {
  constructor(private apollo: Apollo) {}

  create(book: Book) {
    return this.apollo.mutate<CreateBookResponse>({
      mutation: CREATE_BOOK_MUTATION,
      variables: {
        book
      }
    });
  }

  update(id: string, book: Book) {
    return this.apollo.mutate<CreateBookResponse>({
      mutation: UPDATE_BOOK_MUTATION,
      variables: {
        id,
        book
      }
    });
  }

  getBooks(
    paid: boolean,
    filter: BookFilterInput,
    orderBy = DEFAULT_SORT_VALUE,
    skip = 0,
    first = LIMIT
  ) {
    return this.apollo
      .query<BooksResponse>({
        query: paid ? PAID_BOOKS_QUERY : FREE_BOOKS_QUERY,
        variables: {
          paid,
          filter,
          skip,
          first,
          orderBy
        }
      })
      .pipe(map(res => res.data.books));
  }

  addComment(bookId: string, text: string, slug: string) {
    this.apollo
      .mutate({
        mutation: ADD_COMMENT_MUTATION,
        variables: {
          bookId,
          text
        },
        update: (store, { data: { addComment } }) => {
          const data: BookResponse = store.readQuery({
            query: BOOK_QUERY,
            variables: {
              slug
            }
          });

          data.book.comments.push(addComment);

          store.writeQuery({
            query: BOOK_QUERY,
            variables: {
              slug
            },
            data
          });
        }
      })
      .subscribe();
  }

  addToBookmarks(event: AddOrRemoveBookmarkEvent) {
    const { type, bookId } = event;

    this.apollo
      .mutate({
        mutation: ADD_TO_BOOKMARKS_MUTATION,
        variables: {
          type,
          bookId
        },
        update: (store, { data: { addToBookmarks } }) => {
          const data: BookmarkByUserAndBookResponse = store.readQuery({
            query: BOOKMARKS_BY_USER_AND_BOOK_QUERY,
            variables: {
              bookId
            }
          });

          data.userBookmarksByBook.push(addToBookmarks);

          store.writeQuery({
            query: BOOKMARKS_BY_USER_AND_BOOK_QUERY,
            variables: {
              bookId
            },
            data
          });
        }
      })
      .subscribe();
  }

  removeFromBookmarks(event: AddOrRemoveBookmarkEvent) {
    const { type, bookId } = event;

    this.apollo
      .mutate({
        mutation: REMOVE_FROM_BOOKMARKS_MUTATION,
        variables: {
          type,
          bookId
        },
        update: (store, { data: { removeFromBookmarks } }) => {
          const data: BookmarkByUserAndBookResponse = store.readQuery({
            query: BOOKMARKS_BY_USER_AND_BOOK_QUERY,
            variables: {
              bookId
            }
          });

          data.userBookmarksByBook = data.userBookmarksByBook.filter(
            bookmark => bookmark.type !== removeFromBookmarks.type
          );

          store.writeQuery({
            query: BOOKMARKS_BY_USER_AND_BOOK_QUERY,
            variables: {
              bookId
            },
            data
          });
        }
      })
      .subscribe();
  }
}
