import { OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { BookService } from '@bookapp-angular/books-core';
import { BaseComponent } from '@bookapp-angular/core';
import { BOOK_QUERY, BOOKMARKS_BY_USER_AND_BOOK_QUERY } from '@bookapp-angular/graphql';
import { Apollo } from 'apollo-angular';

import { Book, BookmarkByUserAndBook, BookResponse } from '../models';

export abstract class BookPageBaseComponent extends BaseComponent
  implements OnInit {
  book$: Observable<Book>;
  bookmarks$: Observable<string[]>;
  isLoading: boolean;

  protected abstract apollo: Apollo;
  protected abstract route: ActivatedRoute;
  protected abstract bookService: BookService;

  ngOnInit() {
    const slug = this.route.snapshot.paramMap.get('slug');
    // as I could not find another way to pass bookId through navigation, use query params
    const bookId = this.route.snapshot.queryParamMap.get('bookId');

    this.book$ = this.apollo
      .watchQuery<BookResponse>({
        query: BOOK_QUERY,
        variables: {
          slug
        },
        fetchPolicy: 'network-only',
        notifyOnNetworkStatusChange: true
      })
      .valueChanges.pipe(
        tap(({ loading }) => (this.isLoading = loading)),
        map(({ data }) => data.book)
      );

    this.bookmarks$ = this.apollo
      .watchQuery<BookmarkByUserAndBook>({
        query: BOOKMARKS_BY_USER_AND_BOOK_QUERY,
        variables: {
          bookId
        }
      })
      .valueChanges.pipe(map(({ data }) => data.userBookmarksByBook));
  }

  submitComment(bookId: string, text: string, slug: string) {
    this.isLoading = true;
    this.bookService.addComment(bookId, text, slug);
  }
}
