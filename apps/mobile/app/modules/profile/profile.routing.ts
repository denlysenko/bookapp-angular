import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';

import { NativeScriptRouterModule } from 'nativescript-angular';

import { ProfilePageComponent } from './containers/profile-page/profile-page.component';

const routes: Routes = [
  {
    path: '',
    component: ProfilePageComponent
  }
];

@NgModule({
  imports: [NativeScriptRouterModule, NativeScriptRouterModule.forChild(routes)]
})
export class ProfileRoutingModule {}
