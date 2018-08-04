import { Component } from '@angular/core';

import { BookService } from '@bookapp-angular/books-core';
import { StoreService } from '@bookapp-angular/core';
import { Apollo } from 'apollo-angular';

import { BooksPageBaseComponent } from '../../base/books-page-base.component';

@Component({
  templateUrl: './browse-books-page.component.html',
  styleUrls: ['./browse-books-page.component.scss']
})
export class BrowseBooksPageComponent extends BooksPageBaseComponent {
  protected paid = false;

  constructor(
    protected apollo: Apollo,
    protected storeService: StoreService
  ) {
    super();
  }
}
