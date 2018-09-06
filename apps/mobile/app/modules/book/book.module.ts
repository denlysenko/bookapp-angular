import { CommonModule } from '@angular/common';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BooksCoreModule } from '@bookapp-angular/books-core';
import { NativeScriptFormsModule } from 'nativescript-angular';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { NgShadowModule } from 'nativescript-ng-shadow';

import { routes } from './book.routing';
import { components } from './components';
import { containers } from './containers';

@NgModule({
  imports: [
    CommonModule,
    NativeScriptCommonModule,
    NativeScriptFormsModule,
    RouterModule.forChild(routes),
    BooksCoreModule.forRoot(),
    NgShadowModule
  ],
  declarations: [...containers, ...components],
  schemas: [NO_ERRORS_SCHEMA]
})
export class BookModule {}
