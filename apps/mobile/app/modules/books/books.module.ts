import { CommonModule } from '@angular/common';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BooksCoreModule } from '@bookapp-angular/books-core';
import { NativeScriptFormsModule } from 'nativescript-angular';
import { NativeScriptCommonModule } from 'nativescript-angular/common';

import { routes } from './books.routing';
import { components } from './components';
import { BookFilterComponent } from './components/book-filter/book-filter.component';
import { containers } from './containers';

@NgModule({
  imports: [
    CommonModule,
    NativeScriptCommonModule,
    NativeScriptFormsModule,
    RouterModule.forChild(routes),
    BooksCoreModule.forRoot()
  ],
  declarations: [...containers, ...components],
  entryComponents: [BookFilterComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class BooksModule {}
