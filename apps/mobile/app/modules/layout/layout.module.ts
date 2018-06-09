import { CommonModule } from '@angular/common';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { AccordionModule } from 'nativescript-accordion/angular';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { NativeScriptUISideDrawerModule } from 'nativescript-ui-sidedrawer/angular';
import { SharedModule } from '~/modules/shared/shared.module';

import { LayoutComponent } from './layout.component';

@NgModule({
  imports: [
    NativeScriptCommonModule,
    CommonModule,
    NativeScriptUISideDrawerModule,
    AccordionModule,
    SharedModule
  ],
  declarations: [LayoutComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class LayoutModule {}
