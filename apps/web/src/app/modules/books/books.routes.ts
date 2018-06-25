import { Routes } from '@angular/router';

import { AuthGuard, CanDeactivateGuard, RolesGuard } from '@bookapp-angular/core';

import { AddBookPageComponent } from './containers/add-book-page/add-book-page.component';
import { EditBookPageComponent } from './containers/edit-book-page/edit-book-page.component';

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
    component: EditBookPageComponent,
    canActivate: [AuthGuard, RolesGuard],
    canDeactivate: [CanDeactivateGuard],
    data: {
      roles: ['admin']
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
    path: 'browse',
    component: BrowseBooksComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'browse/:author/:slug',
    component: BookDetailsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'buy',
    component: BrowseBooksComponent,
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
