import { NgModule } from '@angular/core';

import { TNSFontIconModule } from 'nativescript-ngx-fonticon';

@NgModule({
  imports: [
    TNSFontIconModule.forRoot({
      fa: './assets/font-awesome.min.css'
    })
  ],
  providers: []
})
export class CoreModule {}
