import { CommonModule } from '@angular/common';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { DateToPeriodPipe } from '@bookapp-angular/core';

import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { NgShadowModule } from 'nativescript-ng-shadow';
import { NativeScriptUISideDrawerModule } from 'nativescript-ui-sidedrawer/angular';

import { SharedModule } from '~/modules/shared/shared.module';
import { components } from './components';
import { containers } from './containers';

@NgModule({
  imports: [
    NativeScriptCommonModule,
    CommonModule,
    NativeScriptUISideDrawerModule,
    NgShadowModule,
    SharedModule
  ],
  declarations: [...containers, ...components, DateToPeriodPipe],
  schemas: [NO_ERRORS_SCHEMA]
})
export class LayoutModule {}
