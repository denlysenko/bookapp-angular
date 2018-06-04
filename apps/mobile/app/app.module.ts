import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { AuthModule } from '~/modules/auth/auth.module';
import { CoreModule } from '~/modules/core/core.module';
import { SharedModule } from '~/modules/shared/shared.module';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';

@NgModule({
  imports: [CoreModule, SharedModule, AppRoutingModule, AuthModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule {}
