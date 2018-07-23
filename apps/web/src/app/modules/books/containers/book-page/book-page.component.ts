import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { BookPageBaseComponent } from '@bookapp-angular/books-core';
import { Apollo } from 'apollo-angular';

@Component({
  selector: 'ba-book-page',
  templateUrl: './book-page.component.html',
  styleUrls: ['./book-page.component.scss']
})
export class BookPageComponent extends BookPageBaseComponent {
  constructor(protected route: ActivatedRoute, protected apollo: Apollo) {
    super();
  }
}
