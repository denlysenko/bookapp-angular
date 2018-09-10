import { CommonModule } from '@angular/common';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BooksCoreModule } from '@bookapp-angular/books-core';
import { NativeScriptFormsModule } from 'nativescript-angular';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { registerElement } from 'nativescript-angular/element-registry';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { NgShadowModule } from 'nativescript-ngx-shadow';
import { NativeScriptUIListViewModule } from 'nativescript-ui-listview/angular';

import { routes } from './books.routing';
import { components } from './components';
import { BookSearchComponent } from './components/book-search/book-search.component';
import { containers } from './containers';

registerElement(
  'StarRating',
  () => require('nativescript-star-ratings').StarRating
);

@NgModule({
  imports: [
    CommonModule,
    NativeScriptCommonModule,
    NativeScriptFormsModule,
    RouterModule.forChild(routes),
    BooksCoreModule.forRoot(),
    NgShadowModule,
    NativeScriptUIListViewModule,
    NativeScriptRouterModule
  ],
  declarations: [...containers, ...components],
  entryComponents: [BookSearchComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class BooksModule {}
