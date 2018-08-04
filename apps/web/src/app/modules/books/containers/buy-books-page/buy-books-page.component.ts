import { Component } from '@angular/core';

import { StoreService } from '@bookapp-angular/core';
import { Apollo } from 'apollo-angular';

import { BooksPageBaseComponent } from '../../base/books-page-base.component';

@Component({
  templateUrl: './buy-books-page.component.html',
  styleUrls: ['./buy-books-page.component.scss']
})
export class BuyBooksPageComponent extends BooksPageBaseComponent {
  protected paid = true;

  constructor(protected apollo: Apollo, protected storeService: StoreService) {
    super();
  }
}
