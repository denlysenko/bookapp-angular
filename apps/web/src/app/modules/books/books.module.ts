import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatCardModule, MatCheckboxModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { RouterModule } from '@angular/router';

import { BooksCoreModule } from '@bookapp-angular/books-core';
import { RolesGuard } from '@bookapp-angular/core/src';
import { FileSelectorComponent, FileSelectorModule } from '@web/ui/file-selector';
import { ImageSelectorComponent, ImageSelectorModule } from '@web/ui/image-selector';

import { routes } from './books.routes';
import { components } from './components';
import { containers } from './containers';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    BooksCoreModule.forRoot(),
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    ImageSelectorModule,
    FileSelectorModule
  ],
  declarations: [...containers, ...components],
  providers: [RolesGuard],
  entryComponents: [ImageSelectorComponent, FileSelectorComponent]
})
export class BooksModule {}
