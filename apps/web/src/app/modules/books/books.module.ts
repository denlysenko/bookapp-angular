import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BooksCoreModule } from '@bookapp-angular/books-core';
import { RolesGuard } from '@bookapp-angular/core/src';

import { routes } from './books.routes';
import { containers } from './containers';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    BooksCoreModule.forRoot()
  ],
  declarations: [...containers],
  providers: [RolesGuard]
})
export class BooksModule {}
