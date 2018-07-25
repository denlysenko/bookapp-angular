import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User, UserSelfResponse } from '@bookapp-angular/auth-core';
import { BookPageBaseComponent, BookService } from '@bookapp-angular/books-core';
import { ME_QUERY } from '@bookapp-angular/graphql';
import { Apollo } from 'apollo-angular';

@Component({
  selector: 'ba-book-page',
  templateUrl: './book-page.component.html',
  styleUrls: ['./book-page.component.scss']
})
export class BookPageComponent extends BookPageBaseComponent {
  user$: Observable<User>;

  constructor(
    protected route: ActivatedRoute,
    protected apollo: Apollo,
    protected bookService: BookService
  ) {
    super();

    this.user$ = this.apollo
      .query<UserSelfResponse>({
        query: ME_QUERY
      })
      .pipe(map(({ data }) => data.me));
  }
}
