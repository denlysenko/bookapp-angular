import { Route } from '@angular/router';

import { BrowseBooksResolver } from '@bookapp-angular/books-core/src';
import { AuthGuard } from '@bookapp-angular/core';

import { BrowseBooksPageComponent } from './containers/browse-books-page/browse-books-page.component';

export const routes: Route[] = [
  {
    path: 'browse',
    component: BrowseBooksPageComponent,
    canActivate: [AuthGuard],
    resolve: {
      books: BrowseBooksResolver
    }
  }
  // {
  //   path: 'buy',
  //   component: BuyBooksPageComponent,
  //   canActivate: [AuthGuard]
  // }
];
