import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatCardModule,
  MatListModule,
  MatMenuModule,
  MatSidenavModule,
  MatToolbarModule
} from '@angular/material';
import { RouterModule } from '@angular/router';

import { DateToPeriodPipe } from '@bookapp-angular/core';

import { components } from './components';
import { containers } from './containers';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatListModule,
    MatMenuModule,
    MatCardModule
  ],
  declarations: [...containers, ...components, DateToPeriodPipe],
  exports: [...containers]
})
export class LayoutModule {}
