import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatListModule, MatSidenavModule, MatToolbarModule } from '@angular/material';
import { RouterModule } from '@angular/router';

import { AuthModule } from '../pages/auth/auth.module';
import { routes } from './app.routes';
import { components } from './components';
import { containers } from './containers';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    AuthModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatListModule
  ],
  declarations: [...containers, ...components],
  exports: [...containers]
})
export class LayoutModule {}
