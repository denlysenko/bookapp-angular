import { Component, OnInit } from '@angular/core';

import { Book, BookFilter, BookRateEvent } from '@bookapp-angular/books-core';
import { StoreService } from '@bookapp-angular/core';

const FILTER_KEY = 'BROWSE_BOOKS';

@Component({
  templateUrl: './browse-books-page.component.html',
  styleUrls: ['./browse-books-page.component.scss']
})
export class BrowseBooksPageComponent implements OnInit {
  filter: BookFilter;
  books: Book[];

  constructor(private storeService: StoreService) {}

  ngOnInit() {
    this.filter = this.storeService.get(FILTER_KEY) || {
      searchQuery: '',
      sortValue: ''
    };
  }

  sort(sortValue: string) {
    this.storeService.set(FILTER_KEY, {
      ...this.filter,
      sortValue
    });

    console.log(sortValue);
  }

  search(searchQuery: string) {
    this.storeService.set(FILTER_KEY, {
      ...this.filter,
      searchQuery
    });

    console.log(searchQuery);
  }

  rate(event: BookRateEvent) {
    console.log(event);
  }
}
