import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';

import { Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

import { Book, BookService } from '@bookapp-angular/books-core';
import { FeedbackPlatformService } from '@bookapp-angular/core/src';
import { BookFormComponent } from '../../components/book-form/book-form.component';
import { ConfirmDialogComponent } from '@web/ui/dialogs';

@Component({
  templateUrl: './add-book-page.component.html',
  styleUrls: ['./add-book-page.component.scss']
})
export class AddBookPageComponent implements OnInit {
  isLoading: boolean;
  book: Book;
  error: any;

  @ViewChild(BookFormComponent) private bookFormComponent: BookFormComponent;

  constructor(
    protected feedbackService: FeedbackPlatformService,
    private dialog: MatDialog,
    private bookService: BookService
  ) {}

  ngOnInit() {}

  save(event: Book) {
    this.isLoading = true;
    this.bookService
      .create(event)
      .pipe(
        tap(() => {
          this.isLoading = false;
        })
      )
      .subscribe(
        ({ data, errors }) => {
          if (data) {
            this.book = data.createBook;
            this.feedbackService.success('Book created!');
          }

          if (errors) {
            this.error = errors[errors.length - 1];
          }
        },
        err => {
          this.isLoading = false;
          this.error = err;
        }
      );
  }

  canDeactivate(): Observable<boolean> | boolean {
    if (this.bookFormComponent.hasChanges()) {
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        width: '300px',
        data: {
          text:
            'There are unsaved changes on the page. Are you sure you want to leave?'
        }
      });

      return dialogRef.afterClosed().pipe(
        switchMap(result => {
          if (result) {
            return this.bookFormComponent
              .removeUploadedFiles()
              .pipe(switchMap(() => of(true)));
          }

          return of(false);
        })
      );
    } else {
      return true;
    }
  }
}
