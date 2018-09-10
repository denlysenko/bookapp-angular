import { CommonModule } from '@angular/common';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthCoreModule } from '@bookapp-angular/auth-core';
import { NativeScriptFormsModule } from 'nativescript-angular/forms';
import { NgShadowModule } from 'nativescript-ngx-shadow';

import { components } from './components';
import { containers } from './containers';

@NgModule({
  imports: [
    CommonModule,
    NativeScriptFormsModule,
    ReactiveFormsModule,
    AuthCoreModule.forRoot(),
    NgShadowModule
  ],
  declarations: [...components, ...containers],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AuthModule {}
