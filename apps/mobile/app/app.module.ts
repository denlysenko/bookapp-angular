import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { AuthModule } from '~/modules/auth/auth.module';
import { CoreModule } from '~/modules/core/core.module';
import { SharedModule } from '~/modules/shared/shared.module';
import { LayoutModule } from '~/modules/layout/layout.module';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';

@NgModule({
  imports: [
    CoreModule,
    SharedModule,
    AppRoutingModule,
    AuthModule,
    LayoutModule
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule {}
