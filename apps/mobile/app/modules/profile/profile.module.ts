import { CommonModule } from '@angular/common';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { ProfileCoreModule } from '@bookapp-angular/profile-core/src';
import { NativeScriptFormsModule } from 'nativescript-angular/forms';
import { NgShadowModule } from 'nativescript-ng-shadow';

import { components } from './components';
import { containers } from './containers';
import { ProfileRoutingModule } from './profile.routing';

@NgModule({
  imports: [
    CommonModule,
    ProfileCoreModule.forRoot(),
    ProfileRoutingModule,
    NativeScriptFormsModule,
    ReactiveFormsModule,
    NgShadowModule
  ],
  declarations: [...containers, ...components],
  schemas: [NO_ERRORS_SCHEMA]
})
export class ProfileModule {}
