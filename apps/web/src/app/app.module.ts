import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { NxModule } from '@nrwl/nx';

import { AppComponent } from './app.component';

@NgModule({
  imports: [BrowserModule, NxModule.forRoot()],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
