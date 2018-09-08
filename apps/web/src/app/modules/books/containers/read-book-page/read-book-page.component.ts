import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ReadBookPageBaseComponent } from '@bookapp-angular/books-core';

import { Apollo } from 'apollo-angular';

@Component({
  templateUrl: './read-book-page.component.html',
  styleUrls: ['./read-book-page.component.scss']
})
export class ReadBookPageComponent extends ReadBookPageBaseComponent
  implements OnDestroy {
  constructor(protected route: ActivatedRoute, protected apollo: Apollo) {
    super();
  }
}
