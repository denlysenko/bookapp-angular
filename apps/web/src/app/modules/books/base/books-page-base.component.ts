import { OnInit } from '@angular/core';

import { takeUntil } from 'rxjs/operators';

import { Book, BookFilter, BookFilterInput, BookRateEvent, BookService, BooksResponse } from '@bookapp-angular/books-core';
import { BaseComponent, DEFAULT_SORT_VALUE, FILTER_KEYS, LIMIT, StoreService } from '@bookapp-angular/core';
import { FREE_BOOKS_QUERY, PAID_BOOKS_QUERY } from '@bookapp-angular/graphql';
import { Apollo, QueryRef } from 'apollo-angular';

export abstract class BooksPageBaseComponent extends BaseComponent
  implements OnInit {
  filter: BookFilter;
  books: Book[];
  count: number;
  isLoading: boolean;

  protected abstract paid: boolean;

  protected abstract apollo: Apollo;
  protected abstract storeService: StoreService;
  protected abstract bookService: BookService;

  private bookQueryRef: QueryRef<BooksResponse>;
  private filterInput: BookFilterInput;
  private skip = 0;

  ngOnInit() {
    this.filter = this.storeService.get(
      FILTER_KEYS[this.paid ? 'BUY_BOOKS' : 'BROWSE_BOOKS']
    ) || {
      searchQuery: '',
      sortValue: DEFAULT_SORT_VALUE
    };
    this.filterInput = { field: 'title', search: this.filter.searchQuery };

    this.bookQueryRef = this.apollo.watchQuery<BooksResponse>({
      query: this.paid ? PAID_BOOKS_QUERY : FREE_BOOKS_QUERY,
      variables: {
        paid: this.paid,
        filter: this.filterInput,
        skip: this.skip,
        first: LIMIT,
        orderBy: this.filter.sortValue
      },
      fetchPolicy: 'network-only',
      notifyOnNetworkStatusChange: true
    });

    this.subscribeToBookQuery();
  }

  sort(sortValue: 'id_desc' | 'views_desc' | 'createdAt_desc') {
    this.filter = {
      ...this.filter,
      sortValue
    };

    this.storeService.set(
      FILTER_KEYS[this.paid ? 'BUY_BOOKS' : 'BROWSE_BOOKS'],
      this.filter
    );

    this.skip = 0;
    const { filterInput, skip, paid } = this;

    this.bookQueryRef.refetch({
      paid,
      filter: filterInput,
      skip: skip,
      first: LIMIT,
      orderBy: this.filter.sortValue
    });
  }

  search(searchQuery: string) {
    this.filter = {
      ...this.filter,
      searchQuery
    };
    this.storeService.set(
      FILTER_KEYS[this.paid ? 'BUY_BOOKS' : 'BROWSE_BOOKS'],
      this.filter
    );

    this.filterInput = {
      ...this.filterInput,
      search: searchQuery
    };
    this.skip = 0;

    const { filterInput, filter: { sortValue }, skip, paid } = this;

    this.bookQueryRef.refetch({
      paid,
      filter: filterInput,
      skip: skip,
      first: LIMIT,
      orderBy: sortValue
    });
  }

  loadMore() {
    if (this.isLoading) {
      return;
    }

    if (this.hasMoreItems()) {
      this.skip = this.books.length;

      const { skip } = this;

      return this.bookQueryRef.fetchMore({
        variables: {
          skip
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          if (!fetchMoreResult) {
            return previousResult;
          }

          const { rows, count } = fetchMoreResult.books;

          return {
            books: {
              count,
              rows: [...previousResult.books.rows, ...rows],
              __typename: 'BookResponse'
            }
          };
        }
      });
    }
  }

  rate(event: BookRateEvent) {
    const { filterInput, filter: { sortValue }, skip, paid } = this;
    const variables = {
      paid,
      filter: filterInput,
      skip,
      first: LIMIT,
      orderBy: sortValue
    };

    this.bookService.rate(
      event,
      paid ? PAID_BOOKS_QUERY : FREE_BOOKS_QUERY,
      variables
    );
  }

  private hasMoreItems(): boolean {
    return this.books.length < this.count;
  }

  private subscribeToBookQuery() {
    this.bookQueryRef.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(({ data, loading }) => {
        this.isLoading = loading;
        if (loading) {
          return;
        }

        this.books = data.books.rows;
        this.count = data.books.count;
      });
  }
}
