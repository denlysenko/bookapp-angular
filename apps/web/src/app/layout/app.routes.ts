import { Route } from '@angular/router';

import { AuthPageComponent } from '../pages/auth/containers/auth-page/auth-page.component';

export const routes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'auth'
  },
  {
    path: 'auth',
    component: AuthPageComponent
  }
];
