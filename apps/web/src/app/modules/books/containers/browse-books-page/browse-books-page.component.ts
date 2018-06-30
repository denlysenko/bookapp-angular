import { Component, OnInit } from '@angular/core';

import { BookFilter } from '@bookapp-angular/books-core';

@Component({
  templateUrl: './browse-books-page.component.html',
  styleUrls: ['./browse-books-page.component.scss']
})
export class BrowseBooksPageComponent implements OnInit {
  filter: BookFilter = {
    search: '',
    sortValue: ''
  };

  constructor() {}

  ngOnInit() {}

  sort(e) {
    console.log(e);
  }

  search(e) {
    console.log(e);
  }
}
