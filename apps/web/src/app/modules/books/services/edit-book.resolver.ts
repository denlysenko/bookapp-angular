import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Book, BookResponse } from '@bookapp-angular/books-core';
import { BOOK_FOR_EDIT_QUERY } from '@bookapp-angular/graphql';
import { Apollo } from 'apollo-angular';

@Injectable()
export class EditBookResolver implements Resolve<Book> {
  constructor(private apollo: Apollo) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    const slug = route.paramMap.get('slug');
    return this.apollo
      .query<BookResponse>({
        query: BOOK_FOR_EDIT_QUERY,
        variables: {
          slug
        }
      })
      .pipe(map(res => res.data.book));
  }
}
