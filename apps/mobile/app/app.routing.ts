import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';

import { NativeScriptRouterModule } from 'nativescript-angular/router';

const routes: Routes = [];

@NgModule({
  imports: [NativeScriptRouterModule.forRoot(routes)]
})
export class AppRoutingModule {}
