import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { BookPageBaseComponent, BookService } from '@bookapp-angular/books-core';
import { Apollo } from 'apollo-angular';

@Component({
  moduleId: module.id,
  selector: 'ba-book-page',
  templateUrl: './book-page.component.html',
  styleUrls: ['./book-page.component.scss']
})
export class BookPageComponent extends BookPageBaseComponent {
  constructor(
    protected route: ActivatedRoute,
    protected apollo: Apollo,
    protected bookService: BookService
  ) {
    super();
  }
}
