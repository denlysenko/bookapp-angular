import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { NativeScriptHttpClientModule } from 'nativescript-angular/http-client';
import { NativeScriptModule } from 'nativescript-angular/nativescript.module';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { CoreModule } from './modules/core/core.module';

@NgModule({
  imports: [
    NativeScriptModule,
    NativeScriptHttpClientModule,
    CoreModule,
    // AppRoutingModule
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule {}
