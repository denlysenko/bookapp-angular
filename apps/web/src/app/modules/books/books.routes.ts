import { Routes } from '@angular/router';

import {
  AuthGuard,
  BOOKMARKS,
  CanDeactivateGuard,
  RolesGuard
} from '@bookapp-angular/core';

import { AddBookPageComponent } from './containers/add-book-page/add-book-page.component';
import { BestBooksPageComponent } from './containers/best-books-page/best-books-page.component';
import { BookPageComponent } from './containers/book-page/book-page.component';
import { BookmarksPageComponent } from './containers/bookmarks-page/bookmarks-page.component';
import { BrowseBooksPageComponent } from './containers/browse-books-page/browse-books-page.component';
import { BuyBooksPageComponent } from './containers/buy-books-page/buy-books-page.component';
import { ReadBookPageComponent } from './containers/read-book-page/read-book-page.component';

import { EditBookResolver } from './resolvers/edit-book.resolver';
import { ReadBookResolver } from './resolvers/read-book.resolver';

export const routes: Routes = [
  {
    path: 'add',
    component: AddBookPageComponent,
    canActivate: [AuthGuard, RolesGuard],
    canDeactivate: [CanDeactivateGuard],
    data: {
      roles: ['admin']
    }
  },
  {
    path: 'edit/:author/:slug',
    component: AddBookPageComponent,
    canActivate: [AuthGuard, RolesGuard],
    canDeactivate: [CanDeactivateGuard],
    resolve: {
      book: EditBookResolver
    },
    data: {
      roles: ['admin']
    }
  },
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
    path: 'browse/:author/:slug',
    component: BookPageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'buy/:author/:slug',
    component: BookPageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'favourite',
    component: BookmarksPageComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Favourite Books',
      type: BOOKMARKS.FAVOURITE
    }
  },
  {
    path: 'mustread',
    component: BookmarksPageComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Must Read Titles',
      type: BOOKMARKS.MUSTREAD
    }
  },
  {
    path: 'wishlist',
    component: BookmarksPageComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Wishlist',
      type: BOOKMARKS.WISHLIST
    }
  },
  {
    path: 'best',
    component: BestBooksPageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'read/:author?/:slug?',
    component: ReadBookPageComponent,
    canActivate: [AuthGuard],
    resolve: {
      reading: ReadBookResolver
    }
  }
];
