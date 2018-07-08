import { Component, OnInit } from '@angular/core';

import { takeUntil } from 'rxjs/operators';

import { Book, BookFilter, BookFilterInput, BookRateEvent, BookService, BooksResponse } from '@bookapp-angular/books-core';
import { BaseComponent, DEFAULT_SORT_VALUE, FILTER_KEYS, LIMIT, StoreService } from '@bookapp-angular/core';
import { FREE_BOOKS_QUERY } from '@bookapp-angular/graphql';
import { Apollo, QueryRef } from 'apollo-angular';

@Component({
  templateUrl: './browse-books-page.component.html',
  styleUrls: ['./browse-books-page.component.scss']
})
export class BrowseBooksPageComponent extends BaseComponent implements OnInit {
  filter: BookFilter;
  books: Book[];
  count: number;
  isLoading: boolean;

  private bookQueryRef: QueryRef<BooksResponse>;
  private filterInput: BookFilterInput;
  private skip = 0;

  constructor(
    private apollo: Apollo,
    private storeService: StoreService,
    private bookService: BookService
  ) {
    super();
  }

  ngOnInit() {
    this.filter = this.storeService.get(FILTER_KEYS.BROWSE_BOOKS) || {
      searchQuery: '',
      sortValue: DEFAULT_SORT_VALUE
    };
    this.filterInput = { field: 'title', search: this.filter.searchQuery };

    this.bookQueryRef = this.apollo.watchQuery<BooksResponse>({
      query: FREE_BOOKS_QUERY,
      variables: {
        paid: false,
        filter: this.filterInput,
        skip: this.skip,
        first: LIMIT,
        orderBy: this.filter.sortValue
      }
    });

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

  sort(sortValue: 'id_desc' | 'views_desc' | 'createdAt_desc') {
    this.filter = {
      ...this.filter,
      sortValue
    };

    this.storeService.set(FILTER_KEYS.BROWSE_BOOKS, this.filter);

    const { filterInput, skip } = this;

    this.bookQueryRef.refetch({
      paid: false,
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
    this.storeService.set(FILTER_KEYS.BROWSE_BOOKS, this.filter);

    this.filterInput = {
      ...this.filterInput,
      search: searchQuery
    };

    const { filterInput, filter: { sortValue }, skip } = this;

    this.bookQueryRef.refetch({
      paid: false,
      filter: filterInput,
      skip: skip,
      first: LIMIT,
      orderBy: sortValue
    });
  }

  rate(event: BookRateEvent) {
    const { filterInput, filter: { sortValue }, skip } = this;
    const variables = {
      paid: false,
      filter: filterInput,
      skip,
      first: LIMIT,
      orderBy: sortValue
    };

    this.bookService.rate(event, FREE_BOOKS_QUERY, variables);
  }

  private hasMore(): boolean {
    return this.books.length < this.count;
  }
}
