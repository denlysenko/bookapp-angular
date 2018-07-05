import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Book, BookFilter, BookRateEvent, BookService } from '@bookapp-angular/books-core';
import { FILTER_KEYS, StoreService } from '@bookapp-angular/core';
import { Apollo } from 'apollo-angular';

@Component({
  templateUrl: './browse-books-page.component.html',
  styleUrls: ['./browse-books-page.component.scss']
})
export class BrowseBooksPageComponent implements OnInit {
  filter: BookFilter;
  books: Book[];

  constructor(
    private bookService: BookService,
    private apollo: Apollo,
    private storeService: StoreService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.books = this.route.snapshot.data.books;
    this.filter = this.storeService.get(FILTER_KEYS.BROWSE_BOOKS) || {
      searchQuery: '',
      sortValue: ''
    };
  }

  sort(sortValue: string) {
    this.storeService.set(FILTER_KEYS.BROWSE_BOOKS, {
      ...this.filter,
      sortValue
    });

    console.log(sortValue);
  }

  search(searchQuery: string) {
    this.storeService.set(FILTER_KEYS.BROWSE_BOOKS, {
      ...this.filter,
      searchQuery
    });

    console.log(searchQuery);
  }

  rate(event: BookRateEvent) {
    console.log(event);
  }
}
