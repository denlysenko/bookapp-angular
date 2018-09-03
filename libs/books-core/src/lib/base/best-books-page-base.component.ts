import { OnInit } from '@angular/core';

import {
  BestBooksResponse,
  Book,
  BookmarksResponse,
  BookRateEvent
} from '@bookapp-angular/books-core';
import { BaseComponent, LIMIT } from '@bookapp-angular/core';
import { BEST_BOOKS_QUERY, RATE_BOOK_MUTATION } from '@bookapp-angular/graphql';

import { Apollo, QueryRef } from 'apollo-angular';
import { ApolloQueryResult } from 'apollo-client';
import { takeUntil } from 'rxjs/operators';
import { ObservableArray } from 'tns-core-modules/data/observable-array/observable-array';

export abstract class BestBooksPageBaseComponent extends BaseComponent
  implements OnInit {
  books: Book[] | ObservableArray<Book>;
  count: number;
  isLoading = true;

  protected abstract apollo: Apollo;

  private bestBooksQueryRef: QueryRef<BestBooksResponse>;
  private skip = 0;

  ngOnInit() {
    const { skip } = this;

    this.bestBooksQueryRef = this.apollo.watchQuery<BestBooksResponse>({
      query: BEST_BOOKS_QUERY,
      variables: {
        skip,
        first: LIMIT
      },
      fetchPolicy: 'network-only',
      notifyOnNetworkStatusChange: true
    });

    this.bestBooksQueryRef.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(this.handleBooksChanges.bind(this));
  }

  loadMore() {
    if (this.isLoading) {
      return;
    }

    if (this.hasMoreItems()) {
      this.skip = this.books.length;

      const { skip } = this;

      return this.bestBooksQueryRef.fetchMore({
        variables: {
          skip
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          if (!fetchMoreResult) {
            return previousResult;
          }

          const { rows, count } = fetchMoreResult.bestBooks;

          return {
            bestBooks: {
              count,
              rows: [...previousResult.bestBooks.rows, ...rows],
              __typename: 'BooksResponse'
            }
          };
        }
      });
    }
  }

  rate(event: BookRateEvent) {
    const { skip } = this;
    const variables = {
      skip,
      first: LIMIT
    };

    const { bookId, rate } = event;

    this.apollo
      .mutate({
        mutation: RATE_BOOK_MUTATION,
        variables: {
          bookId,
          rate
        },
        update: (store, { data: { rateBook } }) => {
          const data: BestBooksResponse = store.readQuery({
            query: BEST_BOOKS_QUERY,
            variables
          });

          if (rateBook.rating < 5) {
            const updatedBookIndex = data.bestBooks.rows.findIndex(
              ({ id }) => id === bookId
            );
            if (updatedBookIndex > -1) {
              data.bestBooks.rows.splice(updatedBookIndex, 1);
            }
          } else {
            const updatedBook = data.bestBooks.rows.find(
              ({ id }) => id === bookId
            );
            updatedBook.rating = rateBook.rating;
            updatedBook.total_rates = rateBook.total_rates;
            updatedBook.total_rating = rateBook.total_rating;
          }

          store.writeQuery({
            query: BEST_BOOKS_QUERY,
            variables,
            data
          });
        }
      })
      .subscribe();
  }

  protected abstract handleBooksChanges(
    result: ApolloQueryResult<BookmarksResponse>
  ): void;

  protected hasMoreItems(): boolean {
    return this.books.length < this.count;
  }
}
