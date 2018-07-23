import { OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { BaseComponent } from '@bookapp-angular/core';
import { BOOK_QUERY } from '@bookapp-angular/graphql';
import { Apollo } from 'apollo-angular';

import { Book, BookResponse } from '../models';

export abstract class BookPageBaseComponent extends BaseComponent
  implements OnInit {
  book$: Observable<Book>;
  isLoading: boolean;

  protected abstract apollo: Apollo;
  protected abstract route: ActivatedRoute;

  ngOnInit() {
    const slug = this.route.snapshot.paramMap.get('slug');

    this.book$ = this.apollo
      .watchQuery<BookResponse>({
        query: BOOK_QUERY,
        variables: {
          slug
        },
        fetchPolicy: 'network-only',
        notifyOnNetworkStatusChange: true
      })
      .valueChanges.pipe(
        tap(({ loading }) => (this.isLoading = loading)),
        map(({ data }) => data.book)
      );
  }
}
