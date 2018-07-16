import { Route } from '@angular/router';

import { AuthGuard } from '@bookapp-angular/core';

import { BrowseBooksPageComponent } from './containers/browse-books-page/browse-books-page.component';
import { BuyBooksPageComponent } from './containers/buy-books-page/buy-books-page.component';

export const routes: Route[] = [
  {
    path: 'browse',
    component: BrowseBooksPageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'buy',
    component: BuyBooksPageComponent,
    canActivate: [AuthGuard]
  }
];
