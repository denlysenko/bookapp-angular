import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';

import { Reading, UserSelfResponse } from '@bookapp-angular/auth-core';
import { BOOK_QUERY, ME_QUERY } from '@bookapp-angular/graphql';

import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BookResponse } from '../models';

@Injectable()
export class ReadBookResolver implements Resolve<Reading> {
  constructor(private apollo: Apollo) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Reading> {
    const slug = route.paramMap.get('slug');

    if (slug) {
      return this.apollo
        .query<BookResponse>({
          query: BOOK_QUERY,
          variables: {
            slug
          }
        })
        .pipe(map(res => ({ epubUrl: res.data.book.epubUrl, bookmark: null })));
    }

    return this.apollo
      .query<UserSelfResponse>({
        query: ME_QUERY
      })
      .pipe(map(res => res.data.me.reading));
  }
}
