import { OnInit } from '@angular/core';

import { takeUntil } from 'rxjs/operators';

import { BaseComponent, LIMIT } from '@bookapp-angular/core';
import { BEST_BOOKS_QUERY, BOOKMARKS_QUERY, RATE_BOOK_MUTATION } from '@bookapp-angular/graphql';
import { Apollo, QueryRef } from 'apollo-angular';

import { BestBooksResponse, Book, BookRateEvent } from '../models';

export abstract class BestBooksPageBaseComponent extends BaseComponent
  implements OnInit {
  books: Book[];
  count: number;
  isLoading: boolean;

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

    this.subscribeToBookQuery();
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
              __typename: 'BestBooksResponse'
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
          }

          store.writeQuery({
            query: BOOKMARKS_QUERY,
            variables,
            data
          });
        }
      })
      .subscribe();
  }

  private hasMoreItems(): boolean {
    return this.books.length < this.count;
  }

  private subscribeToBookQuery() {
    this.bestBooksQueryRef.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(({ data, loading }) => {
        this.isLoading = loading;
        if (loading) {
          return;
        }

        this.books = data.bestBooks.rows;
        this.count = data.bestBooks.count;
      });
  }
}
