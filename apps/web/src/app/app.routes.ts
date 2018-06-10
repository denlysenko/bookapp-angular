import { Route } from '@angular/router';

import { HomeComponent } from './layout/components/home/home.component';
import { LayoutComponent } from './layout/containers/layout/layout.component';
import { AuthPageComponent } from './pages/auth/containers/auth-page/auth-page.component';

export const routes: Route[] = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'profile',
        loadChildren: './pages/profile/profile.module#ProfileModule'
      }
    ]
  },
  {
    path: 'auth',
    component: AuthPageComponent
  }
];
