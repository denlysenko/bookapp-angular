import { Route } from '@angular/router';

import { AuthGuard } from '@bookapp-angular/core';

import { BookPageComponent } from './containers/book-page/book-page.component';

export const routes: Route[] = [
  {
    path: '',
    component: BookPageComponent,
    canActivate: [AuthGuard]
  }
];
