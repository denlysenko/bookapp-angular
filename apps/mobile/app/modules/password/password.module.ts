import { CommonModule } from '@angular/common';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { PasswordCoreModule } from '@bookapp-angular/password-core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { NgShadowModule } from 'nativescript-ngx-shadow';
import { NativeScriptUIDataFormModule } from 'nativescript-ui-dataform/angular';

import { components } from './components';
import { containers } from './containers';
import { PasswordRoutingModule } from './password.routing';

@NgModule({
  imports: [
    NativeScriptCommonModule,
    CommonModule,
    NativeScriptUIDataFormModule,
    PasswordCoreModule.forRoot(),
    PasswordRoutingModule,
    NgShadowModule
  ],
  declarations: [...containers, ...components],
  schemas: [NO_ERRORS_SCHEMA]
})
export class PasswordModule {}
