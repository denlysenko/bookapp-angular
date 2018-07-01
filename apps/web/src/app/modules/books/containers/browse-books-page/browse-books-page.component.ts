import { Component, OnInit } from '@angular/core';

import { BookFilter } from '@bookapp-angular/books-core';
import { StoreService } from '@bookapp-angular/core';

const FILTER_KEY = location.pathname;

@Component({
  templateUrl: './browse-books-page.component.html',
  styleUrls: ['./browse-books-page.component.scss']
})
export class BrowseBooksPageComponent implements OnInit {
  filter: BookFilter;

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
}
