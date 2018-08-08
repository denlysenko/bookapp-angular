import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatPaginatorModule, MatSortModule, MatTableModule, MatToolbarModule } from '@angular/material';
import { RouterModule } from '@angular/router';

import { LoaderModule } from '@web/ui/loader/loader.module';

import { components } from './components';
import { containers } from './containers';
import { routes } from './history.routes';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatToolbarModule,
    LoaderModule
  ],
  declarations: [...containers, ...components]
})
export class HistoryModule {}
