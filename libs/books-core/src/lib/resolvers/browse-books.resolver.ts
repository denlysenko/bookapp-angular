import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { Observable } from 'rxjs';

import { DEFAULT_SORT_VALUE, FILTER_KEYS, ListResponse, StoreService } from '@bookapp-angular/core';

import { Book } from '../models/book.model';
import { BookService } from '../services';

@Injectable()
export class BrowseBooksResolver implements Resolve<ListResponse<Book>> {
  constructor(
    private bookService: BookService,
    private storeService: StoreService
  ) {}

  resolve(): Observable<ListResponse<Book>> {
    const filter = this.storeService.get(FILTER_KEYS.BROWSE_BOOKS);

    const searchValue = (filter && filter.searchValue) || '';
    const sortValue = (filter && filter.sortValue) || DEFAULT_SORT_VALUE;

    return this.bookService.getBooks(
      false,
      { field: 'title', search: searchValue },
      sortValue
    );
  }
}
