import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';

import { AuthGuard } from '@bookapp-angular/core';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { AuthPageComponent } from '~/modules/auth/containers/auth-page/auth-page.component';
import { LayoutComponent } from '~/modules/layout/containers/layout/layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'books',
        loadChildren: '~/modules/books/books.module#BooksModule',
        canLoad: [AuthGuard]
      },
      {
        path: 'history',
        loadChildren: '~/modules/history/history.module#HistoryModule',
        canLoad: [AuthGuard]
      }
    ]
  },
  {
    path: 'auth',
    component: AuthPageComponent
  },
  {
    path: 'profile',
    loadChildren: '~/modules/profile/profile.module#ProfileModule',
    canLoad: [AuthGuard]
  },
  {
    path: 'password',
    loadChildren: '~/modules/password/password.module#PasswordModule',
    canLoad: [AuthGuard]
  },
  {
    path: 'browse/:author/:slug',
    loadChildren: '~/modules/book/book.module#BookModule',
    canLoad: [AuthGuard]
  },
  {
    path: 'buy/:author/:slug',
    loadChildren: '~/modules/book/book.module#BookModule',
    canLoad: [AuthGuard]
  }
];

@NgModule({
  imports: [NativeScriptRouterModule, NativeScriptRouterModule.forRoot(routes)]
})
export class AppRoutingModule {}
