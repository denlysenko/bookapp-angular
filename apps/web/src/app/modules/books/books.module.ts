import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatToolbarModule,
} from '@angular/material';
import { RouterModule } from '@angular/router';

import { BooksCoreModule } from '@bookapp-angular/books-core';
import { CanDeactivateGuard, RolesGuard } from '@bookapp-angular/core';
import { ConfirmDialogComponent, DialogsModule } from '@web/ui/dialogs';
import { FileSelectorComponent, FileSelectorModule } from '@web/ui/file-selector';
import { ImageSelectorComponent, ImageSelectorModule } from '@web/ui/image-selector';
import { RatingModule } from '@web/ui/rating/rating.module';

import { routes } from './books.routes';
import { components } from './components';
import { containers } from './containers';
import { EditBookResolver } from './resolvers/edit-book.resolver';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(routes),
    BooksCoreModule.forRoot(),
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatButtonToggleModule,
    MatIconModule,
    ImageSelectorModule,
    FileSelectorModule,
    DialogsModule,
    RatingModule
  ],
  declarations: [...containers, ...components],
  providers: [RolesGuard, CanDeactivateGuard, EditBookResolver],
  entryComponents: [
    ImageSelectorComponent,
    FileSelectorComponent,
    ConfirmDialogComponent
  ]
})
export class BooksModule {}
