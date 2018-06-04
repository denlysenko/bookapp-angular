import { CommonModule } from '@angular/common';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthCoreModule } from '@bookapp-angular/auth-core';
import { NgShadowModule } from 'nativescript-ng-shadow';

import { components } from './components';
import { containers } from './containers';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, AuthCoreModule.forRoot(), NgShadowModule],
  declarations: [...components, ...containers],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AuthModule {}
