import { Routes } from '@angular/router';

import { AuthGuard } from '@bookapp-angular/core';

import { HistoryPageComponent } from './containers/history-page/history-page.component';

export const routes: Routes = [
  {
    path: '',
    component: HistoryPageComponent,
    canActivate: [AuthGuard]
  }
];
