import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HistoryCoreModule } from '@bookapp-angular/history-core';

import { components } from './components';
import { containers } from './containers';
import { routes } from './history.routes';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HistoryCoreModule.forRoot()
  ],
  declarations: [...containers, ...components]
})
export class HistoryModule {}
