import { Route } from '@angular/router';

import { AuthGuard } from '@bookapp-angular/core';

import { AuthPageComponent } from './modules/auth/containers/auth-page/auth-page.component';
import { HomeComponent } from './modules/layout/components/home/home.component';
import { LayoutComponent } from './modules/layout/containers/layout/layout.component';

export const routes: Route[] = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'profile',
        loadChildren: './pages/profile/profile.module#ProfileModule',
        canLoad: [AuthGuard]
      },
      {
        path: 'password',
        loadChildren: './pages/password/password.module#PasswordModule',
        canLoad: [AuthGuard]
      }
    ]
  },
  {
    path: 'auth',
    component: AuthPageComponent
  }
];
