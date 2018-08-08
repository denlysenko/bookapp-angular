import { Component, OnInit } from '@angular/core';

import { takeUntil } from 'rxjs/operators';

import { BestBooksResponse, Book, BookRateEvent } from '@bookapp-angular/books-core';
import { BaseComponent, LIMIT } from '@bookapp-angular/core';
import { BEST_BOOKS_QUERY, RATE_BOOK_MUTATION } from '@bookapp-angular/graphql';
import { Apollo, QueryRef } from 'apollo-angular';

@Component({
  templateUrl: './best-books-page.component.html',
  styleUrls: ['./best-books-page.component.scss']
})
export class BestBooksPageComponent extends BaseComponent implements OnInit {
  books: Book[];
  count: number;
  isLoading: boolean;

  private bestBooksQueryRef: QueryRef<BestBooksResponse>;
  private skip = 0;

  constructor(private apollo: Apollo) {
    super();
  }

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
