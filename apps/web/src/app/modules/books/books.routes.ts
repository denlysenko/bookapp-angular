import { Routes } from '@angular/router';

import { BuyBooksResolver } from '@bookapp-angular/books-core';
import { AuthGuard, CanDeactivateGuard, RolesGuard } from '@bookapp-angular/core';

import { AddBookPageComponent } from './containers/add-book-page/add-book-page.component';
import { BrowseBooksPageComponent } from './containers/browse-books-page/browse-books-page.component';
import { BuyBooksPageComponent } from './containers/buy-books-page/buy-books-page.component';
import { EditBookResolver } from './resolvers/edit-book.resolver';

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
    canActivate: [AuthGuard],
    resolve: {
      books: BuyBooksResolver
    }
  }
];

/*
  {
    path: 'best',
    component: BestBooksComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'browse/:author/:slug',
    component: BookDetailsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'buy/:author/:slug',
    component: BookDetailsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'favourite',
    component: FavouriteBooksComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'mustread',
    component: MustreadBooksComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'reading/:author/:slug',
    component: ReadingBookComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'reading',
    component: ReadingBookComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'wishlist',
    component: WishlistBooksComponent,
    canActivate: [AuthGuard]
  },
*/
