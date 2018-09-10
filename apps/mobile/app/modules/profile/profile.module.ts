import { CommonModule } from '@angular/common';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { ProfileCoreModule } from '@bookapp-angular/profile-core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { NgShadowModule } from 'nativescript-ngx-shadow';
import { NativeScriptUIDataFormModule } from 'nativescript-ui-dataform/angular';

import { components } from './components';
import { containers } from './containers';
import { ProfileRoutingModule } from './profile.routing';

@NgModule({
  imports: [
    NativeScriptCommonModule,
    CommonModule,
    NativeScriptUIDataFormModule,
    ProfileCoreModule.forRoot(),
    ProfileRoutingModule,
    NgShadowModule
  ],
  declarations: [...containers, ...components],
  schemas: [NO_ERRORS_SCHEMA]
})
export class ProfileModule {}
