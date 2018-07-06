import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Book, BookFilter, BookFilterInput, BookRateEvent, BookService } from '@bookapp-angular/books-core';
import { FILTER_KEYS, StoreService } from '@bookapp-angular/core';
import { Apollo } from 'apollo-angular';

@Component({
  templateUrl: './browse-books-page.component.html',
  styleUrls: ['./browse-books-page.component.scss']
})
export class BrowseBooksPageComponent implements OnInit {
  filter: BookFilter;
  books: Book[];
  count: number;

  private filterInput: BookFilterInput;
  private skip: 0;

  constructor(
    private bookService: BookService,
    private apollo: Apollo,
    private storeService: StoreService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.books = this.route.snapshot.data.books.rows;
    this.count = this.route.snapshot.data.books.count;
    this.filter = this.storeService.get(FILTER_KEYS.BROWSE_BOOKS) || {
      searchQuery: '',
      sortValue: ''
    };
    this.filterInput = { field: 'title', search: this.filter.searchQuery };
  }

  sort(sortValue: '' | 'views_desc' | 'createdAt_desc') {
    this.filter = {
      ...this.filter,
      sortValue
    };

    this.storeService.set(FILTER_KEYS.BROWSE_BOOKS, this.filter);

    const { filterInput, skip } = this;

    this.bookService
      .getBooks(false, filterInput, sortValue, skip)
      .subscribe(res => {
        // TODO loaderService.stop()
        this.books = res.rows;
        this.count = res.count;
      });
  }

  search(searchQuery: string) {
    // TODO loaderService.start()
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

    this.bookService
      .getBooks(false, filterInput, sortValue, skip)
      .subscribe(res => {
        // TODO loaderService.stop()
        this.books = res.rows;
        this.count = res.count;
      });
  }

  rate(event: BookRateEvent) {
    console.log(event);
  }

  private hasMore(): boolean {
    return this.books.length < this.count;
  }
}
