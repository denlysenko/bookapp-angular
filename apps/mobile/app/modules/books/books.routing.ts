import { Route } from '@angular/router';

import { AuthGuard, BOOKMARKS } from '@bookapp-angular/core';
import { ReadBookResolver } from '@bookapp-angular/books-core';

import { BookmarksPageComponent } from './containers/bookmarks-page/bookmarks-page.component';
import { BrowseBooksPageComponent } from './containers/browse-books-page/browse-books-page.component';
import { BuyBooksPageComponent } from './containers/buy-books-page/buy-books-page.component';
import { BestBooksPageComponent } from './containers/best-books-page/best-books-page.component';
import { ReadBookPageComponent } from './containers/read-book-page/read-book-page.component';

export const routes: Route[] = [
  {
    path: 'browse',
    component: BrowseBooksPageComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Browse Books'
    }
  },
  {
    path: 'buy',
    component: BuyBooksPageComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Buy Books'
    }
  },
  {
    path: 'favourite',
    component: BookmarksPageComponent,
    canActivate: [AuthGuard],
    data: {
      type: BOOKMARKS.FAVOURITE,
      title: 'Favourite Books'
    }
  },
  {
    path: 'mustread',
    component: BookmarksPageComponent,
    canActivate: [AuthGuard],
    data: {
      type: BOOKMARKS.MUSTREAD,
      title: 'Must Read Titles'
    }
  },
  {
    path: 'wishlist',
    component: BookmarksPageComponent,
    canActivate: [AuthGuard],
    data: {
      type: BOOKMARKS.WISHLIST,
      title: 'Wishlist'
    }
  },
  {
    path: 'best',
    component: BestBooksPageComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'List of the Best'
    }
  },
  {
    path: 'read/:author/:slug',
    component: ReadBookPageComponent,
    canActivate: [AuthGuard],
    resolve: {
      reading: ReadBookResolver
    },
    data: {
      title: 'Now Reading'
    }
  },
  {
    path: 'read',
    component: ReadBookPageComponent,
    canActivate: [AuthGuard],
    resolve: {
      reading: ReadBookResolver
    },
    data: {
      title: 'Now Reading'
    }
  }
];
