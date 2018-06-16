import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';

import { AuthGuard } from '@bookapp-angular/core';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { AuthPageComponent } from '~/modules/auth/containers/auth-page/auth-page.component';
import { LayoutComponent } from '~/modules/layout/containers/layout/layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'auth',
    component: AuthPageComponent
  },
  {
    path: 'profile',
    loadChildren: '~/modules/profile/profile.module#ProfileModule',
    canLoad: [AuthGuard]
  }
];

@NgModule({
  imports: [NativeScriptRouterModule, NativeScriptRouterModule.forRoot(routes)]
})
export class AppRoutingModule {}
