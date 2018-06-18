import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';

import { NativeScriptRouterModule } from 'nativescript-angular';

import { PasswordPageComponent } from './containers/password-page/password-page.component';

const routes: Routes = [
  {
    path: '',
    component: PasswordPageComponent
  }
];

@NgModule({
  imports: [
    NativeScriptRouterModule,
    NativeScriptRouterModule.forChild(routes)
  ],
  exports: [NativeScriptRouterModule]
})
export class PasswordRoutingModule {}
