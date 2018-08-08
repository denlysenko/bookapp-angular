import { Route } from '@angular/router';

import { AuthGuard, BOOKMARKS } from '@bookapp-angular/core';

import { BookmarksPageComponent } from './containers/bookmarks-page/bookmarks-page.component';
import { BrowseBooksPageComponent } from './containers/browse-books-page/browse-books-page.component';
import { BuyBooksPageComponent } from './containers/buy-books-page/buy-books-page.component';
import { BestBooksPageComponent } from './containers/best-books-page/best-books-page.component';

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
  },
  {
    path: 'favourite',
    component: BookmarksPageComponent,
    canActivate: [AuthGuard],
    data: {
      type: BOOKMARKS.FAVOURITE
    }
  },
  {
    path: 'mustread',
    component: BookmarksPageComponent,
    canActivate: [AuthGuard],
    data: {
      type: BOOKMARKS.MUSTREAD
    }
  },
  {
    path: 'wishlist',
    component: BookmarksPageComponent,
    canActivate: [AuthGuard],
    data: {
      type: BOOKMARKS.WISHLIST
    }
  },
  {
    path: 'best',
    component: BestBooksPageComponent,
    canActivate: [AuthGuard]
  }
];
